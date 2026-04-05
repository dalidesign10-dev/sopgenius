"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  CheckCircle2,
  Clock,
  PlusCircle,
  X,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  joined_at: string | null;
}

interface AssignmentWithMember {
  id: string;
  team_member_id: string;
  sop_id: string;
  team_members: TeamMember;
}

interface ReadRecord {
  team_member_id: string;
  acknowledged_at: string;
}

interface AssignmentPanelProps {
  sopId: string;
}

export function AssignmentPanel({ sopId }: AssignmentPanelProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [assignments, setAssignments] = useState<AssignmentWithMember[]>([]);
  const [reads, setReads] = useState<ReadRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [membersRes, assignmentsRes, readsRes] = await Promise.all([
        fetch("/api/team"),
        fetch(`/api/team/assignments?sopId=${sopId}`),
        fetch(`/api/team/reads?sopId=${sopId}`),
      ]);

      const membersData = await membersRes.json();
      const assignmentsData = await assignmentsRes.json();
      const readsData = await readsRes.json();

      setAllMembers(membersData.members || []);
      setAssignments(assignmentsData.assignments || []);
      setReads(readsData.reads || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [sopId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const assignedMemberIds = new Set(assignments.map((a) => a.team_member_id));
  const readMemberIds = new Set(reads.map((r) => r.team_member_id));
  const unassigned = allMembers.filter((m) => !assignedMemberIds.has(m.id));

  const handleAssign = async (memberId: string) => {
    const res = await fetch("/api/team/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sopId, memberId }),
    });
    if (res.ok) loadData();
  };

  const handleUnassign = async (memberId: string) => {
    await fetch("/api/team/assignments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sopId, memberId }),
    });
    loadData();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-sm text-slate-400">
          Loading team...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="h-4 w-4" />
          Team Assignment
        </CardTitle>
        {unassigned.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPicker(!showPicker)}
          >
            <PlusCircle className="mr-1 h-3.5 w-3.5" />
            Assign
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Picker */}
        {showPicker && unassigned.length > 0 && (
          <div className="rounded-lg border border-dashed border-indigo-300 bg-indigo-50/50 p-3">
            <p className="mb-2 text-xs font-medium text-slate-600">
              Select team members to assign:
            </p>
            <div className="flex flex-wrap gap-2">
              {unassigned.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleAssign(m.id)}
                  className="flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <PlusCircle className="h-3 w-3 text-indigo-500" />
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Assigned list */}
        {assignments.length === 0 ? (
          <div className="py-6 text-center">
            <UserCheck className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-2 text-sm text-slate-500">
              No team members assigned yet.
            </p>
            {allMembers.length === 0 && (
              <p className="mt-1 text-xs text-slate-400">
                Add team members first on the Team page.
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y">
            {assignments.map((assignment) => {
              const member = assignment.team_members;
              const hasRead = readMemberIds.has(assignment.team_member_id);
              const isJoined = !!member?.joined_at;

              return (
                <div
                  key={assignment.id}
                  className="flex items-center gap-3 py-2.5"
                >
                  {/* Avatar */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {(member?.name || "?")
                      .split(" ")
                      .map((w: string) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  {/* Name + role */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {member?.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {member?.role}
                      {!isJoined && (
                        <span className="ml-1 text-amber-600">· Invite pending</span>
                      )}
                    </p>
                  </div>

                  {/* Read status — no admin "Mark read" button */}
                  {hasRead ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Acknowledged
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                      <Clock className="h-3.5 w-3.5" />
                      Pending
                    </span>
                  )}

                  {/* Unassign */}
                  <button
                    onClick={() => handleUnassign(assignment.team_member_id)}
                    className="rounded p-1 text-slate-400 hover:text-red-500"
                    title="Unassign"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary */}
        {assignments.length > 0 && (
          <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
            {readMemberIds.size}/{assignments.length} team member
            {assignments.length !== 1 ? "s" : ""} acknowledged this procedure
          </div>
        )}
      </CardContent>
    </Card>
  );
}
