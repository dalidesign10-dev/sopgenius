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
    title: "Every assistant does it differently",
    description:
      "You\u2019ve trained your team, but somehow sterilization, patient intake, and room turnover look different depending on who\u2019s working.",
  },
  {
    title: "New hires take weeks to get up to speed",
    description:
      "Without clear documentation, onboarding means shadowing for days and hoping they remember everything.",
  },
  {
    title: "Compliance feels like a moving target",
    description:
      "OSHA inspections, HIPAA audits, CDC guidelines \u2014 you know you need written procedures, but who has time to write them?",
  },
  {
    title: "You\u2019ve rewritten the same SOP three times",
    description:
      "Every time a process changes, you start from scratch. There\u2019s no central system, no version control, no consistency.",
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
      "Hand a new hire your SOP binder on day one. Training goes from weeks to days.",
  },
  {
    icon: Shield,
    title: "Audit-Ready Documentation",
    description:
      "Generate SOPs that align with OSHA, HIPAA, and CDC standards. Always ready for inspection.",
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
    title: "Instrument Sterilization Protocol",
    category: "Clinical",
    description:
      "CDC-compliant sterilization workflows for handpieces, cassettes, and loose instruments.",
    icon: Shield,
  },
  {
    title: "Operatory Turnover Procedure",
    category: "Clinical",
    description:
      "Standardize room breakdown, disinfection, and setup between patients.",
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
  "Turnover is standardized across every room",
  "Compliance documentation is always current",
  "Version history tracks every change",
];

const STEPS = [
  {
    num: "1",
    title: "Choose Your Workflow",
    description:
      "Pick from dental-specific templates or describe any process in your own words.",
  },
  {
    num: "2",
    title: "Customize the Details",
    description:
      "Add your clinic\u2019s specifics \u2014 team roles, equipment, protocols, compliance needs.",
  },
  {
    num: "3",
    title: "Generate & Implement",
    description:
      "Get a professional SOP ready for your binder, your team, and your next inspection.",
  },
];

const STATS = [
  { value: "4,200+", label: "SOPs generated for dental clinics" },
  { value: "12 hours", label: "Average time saved per month per practice" },
  { value: "98%", label: "Of users say staff consistency improved" },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Get started with the basics.",
    features: [
      "3 SOPs per month",
      "2 templates",
      "PDF export",
      "SOPGenius watermark",
      "Community support",
    ],
    cta: "Get Started Free",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For practices that need more power.",
    features: [
      "Unlimited SOPs",
      "All templates",
      "PDF + Word + Markdown export",
      "No watermark",
      "OSHA/HIPAA compliance formatting",
      "Version history",
      "Email support",
    ],
    cta: "Start Pro Plan",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Clinic",
    price: "$99",
    period: "/mo",
    description: "For multi-provider and multi-location practices.",
    features: [
      "Everything in Pro",
      "Team sharing (up to 15 users)",
      "Multi-location management",
      "Custom branding",
      "Compliance audit trail",
      "Priority support",
    ],
    cta: "Start Clinic Plan",
    href: "/signup?plan=clinic",
    popular: false,
  },
];

const FAQS = [
  {
    q: "Is this only for dental practices?",
    a: "Yes. SOPGenius was built specifically for dental clinics. Every template, compliance reference, and workflow is designed around the way dental offices actually operate \u2014 from sterilization to front-desk intake.",
  },
  {
    q: "Do I need to be technical to use this?",
    a: "Not at all. If you can describe a process in plain language, SOPGenius can turn it into a professional SOP. No technical skills required.",
  },
  {
    q: "Will these SOPs pass an OSHA inspection?",
    a: "SOPGenius generates SOPs aligned with OSHA, HIPAA, and CDC guidelines. They\u2019re structured to meet the documentation standards inspectors look for. We recommend reviewing each SOP with your compliance officer before filing.",
  },
  {
    q: "How long does it take to generate an SOP?",
    a: "Most SOPs are generated in under 60 seconds. You can edit, customize, and export immediately after.",
  },
  {
    q: "Can I customize the SOPs after generation?",
    a: "Every SOP is fully editable. Change steps, adjust roles, add your own notes \u2014 make it fit exactly how your practice operates.",
  },
  {
    q: "What if I need help getting started?",
    a: "Our support team includes people who understand dental practice operations. Reach out anytime and we\u2019ll help you get your first SOPs set up.",
  },
];

/* ------------------------------------------------------------------ */
/*  CATEGORY BADGE COLOR                                               */
/* ------------------------------------------------------------------ */

function categoryColor(cat: string) {
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
                Your Team Follows a Different Process Every Time.{" "}
                <span className="text-primary">That Ends Today.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                SOPGenius gives dental clinics a simple system to document,
                standardize, and train on every procedure &mdash; from
                sterilization to patient intake. No more guessing, no more gaps.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Start Building Your SOPs Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Built for dental office managers and practice owners
              </p>
            </div>

            {/* Decorative mockup card */}
            <div className="hidden lg:block">
              <Card className="shadow-xl border-slate-200 rotate-1 hover:rotate-0 transition-transform">
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="w-fit text-xs">
                    Clinical &middot; Sterilization
                  </Badge>
                  <h3 className="font-semibold text-lg mt-2">
                    Instrument Sterilization Protocol
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
                    <span>Log cycle number, temp, and time in sterilization record</span>
                  </div>
                </CardContent>
              </Card>
            </div>
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
              SOPGenius Replaces Chaos with Clarity
            </h2>
            <p className="mt-4 text-slate-600">
              A complete system to document, standardize, and train your dental
              team &mdash; without the busywork.
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

      {/* ── TEMPLATES / USE CASES ─────────────────────────────── */}
      <section className="py-20 bg-white">
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
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor(t.category)}`}
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
      <section className="py-20 bg-slate-50">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              The Difference SOPGenius Makes
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader className="pb-2">
                <h3 className="font-semibold text-red-800 flex items-center gap-2">
                  <X className="h-5 w-5" /> Before SOPGenius
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
                  <CheckCircle className="h-5 w-5" /> After SOPGenius
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
      <section id="how-it-works" className="py-20 bg-white">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Three Steps to Standardized Operations
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

      {/* ── TRUST / SOCIAL PROOF ──────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Trusted by Dental Teams Across the Country
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <Card key={s.value} className="text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">{s.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-slate-500">
            Join hundreds of dental practices already using SOPGenius
          </p>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Straightforward Pricing for Every Practice
            </h2>
            <p className="mt-4 text-slate-600">
              Start free. Upgrade when your team needs more.
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
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
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
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
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
              Stop Rewriting SOPs. Start Standardizing Your Practice.
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Join hundreds of dental teams who replaced binder chaos with a
              system that works.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8"
              asChild
            >
              <Link href="/signup">
                Build Your First SOP Free &mdash; No Credit Card Required
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
