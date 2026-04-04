"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  FileText,
  Shield,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  Eye,
  Search,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  TrendingUp,
  Edit,
  BarChart3,
  Activity,
  Calendar,
  Target,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/client";
import type { SOP, SOPStatus } from "@/types";

/* ── CONSTANTS ────────────────────────────────────────────────────── */

const RECOMMENDED_SOPS = [
  { name: "Instrument Sterilisation Protocol", dept: "Sterilisation", framework: "OSHA / CDC" },
  { name: "OSHA Exposure Control Plan", dept: "Compliance", framework: "OSHA" },
  { name: "HIPAA Privacy Procedures", dept: "Compliance", framework: "HIPAA" },
  { name: "Bloodborne Pathogens Programme", dept: "Compliance", framework: "OSHA" },
  { name: "Hazard Communication Plan", dept: "Compliance", framework: "OSHA" },
  { name: "Emergency Response Protocol", dept: "Compliance", framework: "OSHA" },
  { name: "Patient Intake Workflow", dept: "Front Office", framework: "HIPAA" },
  { name: "Insurance Verification Process", dept: "Front Office", framework: "---" },
  { name: "New Hire Onboarding Checklist", dept: "HR & Training", framework: "---" },
  { name: "Dental Assistant Daily Checklist", dept: "Clinical", framework: "---" },
  { name: "Operatory Turnover Procedure", dept: "Clinical", framework: "CDC" },
  { name: "End-of-Day Shutdown", dept: "Clinical", framework: "---" },
  { name: "Radiology Safety Protocol", dept: "Compliance", framework: "State Board" },
  { name: "Recall & Follow-Up Workflow", dept: "Front Office", framework: "---" },
  { name: "Lab Case Communication", dept: "Lab Coordination", framework: "---" },
  { name: "Patient Complaint Handling", dept: "Front Office", framework: "---" },
];

// Mock chart data (will be real when SOPs exist)
const sopCreationData = [
  { month: "Oct", sops: 0 },
  { month: "Nov", sops: 2 },
  { month: "Dec", sops: 3 },
  { month: "Jan", sops: 5 },
  { month: "Feb", sops: 4 },
  { month: "Mar", sops: 7 },
  { month: "Apr", sops: 3 },
];

const complianceData = [
  { name: "OSHA", value: 4, color: "#6366f1" },
  { name: "HIPAA", value: 3, color: "#8b5cf6" },
  { name: "CDC", value: 2, color: "#a78bfa" },
  { name: "Other", value: 3, color: "#c4b5fd" },
];

const teamActivityData = [
  { day: "Mon", views: 12, edits: 3 },
  { day: "Tue", views: 19, edits: 5 },
  { day: "Wed", views: 8, edits: 2 },
  { day: "Thu", views: 22, edits: 7 },
  { day: "Fri", views: 15, edits: 4 },
  { day: "Sat", views: 5, edits: 1 },
  { day: "Sun", views: 3, edits: 0 },
];

const recentActivity = [
  { action: "Published", title: "HIPAA Privacy Procedures", user: "Dr. Smith", time: "2h ago", icon: CheckCircle, colour: "text-emerald-500 bg-emerald-50" },
  { action: "Edited", title: "Sterilisation Protocol", user: "Sarah J.", time: "4h ago", icon: Edit, colour: "text-blue-500 bg-blue-50" },
  { action: "Reviewed", title: "Exposure Control Plan", user: "Dr. Smith", time: "1d ago", icon: Eye, colour: "text-indigo-500 bg-indigo-50" },
  { action: "Created", title: "Patient Intake Workflow", user: "Maria T.", time: "2d ago", icon: Plus, colour: "text-violet-500 bg-violet-50" },
  { action: "Overdue", title: "Radiology Safety Protocol", user: "System", time: "3d ago", icon: AlertTriangle, colour: "text-red-500 bg-red-50" },
];

/* ── HELPERS ───────────────────────────────────────────────────────── */

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function statusBadge(status: SOPStatus) {
  switch (status) {
    case "published":
      return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Published</Badge>;
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "archived":
      return <Badge variant="outline" className="text-slate-400">Archived</Badge>;
  }
}

function reviewStatus(updatedAt: string) {
  const daysSince = Math.floor((Date.now() - new Date(updatedAt).getTime()) / 86400000);
  if (daysSince > 365) return { label: "Overdue", colour: "text-red-600 bg-red-50" };
  if (daysSince > 300) return { label: "Review Soon", colour: "text-amber-600 bg-amber-50" };
  return { label: "Current", colour: "text-emerald-600 bg-emerald-50" };
}

/* ── STAT CARD ─────────────────────────────────────────────────────── */

