"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Users,
  AlertTriangle,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  Eye,
  XCircle,
  Send,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/client";
import { useClinic } from "@/lib/clinic-store";
import type { SOP } from "@/types";

// ── Recommended procedures every dental clinic needs ──
const RECOMMENDED: { title: string; templateId: string; department: string; compliance: string }[] = [
  { title: "Instrument Sterilisation Protocol", templateId: "sterilisation", department: "Clinical", compliance: "OSHA / CDC" },
  { title: "Patient Intake & Registration", templateId: "patient-intake", department: "Front Desk", compliance: "HIPAA" },
  { title: "OSHA Exposure Control Plan", templateId: "osha-exposure", department: "Compliance", compliance: "OSHA" },
  { title: "HIPAA Privacy Procedures", templateId: "hipaa-privacy", department: "Compliance", compliance: "HIPAA" },
  { title: "Medical Emergency Response", templateId: "emergency-response", department: "Clinical", compliance: "OSHA" },
  { title: "Infection Control Protocol", templateId: "infection-control", department: "Clinical", compliance: "CDC" },
  { title: "Dental Radiology Safety", templateId: "dental-radiology", department: "Clinical", compliance: "State Board" },
  { title: "Hazard Communication Plan", templateId: "hazard-communication", department: "Compliance", compliance: "OSHA" },
  { title: "Front Desk Opening Procedures", templateId: "front-desk-opening", department: "Front Desk", compliance: "" },
  { title: "Front Desk Closing Procedures", templateId: "front-desk-closing", department: "Front Desk", compliance: "" },
  { title: "New Hire Onboarding Checklist", templateId: "new-hire-onboarding", department: "HR", compliance: "OSHA / HIPAA" },
  { title: "Patient Complaint Handling", templateId: "patient-complaint", department: "Front Desk", compliance: "" },
];

