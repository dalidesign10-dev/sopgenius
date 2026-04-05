import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle,
  Shield,
  Clock,
  Users,
  ArrowRight,
  ChevronDown,
  X,
  Check,
  ShieldAlert,
  UserX,
  BookOpen,
  Eye,
  FileText,
  CreditCard,
  BarChart3,
  ClipboardCheck,
  Activity,
  Search,
  RefreshCw,
  Bell,
  History,
  Download,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { CollapsibleSOP } from "@/components/landing/collapsible-sop";

const C = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

/* ── DATA ─────────────────────────────────────────────────────────── */

const SCORE_ITEMS = [
  { name: "Instrument Sterilization Protocol", status: "missing" },
  { name: "OSHA Exposure Control Plan", status: "missing" },
  { name: "HIPAA Privacy Procedures", status: "missing" },
  { name: "Bloodborne Pathogens Program", status: "missing" },
  { name: "Hazard Communication Plan", status: "missing" },
  { name: "Emergency Response Protocol", status: "missing" },
  { name: "Patient Intake Workflow", status: "draft" },
  { name: "Insurance Verification Process", status: "draft" },
  { name: "New Hire Onboarding Checklist", status: "missing" },
  { name: "Dental Assistant Daily Checklist", status: "missing" },
  { name: "Operatory Turnover Procedure", status: "missing" },
  { name: "End-of-Day Shutdown", status: "missing" },
  { name: "Radiology Safety Protocol", status: "missing" },
  { name: "Recall & Follow-Up Workflow", status: "missing" },
  { name: "Lab Case Communication", status: "missing" },
  { name: "Patient Complaint Handling", status: "missing" },
] as { name: string; status: "missing" | "draft" | "complete" }[];

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "",
    desc: "See the system in action. No commitment.",
    features: [
      "3 procedures per month",
      "2 pre-built templates",
      "PDF export",
      "OSHA & HIPAA basics",
    ],
    cta: "Start Free",
    href: "/signup",
    pop: false,
  },
  {
    name: "Clinic",
    price: "$97",
    annual: "$79",
    period: "/mo",
    desc: "Everything for one practice.",
    features: [
      "Unlimited procedures",
      "All templates and frameworks",
      "PDF, Word, and Markdown exports",
      "Version history",
      "Team assignment and read tracking",
      "30-day money-back guarantee",
    ],
    cta: "Start Your Pilot",
    href: "/signup?plan=practice",
    pop: true,
  },
  {
    name: "Multi-Location",
    price: "$197",
    annual: "$159",
    period: "/mo",
    desc: "For group practices and DSOs.",
    features: [
      "Everything in Clinic",
      "Up to 15 users, 5 locations",
      "Custom branding on exports",
      "Compliance audit trail",
      "HIPAA BAA included",
      "Priority support (24-hour response)",
    ],
    cta: "Standardize All Locations",
    href: "/signup?plan=group",
    pop: false,
  },
];

