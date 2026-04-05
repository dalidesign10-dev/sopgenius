import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// DELETE /api/team/[id] — remove a team member
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", id)
    .eq("clinic_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