export default function DashboardPage() {
  const [sops, setSops] = useState<SOP[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingReminders, setSendingReminders] = useState(false);
  const [reminderMessage, setReminderMessage] = useState<string | null>(null);
  const clinic = useClinic();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("sops")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setSops(data);
      setLoading(false);
    }
    load();
  }, [supabase]);

  // ── Send Reminders handler ──
  async function handleSendReminders() {
    const nonCompliantList = clinic.getNonCompliantMembers();
    if (nonCompliantList.length === 0) return;

    setSendingReminders(true);
    setReminderMessage(null);

    const reminders = nonCompliantList.map(({ member, unreadSopIds }) => ({
      email: member.email,
      name: member.name,
      role: member.role,
      unreadSopIds,
    }));

    try {
      const res = await fetch("/api/send-reminder/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reminders }),
      });

      if (!res.ok) throw new Error("Failed to send reminders");

      const data = await res.json();
      const count = data.sent ?? reminders.length;
      setReminderMessage(`Reminders sent to ${count} staff member${count !== 1 ? "s" : ""}.`);
    } catch {
      setReminderMessage("Failed to send reminders. Please try again.");
    } finally {
      setSendingReminders(false);
      setTimeout(() => setReminderMessage(null), 5000);
    }
  }

  // ── Clinic Score calculation ──
  const totalProcedures = sops.length;
  const totalTeam = clinic.team.length;
  const totalAssignments = clinic.assignments.length;
  const totalReads = clinic.reads.length;
  const totalRecommended = RECOMMENDED.length;

  // Score: weighted across 3 pillars
  const documentedScore = Math.min(totalProcedures / totalRecommended, 1);
  const assignedScore =
    totalProcedures > 0 && totalTeam > 0
      ? Math.min(totalAssignments / (totalProcedures * totalTeam), 1)
      : 0;
  const readScore =
    totalAssignments > 0 ? Math.min(totalReads / totalAssignments, 1) : 0;

  const clinicScore = Math.round(
    (documentedScore * 40 + assignedScore * 30 + readScore * 30)
  );

  // Missing procedures
  const existingTitles = sops.map((s) => s.title.toLowerCase());
  const missing = RECOMMENDED.filter(
    (r) => !existingTitles.some((t) => t.includes(r.title.toLowerCase().slice(0, 15)))
  );

  // Unread assignments
  const unreadCount = totalAssignments - totalReads;

  // Non-compliant staff (by name)
  const nonCompliant = clinic.getNonCompliantMembers();

  // Score colour
  const scoreColour =
    clinicScore >= 70
      ? "text-emerald-600"
      : clinicScore >= 40
        ? "text-amber-500"
        : "text-red-500";

  const scoreBg =
    clinicScore >= 70
      ? "bg-emerald-50 border-emerald-200"
      : clinicScore >= 40
        ? "bg-amber-50 border-amber-200"
        : "bg-red-50 border-red-200";

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* ── Clinic Score Hero ── */}
      <Card className={`border-2 ${scoreBg}`}>
        <CardContent className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:py-8">
          {/* Score ring */}
          <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
            <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-gray-200"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`${clinicScore * 3.267} 326.7`}
                strokeLinecap="round"
                className={scoreColour}
              />
            </svg>
            <span className={`absolute text-3xl font-bold ${scoreColour}`}>
              {clinicScore}%
            </span>
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-slate-900">
              Your Clinic Score
            </h1>
            <p className="mt-1 text-slate-600">
              {clinicScore < 30
                ? "Your clinic has major documentation gaps. Start documenting your most critical procedures."
                : clinicScore < 60
                  ? "You're making progress. Assign procedures to your team and track who's read them."
                  : clinicScore < 90
                    ? "Good coverage. Focus on getting every team member to read their assigned procedures."
                    : "Excellent! Your clinic is well-documented and your team is trained."}
            </p>

            {/* Three pillars */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">Documented</p>
                <p className="text-lg font-bold text-slate-900">
                  {totalProcedures}/{totalRecommended}
                </p>
                <Progress
                  value={documentedScore * 100}
                  className="mt-1 h-1.5"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Assigned</p>
                <p className="text-lg font-bold text-slate-900">
                  {totalAssignments}
                </p>
                <Progress
                  value={assignedScore * 100}
                  className="mt-1 h-1.5"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Read</p>
                <p className="text-lg font-bold text-slate-900">
                  {totalReads}/{totalAssignments || 0}
                </p>
                <Progress value={readScore * 100} className="mt-1 h-1.5" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Quick Stats ── */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalProcedures}</p>
              <p className="text-xs text-muted-foreground">Procedures</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalTeam}</p>
              <p className="text-xs text-muted-foreground">Team Members</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{missing.length}</p>
              <p className="text-xs text-muted-foreground">Missing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <Eye className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{unreadCount}</p>
              <p className="text-xs text-muted-foreground">Unread</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── What To Do Next ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What to do next</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {totalProcedures === 0 && (
            <Link
              href="/dashboard/create"
              className="flex items-center gap-3 rounded-lg border border-dashed border-blue-300 bg-blue-50/50 p-4 transition-colors hover:bg-blue-50"
            >
              <PlusCircle className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  Create your first procedure
                </p>
                <p className="text-sm text-slate-500">
                  Start with a sterilisation protocol or patient intake process.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          )}

          {totalProcedures > 0 && totalTeam === 0 && (
            <Link
              href="/dashboard/team"
              className="flex items-center gap-3 rounded-lg border border-dashed border-purple-300 bg-purple-50/50 p-4 transition-colors hover:bg-purple-50"
            >
              <Users className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  Add your team members
                </p>
                <p className="text-sm text-slate-500">
                  Add staff so you can assign procedures and track who has read them.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          )}

          {totalProcedures > 0 && totalTeam > 0 && totalAssignments === 0 && (
            <Link
              href="/dashboard/procedures"
              className="flex items-center gap-3 rounded-lg border border-dashed border-amber-300 bg-amber-50/50 p-4 transition-colors hover:bg-amber-50"
            >
              <CheckCircle2 className="h-5 w-5 text-amber-600" />
              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  Assign procedures to your team
                </p>
                <p className="text-sm text-slate-500">
                  Go to any procedure and assign it to the staff who need to follow it.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          )}

          {nonCompliant.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-amber-600" />
                <p className="font-medium text-slate-900">
                  {nonCompliant.length} staff member{nonCompliant.length !== 1 ? "s" : ""} not compliant
                </p>
              </div>
              <div className="space-y-2 ml-8">
                {nonCompliant.map(({ member, unreadSopIds }) => (
                  <div key={member.id} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium text-slate-900">{member.name}</span>
                      <span className="text-slate-500"> · {member.role}</span>
                    </div>
                    <span className="text-amber-700 font-medium">
                      {unreadSopIds.length} unread
                    </span>
                  </div>
                ))}
              </div>
              <div className="ml-8 flex items-center gap-3">
                <Button
                  size="sm"
                  onClick={handleSendReminders}
                  disabled={sendingReminders}
                  className="gap-2"
                >
                  {sendingReminders ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {sendingReminders ? "Sending..." : "Send Reminders"}
                </Button>
                {reminderMessage && (
                  <span className={`text-sm font-medium ${reminderMessage.startsWith("Failed") ? "text-red-600" : "text-emerald-600"}`}>
                    {reminderMessage}
                  </span>
                )}
              </div>
            </div>
          )}

          {missing.length > 0 && (
            <Link
              href="#missing"
              className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50/50 p-4 transition-colors hover:bg-red-50"
            >
              <XCircle className="h-5 w-5 text-red-500" />
              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  {missing.length} recommended procedure{missing.length !== 1 ? "s" : ""} still missing
                </p>
                <p className="text-sm text-slate-500">
                  Scroll down to create them with one click.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          )}
        </CardContent>
      </Card>

      {/* ── Still Missing ── */}
      {missing.length > 0 && (
        <Card id="missing">
          <CardHeader>
            <CardTitle className="text-lg">Still Missing</CardTitle>
            <p className="text-sm text-slate-500">
              These recommended procedures haven&apos;t been documented yet. Click Create to generate one instantly.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {missing.map((proc) => (
                <Link
                  key={proc.templateId}
                  href={`/dashboard/create?quick=${proc.templateId}`}
                  className="flex items-center justify-between rounded-lg border border-dashed border-slate-200 px-4 py-3 transition-colors hover:border-primary hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-slate-900">{proc.title}</p>
                    <p className="text-xs text-slate-500">
                      {proc.department}{proc.compliance ? ` · ${proc.compliance}` : ""}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary shrink-0 ml-3">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Create
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Recent Procedures ── */}
      {sops.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Procedures</CardTitle>
            <Link href="/dashboard/procedures">
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {sops.slice(0, 5).map((sop) => {
                const assigned = clinic.getAssignedMembers(sop.id);
                const readMembers = clinic.getReadMembers(sop.id);
                const allRead =
                  assigned.length > 0 &&
                  assigned.every((m) => readMembers.includes(m.id));

                return (
                  <Link
                    key={sop.id}
                    href={`/dashboard/sop/${sop.id}`}
                    className="flex items-center gap-3 py-3 transition-colors hover:bg-slate-50 -mx-2 px-2 rounded-lg"
                  >
                    <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-slate-900">
                        {sop.content?.header?.title || sop.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {sop.department || "No department"} · v{sop.version}
                      </p>
                    </div>
                    {assigned.length > 0 ? (
                      allRead ? (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" /> All read
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                          <Eye className="h-3 w-3" />
                          {readMembers.length}/{assigned.length}
                        </span>
                      )
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                        Unassigned
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
