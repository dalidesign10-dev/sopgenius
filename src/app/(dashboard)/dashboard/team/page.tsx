"use client";

import { useState } from "react";
import {
  Users,
  PlusCircle,
  Trash2,
  FileText,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useClinic } from "@/lib/clinic-store";

const ROLES = [
  "Dentist",
  "Dental Assistant",
  "Hygienist",
  "Front Desk",
  "Office Manager",
  "Lab Tech",
  "Other",
];

export default function TeamPage() {
  const clinic = useClinic();
  const [name, setName] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [email, setEmail] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    clinic.addMember(name.trim(), role, email.trim());
    setName("");
    setEmail("");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team</h1>
        <p className="text-sm text-slate-500">
          Add your staff to assign procedures and track who has read them.
        </p>
      </div>

      {/* Add member form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add team member</CardTitle>
        </CardHeader>
        <CardContent>
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
              placeholder="Email (optional)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Team list */}
      {clinic.team.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Users className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No team members yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Add your staff above to start assigning procedures.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {clinic.team.map((member) => {
                const assigned = clinic.getMemberAssignments(member.id);
                const reads = clinic.getMemberReads(member.id);

                return (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 px-5 py-4"
                  >
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
                        {assigned.length} assigned
                      </span>
                      {assigned.length > 0 && (
                        <span
                          className={`flex items-center gap-1 ${
                            reads.length === assigned.length
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }`}
                        >
                          {reads.length === assigned.length ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                          {reads.length}/{assigned.length} read
                        </span>
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => clinic.removeMember(member.id)}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Remove member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
