import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

// GET /api/team/join?token=xxx — get invite info (public, no auth needed)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  // Use service client to bypass RLS — this is a public invite lookup
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, role, email, joined_at, clinic_id, users!team_members_clinic_id_fkey(full_name, company_name)")
    .eq("invite_token", token)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Invalid or expired invite link" }, { status: 404 });
  }

  if (data.joined_at) {
    return NextResponse.json({ error: "This invite has already been used. Please log in instead.", alreadyJoined: true }, { status: 400 });
  }

  return NextResponse.json({
    invite: {
      id: data.id,
      name: data.name,
      role: data.role,
      email: data.email,
      clinicName: (data.users as unknown as { full_name: string; company_name: string | null })?.company_name || (data.users as unknown as { full_name: string })?.full_name || "Your Practice",
    },
  });
}

// POST /api/team/join — complete the join (after signup, link auth user to team member)
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign up first" }, { status: 401 });

  const { token } = await request.json();
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  // Use service client to bypass RLS for the lookup and update
  const service = createServiceClient();

  const { data: member, error: findError } = await service
    .from("team_members")
    .select("id, email, joined_at")
    .eq("invite_token", token)
    .single();

  if (findError || !member) {
    return NextResponse.json({ error: "Invalid invite" }, { status: 404 });
  }

  if (member.joined_at) {
    return NextResponse.json({ error: "Already joined" }, { status: 400 });
  }

  const { error: updateError } = await service
    .from("team_members")
    .update({
      user_id: user.id,
      joined_at: new Date().toISOString(),
    })
    .eq("id", member.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
