import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle,
  Shield,
  Clock,
  Users,
  FileText,
  Stethoscope,
  ClipboardList,
  HeartPulse,
  GraduationCap,
  ArrowRight,
  ChevronDown,
  X,
  Check,
  Zap,
  BarChart3,
  Building2,
  DollarSign,
  ShieldAlert,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

const CONTAINER = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const PAIN_POINTS = [
  {
    title: "Your team follows a different process every time",
    description:
      "Sterilisation, patient intake, room turnover \u2014 it all looks different depending on who\u2019s working. Inconsistency is invisible until it costs you.",
  },
  {
    title: "New hires take weeks to become productive",
    description:
      "Without documented procedures, onboarding means shadowing for days and hoping they remember. At a median wage of $47,300/yr, two unproductive weeks costs ~$1,819 per hire.",
  },
  {
    title: "One missing SOP. One OSHA inspector. $16,550.",
    description:
      "OSHA serious violations carry penalties up to $16,550 each. HIPAA annual penalty caps reach $2,190,294. You know you need written procedures \u2014 who has time to write them?",
  },
  {
    title: "Your best DA just quit. Her knowledge left with her.",
    description:
      "Replacing one dental assistant costs 50\u2013200% of annual salary \u2014 that\u2019s $23,650\u2013$94,600. When key staff leave, years of institutional knowledge disappear overnight.",
  },
];

const BENEFITS = [
  {
    icon: CheckCircle,
    title: "Consistent Execution",
    description:
      "Every team member follows the exact same steps, every time. No variation, no shortcuts, no missed steps.",
  },
  {
    icon: Zap,
    title: "Faster Onboarding",
    description:
      "Hand a new hire your procedure library on day one. Training goes from weeks to days.",
  },
  {
    icon: Shield,
    title: "Audit-Ready Documentation",
    description:
      "Generate SOPs aligned with OSHA, HIPAA, and CDC standards. Always ready for inspection.",
  },
  {
    icon: FileText,
    title: "One Source of Truth",
    description:
      "All your procedures in one place. Update once, and the whole team is aligned.",
  },
];

const TEMPLATES = [
  {
    title: "Instrument Sterilisation Protocol",
    category: "Clinical",
    description:
      "CDC-compliant sterilisation workflows for handpieces, cassettes, and loose instruments.",
    icon: Shield,
  },
  {
    title: "Operatory Turnover Procedure",
    category: "Clinical",
    description:
      "Standardise room breakdown, disinfection, and setup between patients.",
    icon: ClipboardList,
  },
  {
    title: "New Patient Intake",
    category: "Front Office",
    description:
      "Streamline registration, insurance verification, and medical history collection.",
    icon: FileText,
  },
  {
    title: "OSHA Exposure Control Plan",
    category: "Compliance",
    description:
      "Meet OSHA Bloodborne Pathogens Standard requirements with a complete procedure.",
    icon: Stethoscope,
  },
  {
    title: "Dental Emergency Response",
    category: "Clinical",
    description:
      "Prepare your team to respond to syncope, anaphylaxis, and cardiac events.",
    icon: HeartPulse,
  },
  {
    title: "Dental Assistant Onboarding",
    category: "Training",
    description:
      "A step-by-step checklist to bring new assistants up to speed fast.",
    icon: GraduationCap,
  },
];

const BEFORE = [
  "Procedures live in people\u2019s heads",
  "New hires shadow for 2+ weeks",
  "Every operatory turnover is different",
  "Compliance docs are outdated or missing",
  "No way to track what\u2019s been updated",
];

const AFTER = [
  "Every procedure is documented and accessible",
  "New hires follow step-by-step SOPs from day one",
  "Turnover is standardised across every room",
  "Compliance documentation is always current",
  "Version history tracks every change",
];

