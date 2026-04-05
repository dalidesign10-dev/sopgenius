"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  FileText,
  LogOut,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface AssignedSop {
  id: string;
  sop_id: string;
  assigned_at: string;
  sop: {
    id: string;
    title: string;
    description: string;
    department: string | null;
    markdown_content: string;
    content: Record<string, unknown>;
  };
  acknowledged: boolean;
  acknowledged_at?: string;
}

interface TeamMemberInfo {
  id: string;
  name: string;
  role: string;
  email: string;
  clinic_name: string;
}

export default function PortalPage() {
  const router = useRouter();
  const [member, setMember] = useState<TeamMemberInfo | null>(null);
  const [assignments, setAssignments] = useState<AssignedSop[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSop, setExpandedSop] = useState<string | null>(null);
  const [acknowledging, setAcknowledging] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    // Get team member info
    const { data: teamMember } = await supabase
      .from("team_members")
      .select("id, name, role, email, clinic_id, users!team_members_clinic_id_fkey(full_name, company_name)")
      .eq("user_id", user.id)
      .single();

    if (!teamMember) {
      // Not a team member — maybe they're an admin
      router.push("/dashboard");
      return;
    }

    const clinicUser = teamMember.users as unknown as { full_name: string; company_name: string | null } | null;
    setMember({
      id: teamMember.id,
      name: teamMember.name,
      role: teamMember.role,
      email: teamMember.email,
      clinic_name: clinicUser?.company_name || clinicUser?.full_name || "Your Practice",
    });

    // Get assignments with SOP data
    const { data: assignmentData } = await supabase
      .from("team_assignments")
      .select("id, sop_id, assigned_at, sops(id, title, description, department, markdown_content, content)")
      .eq("team_member_id", teamMember.id)
      .order("assigned_at", { ascending: false });

    // Get reads
    const { data: reads } = await supabase
      .from("sop_reads")
      .select("sop_id, acknowledged_at")
      .eq("team_member_id", teamMember.id);

    const readMap = new Map(
      (reads || []).map((r) => [r.sop_id, r.acknowledged_at])
    );

    const enriched: AssignedSop[] = (assignmentData || []).map((a) => ({
      id: a.id,
      sop_id: a.sop_id,
      assigned_at: a.assigned_at,
      sop: a.sops as unknown as AssignedSop["sop"],
      acknowledged: readMap.has(a.sop_id),
      acknowledged_at: readMap.get(a.sop_id) || undefined,
    }));

    setAssignments(enriched);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAcknowledge = async (sopId: string) => {
    setAcknowledging(sopId);
    try {
      const res = await fetch("/api/team/reads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sopId }),
      });
      if (res.ok) {
        setAssignments((prev) =>
          prev.map((a) =>
            a.sop_id === sopId
              ? { ...a, acknowledged: true, acknowledged_at: new Date().toISOString() }
              : a
          )
        );
      }
    } catch {
      // silently fail
    } finally {
      setAcknowledging(null);
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading your procedures...</p>
      </div>
    );
  }

  const unread = assignments.filter((a) => !a.acknowledged);
  const read = assignments.filter((a) => a.acknowledged);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-primary">DentiSOP</h1>
            <p className="text-xs text-slate-500">{member?.clinic_name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{member?.name}</p>
              <p className="text-xs text-slate-500">{member?.role}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="flex items-center gap-3 py-4">
              <AlertTriangle className={`h-5 w-5 ${unread.length > 0 ? "text-amber-500" : "text-slate-300"}`} />
              <div>
                <p className="text-2xl font-bold">{unread.length}</p>
                <p className="text-xs text-slate-500">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 py-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-2xl font-bold">{read.length}</p>
                <p className="text-xs text-slate-500">Acknowledged</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Unread procedures */}
        {unread.length > 0 && (
          <section>
            <h2 className="mb-3 text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Procedures to Review
            </h2>
            <div className="space-y-3">
              {unread.map((a) => (
                <Card key={a.id} className="border-amber-200">
                  <CardHeader
                    className="cursor-pointer pb-2"
                    onClick={() =>
                      setExpandedSop(expandedSop === a.sop_id ? null : a.sop_id)
                    }
                  >
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-4 w-4 text-amber-600" />
                      {a.sop?.title || "Untitled Procedure"}
                    </CardTitle>
                    {a.sop?.department && (
                      <p className="text-xs text-slate-500">{a.sop.department}</p>
                    )}
                  </CardHeader>

                  {expandedSop === a.sop_id && (
                    <CardContent className="space-y-4">
                      {a.sop?.description && (
                        <p className="text-sm text-slate-600">{a.sop.description}</p>
                      )}

                      {/* Render markdown content */}
                      {a.sop?.markdown_content ? (
                        <div className="prose prose-sm max-w-none rounded-lg bg-white border p-4 max-h-96 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-sm font-sans">
                            {a.sop.markdown_content}
                          </pre>
                        </div>
                      ) : a.sop?.content ? (
                        <div className="rounded-lg bg-white border p-4 max-h-96 overflow-y-auto">
                          <SopContentView content={a.sop.content} />
                        </div>
                      ) : null}

                      <div className="flex justify-end pt-2">
                        <Button
                          onClick={() => handleAcknowledge(a.sop_id)}
                          disabled={acknowledging === a.sop_id}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          {acknowledging === a.sop_id
                            ? "Acknowledging..."
                            : "I Have Read This Procedure"}
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Acknowledged procedures */}
        {read.length > 0 && (
          <section>
            <h2 className="mb-3 text-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Acknowledged
            </h2>
            <div className="space-y-2">
              {read.map((a) => (
                <Card key={a.id} className="border-emerald-100 bg-emerald-50/30">
                  <CardHeader
                    className="cursor-pointer pb-2"
                    onClick={() =>
                      setExpandedSop(expandedSop === a.sop_id ? null : a.sop_id)
                    }
                  >
                    <CardTitle className="text-base flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-emerald-600" />
                        {a.sop?.title || "Untitled Procedure"}
                      </span>
                      <span className="text-xs font-normal text-emerald-600">
                        Acknowledged{" "}
                        {a.acknowledged_at
                          ? new Date(a.acknowledged_at).toLocaleDateString()
                          : ""}
                      </span>
                    </CardTitle>
                  </CardHeader>

                  {expandedSop === a.sop_id && (
                    <CardContent>
                      {a.sop?.markdown_content ? (
                        <div className="prose prose-sm max-w-none rounded-lg bg-white border p-4 max-h-96 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-sm font-sans">
                            {a.sop.markdown_content}
                          </pre>
                        </div>
                      ) : a.sop?.content ? (
                        <div className="rounded-lg bg-white border p-4 max-h-96 overflow-y-auto">
                          <SopContentView content={a.sop.content} />
                        </div>
                      ) : null}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        {assignments.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <FileText className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-semibold">No procedures assigned yet</h3>
              <p className="mt-1 text-sm text-slate-500">
                Your practice manager will assign procedures for you to review.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

// Simple SOP content renderer for JSON-structured SOPs
function SopContentView({ content }: { content: Record<string, unknown> }) {
  const c = content as {
    header?: { title?: string };
    purpose?: string;
    scope?: string;
    steps?: { number: number; action: string; role?: string; notes?: string }[];
    complianceNotes?: string[];
  };

  return (
    <div className="space-y-4 text-sm">
      {c.purpose && (
        <div>
          <h4 className="font-semibold text-slate-700">Purpose</h4>
          <p className="text-slate-600">{c.purpose}</p>
        </div>
      )}
      {c.scope && (
        <div>
          <h4 className="font-semibold text-slate-700">Scope</h4>
          <p className="text-slate-600">{c.scope}</p>
        </div>
      )}
      {c.steps && c.steps.length > 0 && (
        <div>
          <h4 className="font-semibold text-slate-700">Steps</h4>
          <ol className="mt-2 space-y-2">
            {c.steps.map((step) => (
              <li key={step.number} className="flex gap-2">
                <span className="shrink-0 font-medium text-slate-400">
                  {step.number}.
                </span>
                <div>
                  <p className="text-slate-700">{step.action}</p>
                  {step.role && (
                    <p className="text-xs text-slate-500">Role: {step.role}</p>
                  )}
                  {step.notes && (
                    <p className="text-xs text-slate-400 italic">{step.notes}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
      {c.complianceNotes && c.complianceNotes.length > 0 && (
        <div>
          <h4 className="font-semibold text-slate-700">Compliance Notes</h4>
          <ul className="mt-1 space-y-1">
            {c.complianceNotes.map((note, i) => (
              <li key={i} className="text-xs text-slate-600">
                • {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
