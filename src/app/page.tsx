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
  DollarSign,
  UserX,
  FolderOpen,
  RefreshCw,
  Lock,
  Flame,
  CircleAlert,
  BookOpen,
  Zap,
  Eye,
  Target,
  FileText,
  UserPlus,
  HelpCircle,
  CreditCard,
  MessageCircle,
  BarChart3,
  ClipboardCheck,
  TrendingUp,
  Activity,
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
  { name: "Instrument Sterilisation Protocol", status: "missing" },
  { name: "OSHA Exposure Control Plan", status: "missing" },
  { name: "HIPAA Privacy Procedures", status: "missing" },
  { name: "Bloodborne Pathogens Programme", status: "missing" },
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

const BEFORE = [
  "Procedures live in people\u2019s heads",
  "New hires shadow for 2\u20133 weeks",
  "Every handover is different",
  "Compliance docs outdated or missing",
  "No proof staff read protocols",
  "Key person leaves \u2192 knowledge gone",
];
const AFTER = [
  "Every procedure documented and assigned",
  "Workflows assigned from day one",
  "Same standard, every time",
  "Compliance docs always current",
  "Digital acknowledgements tracked",
  "Knowledge stays with the practice forever",
];

const PLANS = [
  {
    name: "Starter",
    price: "\u00a30",
    period: "",
    desc: "See it in action. No commitment.",
    features: ["3 procedures/month", "2 templates", "PDF export", "OSHA & HIPAA basics"],
    cta: "Start Free",
    href: "/signup",
    pop: false,
  },
  {
    name: "Clinic",
    price: "\u00a379",
    annual: "\u00a359",
    period: "/mo",
    desc: "Everything for one location.",
    features: [
      "Unlimited procedures",
      "All templates + frameworks",
      "PDF, Word, Markdown exports",
      "Version history",
      "Team tracking & acknowledgements",
      "30-day money-back guarantee",
    ],
    cta: "Build Your System",
    href: "/signup?plan=practice",
    pop: true,
  },
  {
    name: "Multi-Clinic",
    price: "\u00a3149",
    annual: "\u00a3119",
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
    cta: "Standardise All Locations",
    href: "/signup?plan=group",
    pop: false,
  },
];