function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconBg,
  iconColour,
}: {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  iconBg: string;
  iconColour: string;
}) {
  const isPositive = (change ?? 0) >= 0;
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
            {change !== undefined && (
              <div className="mt-2 flex items-center gap-1">
                {isPositive ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                )}
                <span className={`text-xs font-semibold ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                  {isPositive ? "+" : ""}{change}%
                </span>
                {changeLabel && <span className="text-xs text-slate-400">{changeLabel}</span>}
              </div>
            )}
          </div>
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColour}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ── MAIN COMPONENT ───────────────────────────────────────────────── */

export default function DashboardPage() {
  const [sops, setSops] = useState<SOP[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | SOPStatus>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchSOPs() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      const { data } = await supabase
        .from("sops")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      setSops((data as SOP[]) || []);
      setLoading(false);
    }
    fetchSOPs();
  }, []);

  /* Derived */
  const filtered = sops.filter((s) => {
    if (filter !== "all" && s.status !== filter) return false;
    if (search && !s.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const published = sops.filter((s) => s.status === "published").length;
  const drafts = sops.filter((s) => s.status === "draft").length;
  const overdue = sops.filter((s) => {
    const days = Math.floor((Date.now() - new Date(s.updated_at).getTime()) / 86400000);
    return days > 365;
  }).length;

  const matchedNames = new Set(sops.map((s) => s.title.toLowerCase()));
  const documented = RECOMMENDED_SOPS.filter((r) =>
    matchedNames.has(r.name.toLowerCase()) || sops.some((s) => s.title.toLowerCase().includes(r.name.split(" ")[0].toLowerCase()))
  ).length;
  const scorePct = Math.round((documented / RECOMMENDED_SOPS.length) * 100);

  /* ── Loading ─────────────────────────────────────────────────────── */

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Loading your practice data...</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}><CardContent className="p-5"><div className="h-20 animate-pulse rounded-lg bg-slate-100" /></CardContent></Card>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card><CardContent className="p-5"><div className="h-64 animate-pulse rounded-lg bg-slate-100" /></CardContent></Card>
          <Card><CardContent className="p-5"><div className="h-64 animate-pulse rounded-lg bg-slate-100" /></CardContent></Card>
        </div>
      </div>
    );
  }

  /* ── Empty state ────────────────────────────────────────────────── */

  if (sops.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome to DentiSOP</p>
          </div>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/dashboard/create"><Plus className="mr-2 h-4 w-4" />Create SOP</Link>
          </Button>
        </div>

        {/* Empty hero */}
        <Card className="border-red-200 bg-gradient-to-br from-red-50 via-white to-orange-50">
          <CardContent className="py-10">
            <div className="flex flex-col items-center text-center gap-4 max-w-lg mx-auto">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Your practice is 0% documented</h2>
                <p className="mt-2 text-slate-500">
                  16 critical procedures are undefined. Every undocumented process is a liability risk.
                </p>
              </div>
              <Progress value={0} className="w-full max-w-sm h-3" indicatorClassName="bg-red-500" />
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">High Risk &middot; Not Inspection-Ready</Badge>
              <Button size="lg" asChild className="bg-indigo-600 hover:bg-indigo-700 mt-2">
                <Link href="/dashboard/create"><Plus className="mr-2 h-4 w-4" />Document Your First Procedure</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommended grid */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Recommended SOPs for Your Practice</h2>
            <p className="text-sm text-muted-foreground">Start here — these cover your most critical gaps.</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {RECOMMENDED_SOPS.map((r) => (
                <div key={r.name} className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50/50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.dept} &middot; {r.framework}</p>
                  </div>
                  <Badge variant="outline" className="text-red-500 border-red-200 text-xs">Missing</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ── Main dashboard with data ──────────────────────────────────── */

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Practice operations overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/analytics"><BarChart3 className="mr-2 h-4 w-4" />Reports</Link>
          </Button>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/dashboard/create"><Plus className="mr-2 h-4 w-4" />Create SOP</Link>
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total SOPs"
          value={sops.length}
          change={12}
          changeLabel="this month"
          icon={FileText}
          iconBg="bg-indigo-50"
          iconColour="text-indigo-600"
        />
        <StatCard
          title="Published"
          value={published}
          change={8}
          changeLabel="this month"
          icon={CheckCircle}
          iconBg="bg-emerald-50"
          iconColour="text-emerald-600"
        />
        <StatCard
          title="Team Members"
          value={5}
          change={25}
          changeLabel="this quarter"
          icon={Users}
          iconBg="bg-violet-50"
          iconColour="text-violet-600"
        />
        <StatCard
          title="Review Overdue"
          value={overdue}
          change={overdue > 0 ? -15 : 0}
          changeLabel="vs last month"
          icon={Clock}
          iconBg={overdue > 0 ? "bg-red-50" : "bg-slate-50"}
          iconColour={overdue > 0 ? "text-red-600" : "text-slate-400"}
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* SOP Activity Chart - wider */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <h2 className="text-base font-semibold text-slate-900">SOP Activity</h2>
              <p className="text-sm text-slate-500">SOPs created over the last 7 months</p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" /> +24%
            </Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sopCreationData}>
                  <defs>
                    <linearGradient id="colourSops" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      fontSize: "13px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sops"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fill="url(#colourSops)"
                    dot={{ r: 4, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6, stroke: "#6366f1", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Score + Compliance Donut */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <h2 className="text-base font-semibold text-slate-900">Compliance Coverage</h2>
            <p className="text-sm text-slate-500">{documented} of {RECOMMENDED_SOPS.length} procedures documented</p>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Score */}
            <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-slate-50">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={scorePct >= 80 ? "#10b981" : scorePct >= 40 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="3"
                    strokeDasharray={`${scorePct}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-lg font-bold text-slate-900">{scorePct}%</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Documentation Score</p>
                <p className="text-xs text-slate-500">{RECOMMENDED_SOPS.length - documented} procedures still missing</p>
              </div>
            </div>

            {/* Compliance breakdown */}
            <div className="h-[170px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {complianceData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value: string) => <span className="text-xs text-slate-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Activity + Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Bar chart */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Team Activity</h2>
              <p className="text-sm text-slate-500">SOP views and edits this week</p>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamActivityData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                  <Bar dataKey="views" fill="#6366f1" radius={[4, 4, 0, 0]} name="Views" />
                  <Bar dataKey="edits" fill="#a78bfa" radius={[4, 4, 0, 0]} name="Edits" />
                  <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-xs text-slate-600">{v}</span>} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity feed */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
              <p className="text-sm text-slate-500">Latest updates from your team</p>
            </div>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-50">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${a.colour}`}>
                    <a.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-900">
                      <span className="font-medium">{a.user}</span>{" "}
                      <span className="text-slate-500">{a.action.toLowerCase()}</span>
                    </p>
                    <p className="text-sm font-medium text-slate-700 truncate">{a.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue alert */}
      {overdue > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
            <Bell className="h-4 w-4 text-red-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-800">
              {overdue} SOP{overdue > 1 ? "s" : ""} overdue for review
            </p>
            <p className="text-xs text-red-600">Annual review required for OSHA and HIPAA compliance</p>
          </div>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
            Review Now
          </Button>
        </div>
      )}

      {/* SOP Table */}
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Your SOPs</h2>
            <p className="text-sm text-slate-500">{sops.length} total procedures</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search SOPs..."
                className="pl-9 w-56 bg-slate-50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex rounded-lg border overflow-hidden">
              {(["all", "published", "draft", "archived"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    filter === f
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b">
            <div className="col-span-5">SOP Name</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Review</div>
            <div className="col-span-2">Updated</div>
            <div className="col-span-1"></div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-400">
              {search ? "No SOPs match your search." : "No SOPs in this category."}
            </div>
          ) : (
            <div className="divide-y">
              {filtered.map((sop) => {
                const review = reviewStatus(sop.updated_at);
                return (
                  <Link
                    key={sop.id}
                    href={`/dashboard/sop/${sop.id}`}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center px-4 py-3.5 transition-colors hover:bg-slate-50/80 group"
                  >
                    <div className="sm:col-span-5 flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                        <FileText className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{sop.title}</p>
                        <p className="text-xs text-slate-400">{sop.department || sop.industry} &middot; v{sop.version}</p>
                      </div>
                    </div>
                    <div className="sm:col-span-2">{statusBadge(sop.status)}</div>
                    <div className="sm:col-span-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${review.colour}`}>{review.label}</span>
                    </div>
                    <div className="sm:col-span-2 text-xs text-slate-400">{timeAgo(sop.updated_at)}</div>
                    <div className="sm:col-span-1 flex justify-end">
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Missing SOPs */}
      {documented < RECOMMENDED_SOPS.length && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-indigo-600" />
              <h2 className="text-base font-semibold text-slate-900">Still Missing</h2>
            </div>
            <p className="text-sm text-slate-500">These recommended procedures haven&apos;t been documented yet.</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {RECOMMENDED_SOPS.filter((r) =>
                !sops.some((s) => s.title.toLowerCase().includes(r.name.split(" ")[0].toLowerCase()))
              ).map((r) => (
                <div key={r.name} className="flex items-center justify-between rounded-lg border border-dashed border-slate-200 px-4 py-3 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.dept} &middot; {r.framework}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" asChild>
                    <Link href={`/dashboard/create?title=${encodeURIComponent(r.name)}`}>
                      <Plus className="h-3 w-3 mr-1" />Create
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