const FAQS = [
  {
    q: "How does DentiSOP support OSHA and HIPAA documentation?",
    a: "Every template and generated procedure is structured around the documentation frameworks that OSHA, HIPAA, CDC, and state boards reference\u2014including regulatory cross-references and role assignments. DentiSOP helps you organize and maintain these records, but we always recommend your compliance lead or advisor reviews procedures before implementation.",
  },
  {
    q: "How is this different from Google Docs or a binder?",
    a: "Google Docs gives you a blank page. A binder collects dust. DentiSOP provides dental-specific templates, regulatory framework tagging, version history, team assignment, read-acknowledgment tracking, and exportable audit-ready documentation\u2014all in one system.",
  },
  {
    q: "Is AI involved? Is the output just generic ChatGPT text?",
    a: "AI helps draft the initial procedure, but DentiSOP is not a chatbot. Every output is structured around dental-specific compliance frameworks with role assignments, step-by-step instructions, and regulatory references. You review and edit every word before assigning it to your team.",
  },
  {
    q: "Can I edit the generated procedures?",
    a: "Yes. Every procedure is fully editable. Add steps, change language, adjust role assignments, update regulatory references\u2014the output is yours to customize for your practice.",
  },
  {
    q: "How long does setup take?",
    a: "Most office managers document their first procedure within 2 minutes. Pick a template, customize it, and assign it to your team. No onboarding calls or implementation projects required.",
  },
  {
    q: "What happens if I cancel?",
    a: "Every paid plan includes a 30-day money-back guarantee. Cancel anytime. You keep every procedure you\u2019ve exported.",
  },
  {
    q: "Do you support multi-location practices?",
    a: "Yes. The Multi-Location plan supports up to 5 locations and 15 users, with custom branding on exports and a centralized compliance audit trail. Need more? Contact us about Enterprise.",
  },
  {
    q: "Is DentiSOP a substitute for legal or compliance advice?",
    a: "No. DentiSOP helps you structure, organize, and maintain the documentation that regulatory bodies expect. It is not legal advice, and generated procedures should be reviewed by your compliance lead or advisor before implementation.",
  },
];

/* ── HELPERS ──────────────────────────────────────────────────────── */

function dot(s: "missing" | "draft" | "complete") {
  return s === "missing" ? "bg-red-500" : s === "draft" ? "bg-amber-400" : "bg-emerald-500";
}
function tag(s: "missing" | "draft" | "complete") {
  return s === "missing"
    ? { t: "Missing", c: "text-red-600" }
    : s === "draft"
      ? { t: "Draft", c: "text-amber-600" }
      : { t: "Done", c: "text-emerald-600" };
}

