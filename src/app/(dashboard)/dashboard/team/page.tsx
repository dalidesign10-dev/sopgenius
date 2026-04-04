"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Mail,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Eye,
  UserPlus,
  Shield,
} from "lucide-react";

/* ── MOCK DATA (replace with Supabase queries) ───────────────────── */

const MOCK_MEMBERS = [
  {
    name: "You (Owner)",
    email: "owner@clinic.com",
    role: "Admin",
    sopsRead: 12,
    sopsTotal: 12,
    lastActive: "Just now",
  },
];

const MOCK_PENDING: string[] = [];

/* ── COMPONENT ─────────────────────────────────────────────────────── */

export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");

  const members = MOCK_MEMBERS;
  const pending = MOCK_PENDING;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your team, assign SOPs, and track who&apos;s read what.
          </p>
        </div>
        <Badge variant="outline" className="gap-1.5">
          <Users className="h-3 w-3" />
          {members.length} member{members.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Team Compliance Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{members.length}</p>
              <p className="text-xs text-muted-foreground">Team Members</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <Eye className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">100%</p>
              <p className="text-xs text-muted-foreground">Read Completion</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground">Pending Acknowledgements</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Member */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Team Member
          </h2>
          <p className="text-sm text-muted-foreground">
            New members will be assigned role-relevant SOPs automatically and asked to read &amp; acknowledge them.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="colleague@clinic.com"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="dental_assistant">Dental Assistant</option>
              <option value="hygienist">Hygienist</option>
              <option value="front_desk">Front Desk</option>
            </select>
            <Button disabled={!inviteEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Send Invite
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-bold">Team Members</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {members.map((m) => (
              <div
                key={m.email}
                className="flex items-center justify-between rounded-lg border px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{m.sopsRead}/{m.sopsTotal} SOPs read</p>
                    <p className="text-xs text-muted-foreground">Active {m.lastActive}</p>
                  </div>
                  <Badge variant={m.role === "Admin" ? "default" : "secondary"}>{m.role}</Badge>
                  {m.sopsRead === m.sopsTotal ? (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </div>
            ))}

            {pending.length > 0 && pending.map((email) => (
              <div
                key={email}
                className="flex items-center justify-between rounded-lg border border-dashed px-4 py-3 opacity-60"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-400">
                    ?
                  </div>
                  <div>
                    <p className="text-sm font-medium">{email}</p>
                    <p className="text-xs text-muted-foreground">Invitation pending</p>
                  </div>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            ))}
          </div>

          {members.length <= 1 && pending.length === 0 && (
            <div className="mt-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
              <Users className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-2 text-sm font-medium text-slate-600">Your team is just you — for now</p>
              <p className="mt-1 text-xs text-slate-400">
                Invite your team so everyone works from the same procedures. Each member gets assigned SOPs and must acknowledge them.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Read & Acknowledge info */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-5">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-sm">Read &amp; Acknowledge Tracking</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                When you publish or update an SOP, assigned team members are notified and must acknowledge they&apos;ve read it.
                Their acknowledgement is timestamped and exportable — use it as training evidence for OSHA and HIPAA audits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
