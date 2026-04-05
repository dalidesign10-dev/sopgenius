"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  PlusCircle,
  Trash2,
  FileText,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ROLES = [
  "Dentist",
  "Dental Assistant",
  "Hygienist",
  "Front Desk",
  "Office Manager",
  "Lab Tech",
  "Other",
];

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  invite_token: string;
  invited_at: string;
  joined_at: string | null;
  user_id: string | null;
}

interface AssignmentInfo {
  team_member_id: string;
}

interface ReadInfo {
  team_member_id: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [assignments, setAssignments] = useState<AssignmentInfo[]>([]);
  const [reads, setReads] = useState<ReadInfo[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [membersRes, assignmentsRes, readsRes] = await Promise.all([
        fetch("/api/team"),
        fetch("/api/team/assignments"),
        fetch("/api/team/reads"),
      ]);
      const mData = await membersRes.json();
      const aData = await assignmentsRes.json();
      const rData = await readsRes.json();
      setMembers(mData.members || []);
      setAssignments(aData.assignments || []);
      setReads(rData.reads || []);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setAdding(true);
    setError("");

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), role, email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add member");
      } else {
        setName("");
        setEmail("");
        loadData();
      }
    } catch {
      setError("Failed to add member");
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(id: string) {
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    loadData();
  }

  function getInviteLink(token: string) {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/team-join/${token}`;
  }

  function copyInviteLink(member: TeamMember) {
    const link = getInviteLink(member.invite_token);
    navigator.clipboard.writeText(link);
    setCopiedId(member.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function getMemberAssignmentCount(memberId: string) {
    return assignments.filter((a) => a.team_member_id === memberId).length;
  }

  function getMemberReadCount(memberId: string) {
    return reads.filter((r) => r.team_member_id === memberId).length;
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center text-slate-400">
        Loading team...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team</h1>
        <p className="text-sm text-slate-500">
          Add staff, send them an invite link, and they&apos;ll acknowledge assigned procedures themselves.
        </p>
      </div>

      {/* Add member form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add team member</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <form onSubmit={handleAdd} className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex-1"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={adding}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {adding ? "Adding..." : "Add"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Team list */}
      {members.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Users className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No team members yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Add your staff above. They&apos;ll get an invite link to set up their account.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {members.map((member) => {
                const assignedCount = getMemberAssignmentCount(member.id);
                const readCount = getMemberReadCount(member.id);
                const isJoined = !!member.joined_at;

                return (
                  <div
                    key={member.id}
                    className="px-5 py-4 space-y-2"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                        {member.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {member.role}
                          {member.email ? ` · ${member.email}` : ""}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1 text-slate-500">
                          <FileText className="h-3.5 w-3.5" />
                          {assignedCount} assigned
                        </span>
                        {assignedCount > 0 && (
                          <span
                            className={`flex items-center gap-1 ${
                              readCount === assignedCount
                                ? "text-emerald-600"
                                : "text-amber-600"
                            }`}
                          >
                            {readCount === assignedCount ? (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : (
                              <Clock className="h-3.5 w-3.5" />
                            )}
                            {readCount}/{assignedCount} acknowledged
                          </span>
                        )}
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemove(member.id)}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Remove member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Invite link row */}
                    {!isJoined && (
                      <div className="ml-14 flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-amber-600">
                          <Mail className="h-3 w-3" />
                          Invite pending
                        </span>
                        <button
                          onClick={() => copyInviteLink(member)}
                          className="flex items-center gap-1 rounded border px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-50"
                        >
                          {copiedId === member.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-500" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy invite link
                            </>
                          )}
                        </button>
                      </div>
                    )}
                    {isJoined && (
                      <div className="ml-14">
                        <span className="flex items-center gap-1 text-xs text-emerald-600">
                          <CheckCircle2 className="h-3 w-3" />
                          Account active
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