const STEPS = [
  {
    num: "1",
    title: "Choose Your Workflow",
    description:
      "Pick from dental-specific templates or describe any procedure your team actually follows.",
  },
  {
    num: "2",
    title: "Customise the Details",
    description:
      "Add your practice\u2019s specifics \u2014 team roles, equipment, protocols, compliance needs.",
  },
  {
    num: "3",
    title: "Generate & Implement",
    description:
      "Get a professional SOP ready for your procedure library, your team, and your next inspection.",
  },
];

const DOLLAR_IMPACTS = [
  {
    icon: ShieldAlert,
    value: "$16,550",
    label: "per serious OSHA violation",
    detail: "A single undocumented procedure could cost more than 10 years of DentiSOP.",
  },
  {
    icon: DollarSign,
    value: "$2,190,294",
    label: "HIPAA annual penalty cap",
    detail: "Lack of documented procedures = presumed non-compliance.",
  },
  {
    icon: UserX,
    value: "$23,650\u2013$94,600",
    label: "cost to replace one dental assistant",
    detail: "50\u2013200% of annual salary walks out the door with every departure.",
  },
  {
    icon: Clock,
    value: "2\u20134 weeks",
    label: "to onboard without SOPs",
    detail: "At $47,300/yr median wage, that\u2019s ~$1,819 in wasted wages per hire.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    period: "",
    description: "See DentiSOP in action \u2014 no commitment.",
    features: [
      "2 SOPs per month",
      "2 starter templates",
      "PDF export (watermarked)",
      "OSHA & HIPAA basics",
      "Email support (72-hour)",
    ],
    cta: "Start Free Pilot",
    href: "/signup",
    popular: false,
  },
  {
    name: "Practice",
    price: "$97",
    annualPrice: "$67",
    period: "/mo",
    description: "For single-location practices ready to standardise.",
    features: [
      "Unlimited SOPs",
      "All templates",
      "PDF + Word + Markdown \u2014 no watermark",
      "Full OSHA, HIPAA, CDC, ADA frameworks",
      "30-day version history",
      "Email support (48-hour)",
      "30-day money-back guarantee",
    ],
    cta: "Start 14-Day Pilot",
    href: "/signup?plan=practice",
    popular: true,
  },
  {
    name: "Group",
    price: "$197",
    annualPrice: "$147",
    period: "/mo",
    description: "For group practices and DSOs managing 2+ locations.",
    features: [
      "Everything in Practice",
      "Team sharing (up to 15 users)",
      "Up to 5 locations",
      "Custom branding on exports",
      "Compliance audit trail",
      "HIPAA BAA included",
      "Priority support (24-hour)",
    ],
    cta: "Start 14-Day Pilot",
    href: "/signup?plan=group",
    popular: false,
  },
];

const FAQS = [
  {
    q: "Is this only for dental practices?",
    a: "Yes. DentiSOP was built exclusively for dental practices. Every template, compliance reference, and workflow is designed around the way dental offices actually operate \u2014 from sterilisation to front-desk intake.",
  },
  {
    q: "Do I need to be technical to use this?",
    a: "Not at all. If you can describe a process in plain language, DentiSOP can turn it into a professional SOP. No technical skills required.",
  },
  {
    q: "Will these SOPs pass an OSHA inspection?",
    a: "DentiSOP generates SOPs aligned with OSHA, HIPAA, and CDC guidelines. They\u2019re structured to meet the documentation standards inspectors look for. We recommend reviewing each SOP with your compliance officer before implementation.",
  },
  {
    q: "How long does it take to generate an SOP?",
    a: "Most SOPs are generated in under 60 seconds. You can edit, customise, and export immediately after.",
  },
  {
    q: "Can I customise the SOPs after generation?",
    a: "Every SOP is fully editable. Change steps, adjust roles, add your own notes \u2014 make it fit exactly how your practice operates.",
  },
  {
    q: "Is the AI-generated content actually usable?",
    a: "DentiSOP uses AI to draft your SOP based on your description. The output includes proper regulatory references, role assignments, and step-by-step detail. You review, edit, and approve every word before it becomes official.",
  },
  {
    q: "What if it doesn\u2019t work for my practice?",
    a: "Every paid plan includes a 30-day money-back guarantee. If DentiSOP doesn\u2019t save your team time, we\u2019ll refund every penny. No questions asked.",
  },
];

