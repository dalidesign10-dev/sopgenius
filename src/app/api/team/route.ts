import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { randomBytes } from "crypto";

// GET /api/team — list team members for the current clinic owner
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const service = createServiceClient();
  const { data, error } = await service
    .from("team_members")
    .select("*")
    .eq("clinic_id", user.id)
    .order("invited_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ members: data });
}

// POST /api/team — add a new team member and send invite email
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, role, email } = await request.json();
  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const invite_token = randomBytes(32).toString("hex");
  const service = createServiceClient();

  // Get clinic name for the email
  const { data: clinicUser } = await service
    .from("users")
    .select("full_name, company_name")
    .eq("id", user.id)
    .single();

  const clinicName = clinicUser?.company_name || clinicUser?.full_name || "Your Practice";

  const { data, error } = await service
    .from("team_members")
    .insert({
      clinic_id: user.id,
      name,
      role: role || "",
      email: email.toLowerCase().trim(),
      invite_token,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "A team member with this email already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send invite email via Supabase Edge Function or direct SMTP
  // For now, use Supabase's built-in email by inviting via Auth
  // We'll send a simple invite email using the Resend API if available,
  // otherwise the admin copies the link manually
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const inviteLink = `${siteUrl}/team-join/${invite_token}`;

  // Try sending email via Resend (if API key exists)
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "DentiSOP <noreply@dentisop.com>",
          to: email.toLowerCase().trim(),
          subject: `You're invited to join ${clinicName} on DentiSOP`,
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
              <h2 style="color: #1e293b;">You've been invited to ${clinicName}</h2>
              <p style="color: #475569;">Hi ${name},</p>
              <p style="color: #475569;">${clinicName} has added you as a <strong>${role || "team member"}</strong>. Click below to set up your account and view your assigned procedures.</p>
              <a href="${inviteLink}" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0;">Accept Invite</a>
              <p style="color: #94a3b8; font-size: 13px;">Or copy this link: ${inviteLink}</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #94a3b8; font-size: 12px;">DentiSOP — Procedure documentation for dental practices</p>
            </div>
          `,
        }),
      });
    } catch {
      // Email failed — admin can still copy the link manually
    }
  }

  return NextResponse.json({ member: data, inviteLink });
}