/* ── PAGE ─────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const missing = SCORE_ITEMS.filter((i) => i.status === "missing").length;
  const pct = Math.round(((SCORE_ITEMS.filter((i) => i.status === "complete").length + SCORE_ITEMS.filter((i) => i.status === "draft").length * 0.5) / SCORE_ITEMS.length) * 100);

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  1 · HERO                                                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-950 pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.08),transparent)]" />
        <div className={`${C} relative`}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT — copy */}
            <div>
              <h1 className="text-[2.25rem] leading-[1.1] font-extrabold tracking-tight text-white sm:text-5xl">
                Run Your Dental Practice{" "}
                <span className="text-red-400">to One Standard</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-400">
                Find missing procedures, generate role-based SOPs, assign them to staff, and keep audit-ready records&mdash;in one system built for dental practices.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="lg" asChild className="h-14 px-10 text-base shadow-lg shadow-primary/20">
                  <Link href="/signup">Run My Gap Check <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <a href="#sample-sop" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors underline underline-offset-4 decoration-slate-600 hover:decoration-white">View Sample SOP &darr;</a>
              </div>
              <p className="mt-6 text-sm text-slate-500 leading-relaxed">
                Structured around OSHA, HIPAA, CDC, and state-board documentation workflows. Final review stays with your compliance lead.
              </p>
            </div>

            {/* RIGHT — live dashboard fragment */}
            <div className="relative">
              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 sm:p-5">
                {/* Compliance score bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-300">Practice Documentation Score</span>
                    <span className="text-sm font-bold text-red-400">34%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400" style={{ width: "34%" }} />
                  </div>
                </div>

                {/* Procedure table */}
                <div className="rounded-lg border border-white/10 overflow-hidden">
                  <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-white/10">
                    <div className="col-span-4">Procedure</div>
                    <div className="col-span-3">Assigned</div>
                    <div className="col-span-3">Read Status</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>
                  <div className="divide-y divide-white/[0.06]">
                    {[
                      { name: "Instrument Sterilization", assigned: "Sarah J., Mike R.", read: "2/2 read", readC: "text-emerald-400", status: "Current", statusC: "text-emerald-400 bg-emerald-400/10", alert: false },
                      { name: "OSHA Exposure Control", assigned: "All Staff (6)", read: "4/6 read", readC: "text-amber-400", status: "2 pending", statusC: "text-amber-400 bg-amber-400/10", alert: false },
                      { name: "Patient Intake", assigned: "Front Desk (3)", read: "3/3 read", readC: "text-emerald-400", status: "Current", statusC: "text-emerald-400 bg-emerald-400/10", alert: false },
                      { name: "Hazard Communication", assigned: "Tyler B., Devon M.", read: "0/2 read", readC: "text-red-400", status: "Unread", statusC: "text-red-400 bg-red-400/10", alert: true },
                      { name: "Emergency Response", assigned: "Not assigned", read: "\u2014", readC: "text-slate-500", status: "Missing", statusC: "text-red-400 bg-red-400/10", alert: false },
                    ].map((row) => (
                      <div key={row.name} className="grid grid-cols-12 gap-2 items-center px-4 py-2.5">
                        <div className="col-span-12 sm:col-span-4 flex items-center gap-2">
                          {row.alert && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" /></span>}
                          {!row.alert && <span className="h-2 w-2 rounded-full bg-slate-600" />}
                          <span className="text-sm font-medium text-slate-200 truncate">{row.name}</span>
                        </div>
                        <div className="col-span-4 sm:col-span-3"><span className="text-xs text-slate-400">{row.assigned}</span></div>
                        <div className="col-span-4 sm:col-span-3"><span className={`text-xs font-semibold ${row.readC}`}>{row.read}</span></div>
                        <div className="col-span-4 sm:col-span-2 flex justify-end">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${row.statusC}`}>{row.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alert callout */}
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="text-xs text-red-300">Tyler B. hasn&rsquo;t read Hazard Communication in 6 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  2 · TRUST / STANDARDS STRIP                                 */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 bg-slate-50 py-8">
        <div className={C}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-slate-600">
            {[
              { icon: Shield, label: "OSHA-aligned templates" },
              { icon: Shield, label: "HIPAA documentation support" },
              { icon: Shield, label: "CDC infection control workflows" },
              { icon: FileText, label: "Version history" },
              { icon: Eye, label: "Read acknowledgment tracking" },
              { icon: Download, label: "Exportable audit records" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-slate-400" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  3 · GAP-CHECK / DIAGNOSIS                                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className={C}>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-red-600">Documentation gaps</p>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Most Practices Are Missing Critical Procedures
              </h2>
              <p className="mt-3 text-slate-500">This is what a typical dental practice looks like before DentiSOP. How many of these are documented at yours?</p>
            </div>

            <Card className="border-0 shadow-2xl ring-1 ring-slate-200">
              <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-red-50/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Practice Documentation Assessment</h3>
                    <p className="text-sm text-red-500 font-medium">High-risk &middot; Not inspection-ready</p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-red-600">{pct}%</p>
                    <Badge variant="destructive" className="mt-1 text-xs">AT RISK</Badge>
                  </div>
                </div>
                <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400" style={{ width: `${pct}%` }} />
                </div>
              </CardHeader>
              <CardContent className="pb-6 pt-5">
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {SCORE_ITEMS.map((item) => {
                    const t = tag(item.status);
                    return (
                      <div key={item.name} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-50">
                        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dot(item.status)}`} />
                        <span className="flex-1 text-sm text-slate-700">{item.name}</span>
                        <span className={`text-xs font-semibold ${t.c}`}>{t.t}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 border-t pt-5 text-center">
                  <p className="text-lg font-bold text-red-700">{missing} of {SCORE_ITEMS.length} procedures undocumented</p>
                  <Button size="lg" className="mt-4" asChild>
                    <Link href="/signup">Run My Gap Check <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  4 · HOW IT WORKS (3 steps)                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className={C}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">How it works</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Identify. Document. Enforce.</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-3">
            {[
              { n: "01", icon: Search, t: "Identify Gaps", d: "See which procedures your practice is missing. Choose from pre-built dental templates or describe any workflow in plain language." },
              { n: "02", icon: FileText, t: "Generate and Customize", d: "Get a structured, role-based SOP with regulatory references in seconds. Edit every word before publishing." },
              { n: "03", icon: ClipboardCheck, t: "Assign, Track, Prove", d: "Assign procedures by role. Track who has read them. Export acknowledgment logs and audit-ready documentation." },
            ].map((s) => (
              <div key={s.n} className="text-center group">
                <div className="relative mx-auto flex items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors" style={{ height: "4.5rem", width: "4.5rem" }}>
                  <s.icon className="h-8 w-8 text-primary" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-black text-white">{s.n}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{s.t}</h3>
                <p className="mt-2 text-sm text-slate-500">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  5 · DASHBOARD PROOF                                         */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className={C}>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">Execution, not just documentation</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Documentation Is Only Useful If Your Team Actually Follows It</h2>
            <p className="mt-3 text-slate-500">Assign procedures by role. See who has read them. Flag who hasn&rsquo;t. Export proof when you need it.</p>
          </div>
          <div className="mx-auto max-w-5xl">
            <Card className="border-0 shadow-2xl ring-1 ring-slate-200 overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4 rounded-md bg-slate-700 px-3 py-1">
                  <span className="text-xs text-slate-400 font-mono">app.dentisop.com/dashboard</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 sm:p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { icon: FileText, label: "Procedures", value: "12", sub: "+3 this month", colour: "text-indigo-600", iconBg: "bg-indigo-50" },
                    { icon: Users, label: "Team Members", value: "6", sub: "All active", colour: "text-violet-600", iconBg: "bg-violet-50" },
                    { icon: Eye, label: "Read Rate", value: "87%", sub: "+12% vs last month", colour: "text-emerald-600", iconBg: "bg-emerald-50" },
                    { icon: AlertTriangle, label: "Review Overdue", value: "1", sub: "Action needed", colour: "text-red-600", iconBg: "bg-red-50" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-white border border-slate-200 p-3.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${s.iconBg}`}>
                          <s.icon className={`h-3.5 w-3.5 ${s.colour}`} />
                        </div>
                        <p className="text-xs text-slate-500">{s.label}</p>
                      </div>
                      <p className={`text-xl font-bold ${s.colour}`}>{s.value}</p>
                      <p className="text-[11px] text-slate-400">{s.sub}</p>
                    </div>
                  ))}
                </div>
                {/* Score bar */}
                <div className="rounded-xl bg-white border border-slate-200 p-4 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-slate-800">Documentation Score</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">82%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: "82%" }} />
                  </div>
                </div>
                {/* Procedure table */}
                <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
                  <div className="px-4 py-3 border-b bg-slate-50 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800">Procedures &amp; Team Tracking</span>
                    <Badge variant="secondary" className="text-xs">Live</Badge>
                  </div>
                  <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b">
                    <div className="col-span-4">Procedure</div>
                    <div className="col-span-3">Assigned To</div>
                    <div className="col-span-2">Read Status</div>
                    <div className="col-span-3 text-right">Review</div>
                  </div>
                  <div className="divide-y">
                    {[
                      { name: "Instrument Sterilization", assigned: "Sarah J., Mike R.", read: "2/2 read", status: "Current", sc: "text-emerald-600 bg-emerald-50", readSc: "text-emerald-600" },
                      { name: "OSHA Exposure Control", assigned: "All Staff (6)", read: "5/6 read", status: "1 pending", sc: "text-amber-600 bg-amber-50", readSc: "text-amber-600" },
                      { name: "Patient Intake Workflow", assigned: "Front Desk", read: "3/3 read", status: "Current", sc: "text-emerald-600 bg-emerald-50", readSc: "text-emerald-600" },
                      { name: "Insurance Verification", assigned: "Maria T., Lisa K.", read: "1/2 read", status: "Review Due", sc: "text-amber-600 bg-amber-50", readSc: "text-amber-600" },
                      { name: "New Hire Onboarding", assigned: "Not assigned", read: "\u2014", status: "Draft", sc: "text-blue-600 bg-blue-50", readSc: "text-slate-400" },
                    ].map((proc) => (
                      <div key={proc.name} className="grid grid-cols-12 gap-2 items-center px-4 py-2.5 hover:bg-slate-50/80 transition-colors">
                        <div className="col-span-12 sm:col-span-4 flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                          <span className="text-sm font-medium text-slate-800 truncate">{proc.name}</span>
                        </div>
                        <div className="col-span-4 sm:col-span-3"><span className="text-xs text-slate-500">{proc.assigned}</span></div>
                        <div className="col-span-4 sm:col-span-2"><span className={`text-xs font-semibold ${proc.readSc}`}>{proc.read}</span></div>
                        <div className="col-span-4 sm:col-span-3 flex justify-end">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${proc.sc}`}>{proc.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  6 · SAMPLE SOP                                              */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="sample-sop" className="bg-slate-50 py-20 border-y border-slate-200">
        <div className={C}>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">Real output</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              This Is What the Output Actually Looks Like
            </h2>
            <p className="mt-3 text-slate-500">Not a mockup. Not generic AI text. This is a real DentiSOP procedure&mdash;structured, assignable, and ready for your team.</p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Card className="border-0 shadow-2xl ring-1 ring-primary/20 overflow-hidden">
              <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-primary/5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Badge className="mb-2 border-primary/20 bg-primary/10 text-primary hover:bg-primary/15">Real Output</Badge>
                    <h3 className="text-xl font-bold text-slate-900">Instrument Sterilization Protocol</h3>
                    <p className="mt-1 text-sm text-slate-500">PROC-STER-001 &middot; v1.0</p>
                  </div>
                  <div className="flex gap-1.5">
                    <Badge variant="outline" className="text-xs">OSHA</Badge>
                    <Badge variant="outline" className="text-xs">CDC</Badge>
                    <Badge variant="outline" className="text-xs">State Board</Badge>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { icon: ClipboardCheck, label: "Standardize sterilization" },
                    { icon: Users, label: "All clinical staff" },
                    { icon: Shield, label: "CDC + OSHA aligned" },
                    { icon: FileText, label: "29 CFR 1910.1030" },
                  ].map((chip) => (
                    <div key={chip.label} className="flex items-center gap-2 rounded-lg bg-white/80 border border-slate-100 px-3 py-2">
                      <chip.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-xs font-medium text-slate-700">{chip.label}</span>
                    </div>
                  ))}
                </div>
              </CardHeader>
              <CollapsibleSOP />
            </Card>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-600 mb-4">This procedure is documented, assigned, and tracked. Are yours?</p>
            <Button size="lg" asChild className="shadow-lg shadow-primary/20">
              <Link href="/signup">Run My Gap Check <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  7 · COMPARISON (Binders / Docs / AI vs DentiSOP)            */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className={C}>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-600">Comparison</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Binders and Docs Are Not a System</h2>
          </div>
          <div className="mx-auto max-w-4xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 pr-4 text-left font-semibold text-slate-500 w-1/4">Capability</th>
                  <th className="py-3 px-4 text-center font-semibold text-slate-500 w-1/4">Binder / Google Docs</th>
                  <th className="py-3 px-4 text-center font-semibold text-slate-500 w-1/4">Generic AI Chat</th>
                  <th className="py-3 px-4 text-center font-semibold text-primary w-1/4">DentiSOP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { cap: "Dental-specific templates", binder: false, ai: false, ds: true },
                  { cap: "Regulatory framework tagging", binder: false, ai: false, ds: true },
                  { cap: "Role-based assignment", binder: false, ai: false, ds: true },
                  { cap: "Read acknowledgment tracking", binder: false, ai: false, ds: true },
                  { cap: "Version history", binder: false, ai: false, ds: true },
                  { cap: "Review reminders", binder: false, ai: false, ds: true },
                  { cap: "Exportable audit records", binder: false, ai: false, ds: true },
                  { cap: "Structured, editable output", binder: false, ai: "partial", ds: true },
                ].map((r) => (
                  <tr key={r.cap} className="hover:bg-slate-50/60">
                    <td className="py-3 pr-4 font-medium text-slate-700">{r.cap}</td>
                    <td className="py-3 px-4 text-center">{r.binder ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : <X className="mx-auto h-4 w-4 text-slate-300" />}</td>
                    <td className="py-3 px-4 text-center">{r.ai === true ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : r.ai === "partial" ? <span className="text-xs text-amber-500 font-medium">Partial</span> : <X className="mx-auto h-4 w-4 text-slate-300" />}</td>
                    <td className="py-3 px-4 text-center">{r.ds ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : <X className="mx-auto h-4 w-4 text-slate-300" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  8 · SOCIAL PROOF / TESTIMONIAL PLACEHOLDER                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      {/* TODO: Replace with real testimonials and case studies once available.
          Suggested format: 2-3 quote cards from office managers / practice owners.
          Include: name, role, practice size, specific outcome (e.g., "Cut onboarding from 3 weeks to 3 days").
          Do NOT use fake quotes or invented names. */}

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  9 · PRICING                                                 */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className={C}>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">Pricing</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Start With Your First Procedures
            </h2>
            <p className="mt-3 text-slate-500">No implementation project. No onboarding calls. Pick a plan and document your first procedure in minutes.</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {PLANS.map((p) => (
              <Card key={p.name} className={p.pop ? "relative scale-[1.02] border-primary shadow-xl ring-2 ring-primary/20" : "border-slate-200"}>
                {p.pop && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-sm">Most Popular</Badge>}
                <CardHeader>
                  <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                  <p className="text-sm text-slate-500">{p.desc}</p>
                  <div className="mt-3">
                    <span className="text-4xl font-black text-slate-900">{p.price}</span>
                    {p.period && <span className="font-medium text-slate-500">{p.period}</span>}
                  </div>
                  {"annual" in p && p.annual && (
                    <p className="mt-1 text-sm font-semibold text-emerald-600">{p.annual}/mo billed annually &mdash; save ~20%</p>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />{f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" size="lg" variant={p.pop ? "default" : "outline"} asChild>
                    <Link href={p.href}>{p.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Need SSO, custom frameworks, or a HIPAA BAA?{" "}
            <Link href="/contact" className="font-medium text-primary underline">Talk to us about Enterprise</Link>.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  10 · FAQ                                                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className={C}>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">Common Questions</h2>
          </div>
          <div className="mx-auto max-w-3xl divide-y divide-slate-200">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="pr-4 font-semibold text-slate-900">{f.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  11 · FINAL CTA                                              */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-950 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.12),transparent)]" />
        <div className={`${C} relative`}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Stop Relying on Memory.{" "}
              <span className="text-slate-400">Run Your Practice to One Standard.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-400">
              Find the gaps. Document the procedures. Assign them to your team. Prove they were followed.
            </p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <Button size="lg" asChild className="h-14 px-10 text-base shadow-lg shadow-primary/25">
                <Link href="/signup">
                  Run My Gap Check
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <a href="#sample-sop" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors underline underline-offset-4 decoration-slate-600 hover:decoration-white">View Sample SOP</a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { icon: Shield, label: "30-day guarantee" },
                { icon: CreditCard, label: "No card required" },
                { icon: Zap, label: "Free to start" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-400">
                  <p.icon className="h-4 w-4 text-indigo-400" />
                  {p.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
