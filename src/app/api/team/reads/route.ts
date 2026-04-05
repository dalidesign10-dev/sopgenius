import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

// GET /api/team/reads?sopId=xxx — get reads for a SOP (admin) or for current member (portal)
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const sopId = searchParams.get("sopId");
  const memberId = searchParams.get("memberId");

  const service = createServiceClient();
  let query = service.from("sop_reads").select("*");

  if (sopId) query = query.eq("sop_id", sopId);
  if (memberId) query = query.eq("team_member_id", memberId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reads: data });
}

// POST /api/team/reads — team member acknowledges a SOP (self-service only)
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { sopId } = await request.json();
  const service = createServiceClient();

  // Find the team member record for this auth user
  const { data: teamMember } = await service
    .from("team_members")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!teamMember) {
    return NextResponse.json({ error: "You are not a team member" }, { status: 403 });
  }

  // Verify assignment exists
  const { data: assignment } = await service
    .from("team_assignments")
    .select("id")
    .eq("team_member_id", teamMember.id)
    .eq("sop_id", sopId)
    .single();

  if (!assignment) {
    return NextResponse.json({ error: "This procedure is not assigned to you" }, { status: 403 });
  }

  const { data, error } = await service
    .from("sop_reads")
    .insert({
      team_member_id: teamMember.id,
      sop_id: sopId,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Already acknowledged" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ read: data });
}
