import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

// GET /api/team/assignments?sopId=xxx — get assignments for a SOP
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const sopId = searchParams.get("sopId");
  const memberId = searchParams.get("memberId");

  const service = createServiceClient();
  let query = service
    .from("team_assignments")
    .select("*, team_members!inner(*)");

  if (sopId) query = query.eq("sop_id", sopId);
  if (memberId) query = query.eq("team_member_id", memberId);
  query = query.eq("team_members.clinic_id", user.id);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ assignments: data });
}

// POST /api/team/assignments — assign a SOP to a team member
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { sopId, memberId } = await request.json();
  const service = createServiceClient();

  const { data, error } = await service
    .from("team_assignments")
    .insert({
      team_member_id: memberId,
      sop_id: sopId,
      assigned_by: user.id,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Already assigned" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ assignment: data });
}

// DELETE /api/team/assignments — unassign
export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { sopId, memberId } = await request.json();
  const service = createServiceClient();

  const { data: member } = await service
    .from("team_members")
    .select("id")
    .eq("id", memberId)
    .eq("clinic_id", user.id)
    .single();

  if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await service
    .from("sop_reads")
    .delete()
    .eq("team_member_id", memberId)
    .eq("sop_id", sopId);

  const { error } = await service
    .from("team_assignments")
    .delete()
    .eq("team_member_id", memberId)
    .eq("sop_id", sopId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
