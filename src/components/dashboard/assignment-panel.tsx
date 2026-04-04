"use client";

import { useState } from "react";
import {
  Users,
  CheckCircle2,
  Eye,
  PlusCircle,
  X,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClinic } from "@/lib/clinic-store";

interface AssignmentPanelProps {
  sopId: string;
}

export function AssignmentPanel({ sopId }: AssignmentPanelProps) {
  const clinic = useClinic();
  const [showPicker, setShowPicker] = useState(false);

  const assigned = clinic.getAssignedMembers(sopId);
  const readIds = clinic.getReadMembers(sopId);
  const unassigned = clinic.team.filter(
    (m) => !assigned.some((a) => a.id === m.id)
  );

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
                  onClick={() => {
                    clinic.assignProcedure(sopId, m.id);
                  }}
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
        {assigned.length === 0 ? (
          <div className="py-6 text-center">
            <UserCheck className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-2 text-sm text-slate-500">
              No team members assigned yet.
            </p>
            {clinic.team.length === 0 && (
              <p className="mt-1 text-xs text-slate-400">
                Add team members first on the Team page.
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y">
            {assigned.map((member) => {
              const hasRead = readIds.includes(member.id);
              return (
                <div
                  key={member.id}
                  className="flex items-center gap-3 py-2.5"
                >
                  {/* Avatar */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {member.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  {/* Name + role */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>

                  {/* Read status */}
                  {hasRead ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Read
                    </span>
                  ) : (
                    <button
                      onClick={() => clinic.markRead(sopId, member.id)}
                      className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100"
                    >
                      <Eye className="h-3 w-3" />
                      Mark read
                    </button>
                  )}

                  {/* Unassign */}
                  <button
                    onClick={() => clinic.unassignProcedure(sopId, member.id)}
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
        {assigned.length > 0 && (
          <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
            {readIds.length}/{assigned.length} team member
            {assigned.length !== 1 ? "s" : ""} have read this procedure
          </div>
        )}
      </CardContent>
    </Card>
  );
}