/* ------------------------------------------------------------------ */
/*  CATEGORY BADGE COLOUR                                              */
/* ------------------------------------------------------------------ */

function categoryColour(cat: string) {
  switch (cat) {
    case "Clinical":
      return "bg-blue-100 text-blue-800";
    case "Compliance":
      return "bg-amber-100 text-amber-800";
    case "Front Office":
      return "bg-emerald-100 text-emerald-800";
    case "Training":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                One Missing SOP. One OSHA Inspector.{" "}
                <span className="text-primary">$16,550.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Your practice is one undocumented procedure away from a serious
                citation. DentiSOP helps dental teams document, standardise, and
                train on every procedure &mdash; so your practice runs the same
                way every time, no matter who is working.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="#sample-sop">
                    See a Sample SOP &mdash; No Signup Required
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/signup">Start Your Free Pilot</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Built for dental office managers and practice owners. No credit card required.
              </p>
            </div>

            {/* Decorative mockup card */}
            <div className="hidden lg:block">
              <Card className="shadow-xl border-slate-200 rotate-1 hover:rotate-0 transition-transform">
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="w-fit text-xs">
                    Clinical &middot; Sterilisation
                  </Badge>
                  <h3 className="font-semibold text-lg mt-2">
                    Instrument Sterilisation Protocol
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Pre-clean instruments in enzymatic solution</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Load autoclave per manufacturer instructions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Run biological indicator weekly</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Log cycle number, temp, and time in sterilisation record</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">OSHA</Badge>
                    <Badge variant="outline" className="text-xs">CDC</Badge>
                    <Badge variant="outline" className="text-xs">State Board</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOLLAR IMPACT STRIP ──────────────────────────────── */}
      <section className="py-16 bg-red-50 border-y border-red-100">
        <div className={CONTAINER}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOLLAR_IMPACTS.map((item) => (
              <div key={item.value} className="text-center">
                <item.icon className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-900">{item.value}</p>
                <p className="text-sm font-medium text-red-800 mt-1">{item.label}</p>
                <p className="text-xs text-red-600 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN SECTION ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Sound Familiar?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {PAIN_POINTS.map((p) => (
              <Card
                key={p.title}
                className="border-amber-200 bg-amber-50/50"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ──────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              One System. Every Procedure. Every Team Member.
            </h2>
            <p className="mt-4 text-slate-600">
              DentiSOP helps dental teams document any procedure your team
              actually follows &mdash; without the busywork.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <Card key={b.title} className="text-center">
                <CardContent className="pt-6">
                  <b.icon className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="mt-4 font-semibold text-slate-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {b.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE SOP PREVIEW ────────────────────────────────── */}
      <section id="sample-sop" className="py-20 bg-white">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              See What DentiSOP Actually Produces
            </h2>
            <p className="mt-4 text-slate-600">
              No signup. No email. Just scroll and see exactly what a DentiSOP-generated procedure looks like.
            </p>
          </div>
          <Card className="max-w-3xl mx-auto shadow-lg border-primary/20">
            <CardHeader className="border-b bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">Sample SOP</Badge>
                  <h3 className="text-xl font-bold text-slate-900">Instrument Sterilisation Protocol</h3>
                  <p className="text-sm text-slate-500 mt-1">SOP-STER-001 &middot; Version 1.0 &middot; Department: Sterilisation</p>
                </div>
                <div className="flex gap-1">
                  <Badge variant="outline">OSHA</Badge>
                  <Badge variant="outline">CDC</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Purpose</h4>
                <p className="text-sm text-slate-600">To establish a standardised sterilisation protocol ensuring all reusable dental instruments are properly decontaminated, packaged, and sterilised in compliance with CDC Guidelines for Infection Control in Dental Health-Care Settings and OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030).</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Procedure Steps</h4>
                <div className="space-y-3">
                  {[
                    { step: "1", action: "Transport contaminated instruments to sterilisation area in a covered, puncture-resistant container", role: "Dental Assistant" },
                    { step: "2", action: "Don heavy-duty utility gloves, protective eyewear, and mask before handling", role: "Sterilisation Technician" },
                    { step: "3", action: "Pre-soak instruments in enzymatic cleaning solution for minimum 10 minutes", role: "Sterilisation Technician" },
                    { step: "4", action: "Scrub instruments under running water using a long-handled brush; inspect each instrument for debris", role: "Sterilisation Technician" },
                    { step: "5", action: "Rinse thoroughly, dry, and package in sterilisation pouches with chemical indicator strips", role: "Sterilisation Technician" },
                    { step: "6", action: "Load autoclave according to manufacturer specifications; run at 121\u00b0C / 15 PSI for 30 minutes", role: "Sterilisation Technician" },
                    { step: "7", action: "Record cycle number, temperature, pressure, and time in sterilisation log", role: "Sterilisation Technician" },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">{s.step}</span>
                      <div>
                        <p className="text-slate-700">{s.action}</p>
                        <p className="text-xs text-slate-400 mt-0.5">Role: {s.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-xs text-slate-400 italic">
                  DentiSOP generates SOP drafts using AI. All generated content should be reviewed by a qualified compliance officer before implementation. DentiSOP is not a substitute for professional regulatory or compliance advice.
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/signup">
                Generate One Like This &mdash; Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── TEMPLATES / USE CASES ─────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              SOPs for the Workflows That Matter Most
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((t) => (
              <Card key={t.title}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <t.icon className="h-5 w-5 text-slate-500" />
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColour(t.category)}`}
                    >
                      {t.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900">{t.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {t.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link href="/templates">
                Browse All Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Before DentiSOP vs. After DentiSOP
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader className="pb-2">
                <h3 className="font-semibold text-red-800 flex items-center gap-2">
                  <X className="h-5 w-5" /> Without DentiSOP
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {BEFORE.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-red-700"
                    >
                      <X className="h-4 w-4 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* After */}
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardHeader className="pb-2">
                <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" /> With DentiSOP
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {AFTER.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-emerald-700"
                    >
                      <Check className="h-4 w-4 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Document Any Procedure in Under 60 Seconds
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto">
                  {s.num}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST / VERIFIABLE FACTS ─────────────────────────── */}
      <section className="py-20 bg-white">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Built for Dental Teams. Used by Offices Like Yours.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-primary">&lt;60s</p>
                <p className="mt-2 text-sm text-slate-600">Generate your first SOP in under 60 seconds</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-primary">9+</p>
                <p className="mt-2 text-sm text-slate-600">Dental-specific templates included free</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-primary">6</p>
                <p className="mt-2 text-sm text-slate-600">Compliance frameworks: OSHA, HIPAA, CDC, ADA, State Board, EPA</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Pricing That Makes Sense for Dental Practices
            </h2>
            <p className="mt-4 text-slate-600">
              Start free. Upgrade when your practice needs more. Every paid plan includes a 30-day money-back guarantee.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.popular
                    ? "border-primary shadow-lg ring-2 ring-primary/20 relative"
                    : ""
                }
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500">{plan.description}</p>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-slate-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-slate-500">{plan.period}</span>
                    )}
                  </div>
                  {"annualPrice" in plan && plan.annualPrice && (
                    <p className="mt-1 text-sm text-emerald-600">
                      or {plan.annualPrice}/mo billed annually &mdash; save 31%
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-slate-500">
            Need more than 5 locations or custom compliance frameworks?{" "}
            <Link href="/contact" className="text-primary underline">Contact us about Enterprise</Link>.
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-slate-200">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-slate-900">{faq.q}</span>
                  <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="py-20 bg-primary">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white">
              Your Next Inspection Won&rsquo;t Send a Calendar Invite.
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Start documenting now. No credit card, no commitment.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8"
              asChild
            >
              <Link href="/signup">
                Start Your Free Pilot &mdash; No Credit Card Required
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
