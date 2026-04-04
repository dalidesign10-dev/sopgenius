import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

interface Reminder {
  to: string;
  staffName: string;
  unreadProcedures: string[];
}

interface BatchBody {
  clinicName: string;
  dashboardUrl: string;
  reminders: Reminder[];
}

function buildEmailHtml(
  staffName: string,
  clinicName: string,
  unreadProcedures: string[],
  dashboardUrl: string
): string {
  const procedureList = unreadProcedures
    .map((p) => `<li style="padding:4px 0;color:#334155;">${p}</li>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="background:#0f172a;padding:24px 32px;">
            <h1 style="margin:0;color:#ffffff;font-size:20px;">DentiSOP</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 16px;color:#334155;font-size:16px;">Hi ${staffName},</p>
            <p style="margin:0 0 16px;color:#334155;font-size:16px;">
              You have <strong>${unreadProcedures.length}</strong> unread procedure${unreadProcedures.length === 1 ? "" : "s"} at <strong>${clinicName}</strong> that require${unreadProcedures.length === 1 ? "s" : ""} your acknowledgement:
            </p>
            <ul style="margin:0 0 24px;padding-left:20px;">${procedureList}</ul>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr>
                <td style="background:#2563eb;border-radius:6px;">
                  <a href="${dashboardUrl}" target="_blank" style="display:inline-block;padding:12px 28px;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;">
                    View &amp; Acknowledge
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
            <p style="margin:0;color:#94a3b8;font-size:13px;">
              Sent by DentiSOP on behalf of ${clinicName}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BatchBody;

    const { clinicName, dashboardUrl, reminders } = body;

    if (!clinicName || !dashboardUrl) {
      return NextResponse.json(
        { error: "Missing required fields: clinicName, dashboardUrl" },
        { status: 400 }
      );
    }

    if (!Array.isArray(reminders) || reminders.length === 0) {
      return NextResponse.json(
        { error: "reminders must be a non-empty array" },
        { status: 400 }
      );
    }

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const reminder of reminders) {
      const { to, staffName, unreadProcedures } = reminder;

      if (!to || !staffName || !Array.isArray(unreadProcedures) || unreadProcedures.length === 0) {
        failed++;
        errors.push(`Invalid reminder entry for ${to || "unknown"}`);
        continue;
      }

      try {
        const { error } = await resend.emails.send({
          from: "DentiSOP <reminders@dentisop.com>",
          to,
          subject: `${staffName}, you have ${unreadProcedures.length} unread procedure${unreadProcedures.length === 1 ? "" : "s"}`,
          html: buildEmailHtml(staffName, clinicName, unreadProcedures, dashboardUrl),
        });

        if (error) {
          failed++;
          errors.push(`${to}: ${error.message}`);
        } else {
          sent++;
        }
      } catch {
        failed++;
        errors.push(`${to}: unexpected error`);
      }
    }

    return NextResponse.json({ sent, failed, errors });
  } catch (err) {
    console.error("Batch reminder error:", err);
    return NextResponse.json(
      { error: "Failed to process batch reminders" },
      { status: 500 }
    );
  }
}