const FAQS = [
  {
    q: "Will these procedures satisfy an OSHA inspector?",
    a: "DentiSOP structures every procedure around OSHA, HIPAA, and CDC documentation requirements\u00a0\u2014\u00a0including the regulatory cross-references inspectors look for. We always recommend your compliance officer reviews before implementation.",
  },
  {
    q: "How is this different from Google Docs or a binder?",
    a: "Google Docs gives you a blank page. A binder collects dust. DentiSOP gives you dental-specific templates, compliance tagging, version history, team acknowledgement tracking, and audit-ready exports\u00a0\u2014\u00a0all in one system.",
  },
  {
    q: "I don\u2019t have time to learn another tool.",
    a: "Describe any procedure in plain language. DentiSOP structures it into a professional, compliant document in under 60 seconds. Most office managers document their first procedure within 2 minutes.",
  },
  {
    q: "Is the output actually usable?",
    a: "Scroll up and read the sterilisation protocol on this page. That\u2019s a real DentiSOP output\u00a0\u2014\u00a0not a mockup.",
  },
  {
    q: "What if I cancel?",
    a: "Every paid plan has a 30-day money-back guarantee. Cancel anytime. You keep every procedure you\u2019ve exported.",
  },
  {
    q: "Is this just an AI chatbot?",
    a: "No. DentiSOP is a complete operations system\u00a0\u2014\u00a0procedure library, compliance mapping, team assignments, read-tracking, review scheduling, and audit-ready exports. The AI helps you draft; the system helps you run your clinic.",
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
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
        <div className={`${C} relative`}>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[2.5rem] leading-[1.1] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              If Your Best Assistant Quits Tomorrow,{" "}
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                Does Your Clinic Still Run?
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Document every procedure. Standardise every workflow. Be inspection-ready today.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="h-14 px-10 text-base shadow-lg shadow-primary/20">
                <Link href="/signup">Build Your Clinic System <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 bg-transparent text-white border-slate-600 hover:bg-white/5">
                <Link href="#sample-procedure">See a Real Procedure</Link>
              </Button>
            </div>

            {/* Icon pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { icon: Zap, label: "60-second generation" },
                { icon: Shield, label: "OSHA + HIPAA mapped" },
                { icon: Users, label: "Team tracking built-in" },
                { icon: Clock, label: "Annual review alerts" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-slate-300">
                  <p.icon className="h-4 w-4 text-indigo-400" />
                  {p.label}
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm text-slate-500">No credit card. First procedure documented in under 60 seconds.</p>
          </div>
        </div>
      </section>

      {/* ── RISK BAR (icon-stat strip) ───────────────────────────── */}
      <div className="bg-red-600 py-3.5">
        <div className={`${C} flex flex-col items-center justify-center gap-3 text-sm font-semibold text-white md:flex-row md:gap-10`}>
          <span className="flex items-center gap-2"><ShieldAlert className="h-4 w-4 opacity-80" />$16,550 per OSHA violation</span>
          <span className="hidden text-red-300 md:inline">|</span>
          <span className="flex items-center gap-2"><DollarSign className="h-4 w-4 opacity-80" />$2.19M HIPAA penalty cap</span>
          <span className="hidden text-red-300 md:inline">|</span>
          <span className="flex items-center gap-2"><UserX className="h-4 w-4 opacity-80" />$23,650&ndash;$94,600 per DA replacement</span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  2 · SAMPLE PROCEDURE (collapsible)                         */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="sample-procedure" className="bg-slate-50 py-20">
        <div className={C}>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">Real output</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              This Is What Your Procedures Should Look Like
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <Card className="border-0 shadow-2xl ring-1 ring-primary/20 overflow-hidden">
              <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-primary/5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Badge className="mb-2 border-primary/20 bg-primary/10 text-primary hover:bg-primary/15">Real Output</Badge>
                    <h3 className="text-xl font-bold text-slate-900">Instrument Sterilisation Protocol</h3>
                    <p className="mt-1 text-sm text-slate-500">PROC-STER-001 &middot; v1.0</p>
                  </div>
                  <div className="flex gap-1.5">
                    <Badge variant="outline" className="text-xs">OSHA</Badge>
                    <Badge variant="outline" className="text-xs">CDC</Badge>
                    <Badge variant="outline" className="text-xs">State Board</Badge>
                  </div>
                </div>
                {/* Icon chips */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { icon: Target, label: "Standardise sterilisation" },
                    { icon: Users, label: "All clinical staff" },
                    { icon: Shield, label: "CDC + OSHA compliant" },
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

          {/* Big stat CTA */}
          <div className="mt-10 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-6xl font-black text-primary">47</span>
              <div className="text-left">
                <p className="text-lg font-bold text-slate-900">seconds</p>
                <p className="text-sm text-slate-500">to generate this procedure</p>
              </div>
            </div>
            <Button size="lg" asChild className="mt-6 shadow-lg shadow-primary/20">
              <Link href="/signup">Generate One Like This <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  3 · PROBLEMS (icon + stat cards)                           */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className={C}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-red-600">The reality</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              This Is Happening Right Now
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: UserX, title: "Best DA quits", stat: "$23,650\u2013$94,600", sub: "replacement cost", colour: "text-red-600" },
              { icon: AlertTriangle, title: "No consistency", stat: "3 different", sub: "answers per procedure", colour: "text-red-600" },
              { icon: ShieldAlert, title: "OSHA exposure", stat: "$165,514", sub: "max wilful fine", colour: "text-red-600" },
              { icon: Clock, title: "Slow onboarding", stat: "3 weeks", sub: "before new hires are useful", colour: "text-amber-600" },
              { icon: Flame, title: "Constant interruptions", stat: "5+", sub: "repeated questions per day", colour: "text-amber-600" },
              { icon: CircleAlert, title: "Zero documentation", stat: "0", sub: "written procedures on file", colour: "text-red-600" },
            ].map((p) => (
              <Card key={p.title} className="border-red-100 bg-gradient-to-b from-red-50/60 to-white text-center transition-all hover:shadow-lg hover:border-red-200">
                <CardContent className="pt-6 pb-5">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 mb-3">
                    <p.icon className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="font-bold text-slate-900">{p.title}</h3>
                  <p className={`text-3xl font-black mt-2 ${p.colour}`}>{p.stat}</p>
                  <p className="text-xs text-slate-500 mt-1">{p.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  3b · HUMAN MOMENT                                          */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="border-y border-slate-200 bg-white py-14">
        <div className={`${C} mx-auto max-w-3xl text-center`}>
          <div className="flex justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="relative flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 border border-amber-200">
                <MessageCircle className="h-4 w-4 text-amber-500" />
              </div>
            ))}
            <div className="flex h-10 items-center justify-center rounded-full bg-red-100 border border-red-200 px-3">
              <span className="text-sm font-bold text-red-600">+10 today</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
            The same questions. Every. Single. Day.
          </p>
          <p className="mt-4 font-semibold text-red-600">
            That&rsquo;s not a staffing problem. That&rsquo;s a systems problem.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  3c · SCENARIO TIMELINE                                      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-950 py-16">
        <div className={C}>
          <p className="mb-10 text-center text-sm font-bold uppercase tracking-widest text-red-400">One week without documented procedures</p>
          <div className="mx-auto max-w-4xl">
            {/* Desktop timeline */}
            <div className="hidden sm:flex items-start justify-between relative">
              {/* Connector line */}
              <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber-500 via-red-500 to-red-600" />
              {[
                { day: "Mon", icon: UserPlus, label: "No onboarding\nchecklist", colour: "bg-amber-500" },
                { day: "Tue", icon: HelpCircle, label: "3 different\nanswers", colour: "bg-amber-600" },
                { day: "Wed", icon: AlertTriangle, label: "Step skipped.\nNo one noticed", colour: "bg-red-500" },
                { day: "Thu", icon: Clock, label: "Patient\ncomplaints", colour: "bg-red-600" },
                { day: "Fri", icon: ShieldAlert, label: "Inspector\narrives", colour: "bg-red-700" },
              ].map((d) => (
                <div key={d.day} className="relative flex flex-col items-center text-center w-1/5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${d.colour} shadow-lg z-10`}>
                    <d.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-white">{d.day}</p>
                  <p className="mt-1 text-xs text-slate-400 whitespace-pre-line">{d.label}</p>
                </div>
              ))}
            </div>
            {/* Mobile stacked */}
            <div className="sm:hidden space-y-3">
              {[
                { day: "Mon", icon: UserPlus, label: "No onboarding checklist", colour: "bg-amber-500" },
                { day: "Tue", icon: HelpCircle, label: "3 different answers", colour: "bg-amber-600" },
                { day: "Wed", icon: AlertTriangle, label: "Step skipped. No one noticed", colour: "bg-red-500" },
                { day: "Thu", icon: Clock, label: "Patient complaints", colour: "bg-red-600" },
                { day: "Fri", icon: ShieldAlert, label: "Inspector arrives", colour: "bg-red-700" },
              ].map((d) => (
                <div key={d.day} className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${d.colour}`}>
                    <d.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{d.day}</p>
                    <p className="text-xs text-slate-400">{d.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-10 text-center text-lg font-bold text-red-400">This is Tuesday at most dental practices.</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  4 · PRACTICE DOCUMENTATION SCORE                           */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20">
        <div className={C}>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-red-600">Diagnosis</p>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                How Documented Is Your Practice?
              </h2>
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
                    <Link href="/signup">Close the Gap <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  5 · THE SOLUTION (icon cards)                               */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className={C}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">The fix</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Your Clinic&rsquo;s Operating System
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FolderOpen, t: "Procedure Library", d: "One searchable location for every workflow." },
              { icon: Shield, t: "Compliance Mapping", d: "Tagged to OSHA, HIPAA, CDC, ADA." },
              { icon: RefreshCw, t: "Version Control", d: "Update once, everyone sees it." },
              { icon: Lock, t: "Audit-Ready Exports", d: "PDF + Word with compliance refs." },
            ].map((item) => (
              <Card key={item.t} className="border-slate-100 text-center transition-all hover:border-primary/30 hover:shadow-lg group">
                <CardContent className="pt-8 pb-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">{item.t}</h3>
                  <p className="mt-2 text-sm text-slate-500">{item.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  6 · BEFORE / AFTER                                         */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20">
        <div className={C}>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">Transformation</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">From Chaos to Control</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <Card className="border-red-200 bg-red-50/60">
              <CardHeader className="pb-3">
                <h3 className="flex items-center gap-2 text-lg font-bold text-red-800"><X className="h-5 w-5" /> Before</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {BEFORE.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-red-700"><X className="h-4 w-4 shrink-0 opacity-60" />{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50/60">
              <CardHeader className="pb-3">
                <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-800"><CheckCircle className="h-5 w-5" /> After</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {AFTER.map((a) => (
                    <li key={a} className="flex items-center gap-2.5 text-sm text-emerald-700"><Check className="h-4 w-4 shrink-0" />{a}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  6b · SYSTEM STATEMENT                                       */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="border-y border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 py-14">
        <div className={`${C} mx-auto max-w-3xl text-center`}>
          <p className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
            Not a document generator.<br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">The system your clinic runs on.</span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {[
              { icon: Users, label: "Assigned to staff" },
              { icon: Eye, label: "Tracked for reads" },
              { icon: RefreshCw, label: "Updated in real time" },
              { icon: Shield, label: "Audit-ready always" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-full bg-white border border-indigo-200 px-5 py-2.5 shadow-sm">
                <item.icon className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  6c · DAILY USAGE                                            */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className={C}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-600">Daily operations</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Used Every Day. Not Once.</h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                icon: UserPlus,
                title: "New hire joins",
                desc: "Assign role-specific procedures. Track acknowledgements.",
                tag: "Onboarding",
                colour: "bg-violet-50 text-violet-600",
                iconBg: "bg-violet-100",
              },
              {
                icon: BarChart3,
                title: "Weekly check",
                desc: "See who read what. Spot gaps instantly.",
                tag: "Monitoring",
                colour: "bg-indigo-50 text-indigo-600",
                iconBg: "bg-indigo-100",
              },
              {
                icon: RefreshCw,
                title: "Process changes",
                desc: "Update once. Everyone gets the current version.",
                tag: "Updates",
                colour: "bg-emerald-50 text-emerald-600",
                iconBg: "bg-emerald-100",
              },
            ].map((item) => (
              <Card key={item.title} className="border-slate-100 text-center transition-all hover:shadow-lg hover:border-indigo-200 group">
                <CardContent className="pt-8 pb-6">
                  <Badge className={`${item.colour} hover:${item.colour} mb-4`}>{item.tag}</Badge>
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-7 w-7 text-slate-700" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  6d · SYSTEM PREVIEW (dashboard mockup)                      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20">
        <div className={C}>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">Inside the platform</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Your Clinic, Organised</h2>
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
                  {/* Column headers */}
                  <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b">
                    <div className="col-span-4">Procedure</div>
                    <div className="col-span-3">Assigned To</div>
                    <div className="col-span-2">Read Status</div>
                    <div className="col-span-3 text-right">Review</div>
                  </div>
                  <div className="divide-y">
                    {[
                      { name: "Instrument Sterilisation", assigned: "Sarah J., Mike R.", read: "2/2 read", status: "Current", sc: "text-emerald-600 bg-emerald-50", readSc: "text-emerald-600" },
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
      {/*  7 · GOOGLE DOCS / BINDER COMPARISON                        */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className={C}>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-600">Upgrade</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Binders &amp; Google Docs vs. DentiSOP</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {[
              { old: "Last updated 2019", now: "Always current, version-tracked" },
              { old: "14 scattered Google Docs", now: "One searchable procedure library" },
              { old: "Procedures from memory", now: "Step-by-step with roles assigned" },
              { old: "No proof anyone read it", now: "Digital acknowledgement tracking" },
              { old: "Binder + good luck for new hires", now: "Role-based assignments from day one" },
              { old: "Manual compliance tracking", now: "Automated review reminders" },
            ].map((r, i) => (
              <div key={i} className="grid overflow-hidden rounded-xl border shadow-sm md:grid-cols-2">
                <div className="flex items-center gap-3 border-r border-red-100 bg-red-50 p-4">
                  <X className="h-5 w-5 shrink-0 text-red-400" />
                  <p className="text-sm font-medium text-red-800">{r.old}</p>
                </div>
                <div className="flex items-center gap-3 bg-emerald-50 p-4">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                  <p className="text-sm font-medium text-emerald-800">{r.now}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  8 · HOW IT WORKS                                            */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20">
        <div className={C}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">How it works</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Three Steps. Done.</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-3">
            {[
              { n: "01", icon: BookOpen, t: "Describe", d: "Pick a template or type in plain language." },
              { n: "02", icon: Zap, t: "Generate", d: "Structured, compliant procedure in under 60 seconds." },
              { n: "03", icon: Users, t: "Deploy", d: "Assign to staff. Track reads. Be inspection-ready." },
            ].map((s) => (
              <div key={s.n} className="text-center group">
                <div className="relative mx-auto flex h-18 w-18 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors" style={{ height: "4.5rem", width: "4.5rem" }}>
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
      {/*  9 · PRICING                                                 */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className={C}>
          <div className="mx-auto mb-4 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">Pricing</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              One Mistake Costs More Than a Year
            </h2>
          </div>

          {/* Cost comparison icons */}
          <div className="mx-auto mb-12 max-w-2xl">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                <ShieldAlert className="mx-auto h-8 w-8 text-red-500 mb-2" />
                <p className="text-2xl font-black text-red-700">$16,550</p>
                <p className="text-xs text-red-500 mt-1">OSHA fine</p>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                <UserX className="mx-auto h-8 w-8 text-red-500 mb-2" />
                <p className="text-2xl font-black text-red-700">$23,650+</p>
                <p className="text-xs text-red-500 mt-1">DA replacement</p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                <Shield className="mx-auto h-8 w-8 text-emerald-500 mb-2" />
                <p className="text-2xl font-black text-emerald-700">&pound;59/mo</p>
                <p className="text-xs text-emerald-500 mt-1">DentiSOP</p>
              </div>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {PLANS.map((p) => (
              <Card key={p.name} className={p.pop ? "relative scale-[1.02] border-primary shadow-xl ring-2 ring-primary/20" : "border-slate-200"}>
                {p.pop && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-sm">Best Value</Badge>}
                <CardHeader>
                  <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                  <p className="text-sm text-slate-500">{p.desc}</p>
                  <div className="mt-3">
                    <span className="text-4xl font-black text-slate-900">{p.price}</span>
                    {p.period && <span className="font-medium text-slate-500">{p.period}</span>}
                  </div>
                  {"annual" in p && p.annual && (
                    <p className="mt-1 text-sm font-semibold text-emerald-600">{p.annual}/mo billed annually &mdash; save 25%</p>
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
      <section className="bg-slate-50 py-20">
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
            <p className="mb-6 text-sm font-bold uppercase tracking-widest text-red-400">Stop gambling</p>
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Your Next Inspector Won&rsquo;t Send a Calendar Invite.
            </h2>
            <p className="mt-5 text-lg text-slate-400">
              Every day without documented procedures is a gamble.
            </p>
            <p className="mt-3 font-medium text-white">
              Stop running your clinic on memory.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="h-14 px-10 text-base shadow-lg shadow-primary/25">
                <Link href="/signup">
                  Standardise Your Clinic Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {/* Trust pills */}
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
