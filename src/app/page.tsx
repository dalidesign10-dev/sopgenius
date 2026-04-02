import Link from "next/link";
import {
  Building2,
  Users,
  MapPin,
  Baby,
  Stethoscope,
  FileText,
  Sparkles,
  Download,
  LayoutTemplate,
  FileDown,
  GitBranch,
  ShieldCheck,
  Check,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLANS, type Plan } from "@/types";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

const CONTAINER = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

const TEMPLATES = [
  { title: "Instrument Sterilization", slug: "instrument-sterilization-sop-template", description: "Document CDC-compliant sterilization workflows for handpieces, cassettes, and loose instruments.", category: "Clinical" },
  { title: "OSHA Exposure Control Plan", slug: "osha-exposure-control-plan-sop-template", description: "Meet OSHA Bloodborne Pathogens Standard requirements with a complete exposure control procedure.", category: "Compliance" },
  { title: "HIPAA Patient Records", slug: "hipaa-patient-records-sop-template", description: "Ensure HIPAA-compliant handling, storage, and disclosure of protected health information.", category: "Compliance" },
  { title: "Operatory Turnover", slug: "operatory-turnover-sop-template", description: "Standardize room breakdown, disinfection, and setup between patients for maximum efficiency.", category: "Clinical" },
  { title: "Dental Emergency Response", slug: "dental-emergency-response-sop-template", description: "Prepare your team to respond to medical emergencies including syncope, anaphylaxis, and cardiac events.", category: "Clinical" },
  { title: "Infection Control & PPE", slug: "infection-control-ppe-sop-template", description: "Define PPE requirements, hand hygiene protocols, and infection prevention measures per CDC guidelines.", category: "Compliance" },
  { title: "New Patient Intake", slug: "new-patient-intake-sop-template", description: "Streamline front-desk workflows for patient registration, insurance verification, and medical history collection.", category: "Front Office" },
  { title: "Dental Lab Case Communication", slug: "dental-lab-case-communication-sop-template", description: "Standardize lab case submissions, shade matching documentation, and tracking from impression to delivery.", category: "Front Office" },
];

const FAQS = [
  { q: "What is a dental SOP?", a: "A dental Standard Operating Procedure (SOP) is a step-by-step document that describes how your practice performs a specific clinical, administrative, or compliance task. Dental SOPs ensure every team member follows the same protocol, reducing errors and keeping your practice aligned with OSHA, HIPAA, and CDC requirements." },
  { q: "How does AI generate dental SOPs?", a: "SOPGenius uses advanced AI trained on dental industry workflows and regulatory standards. You describe a process in plain language — such as instrument sterilization or patient intake — and the AI structures it into a professional SOP with roles, step-by-step instructions, safety checks, and relevant compliance references." },
  { q: "Is SOPGenius HIPAA compliant?", a: "Yes. All data is encrypted in transit via HTTPS and at rest. We use Supabase with Row Level Security (RLS) to isolate your data. SOPGenius does not store or process protected health information (PHI) — you describe processes, not patient data. We never share your data with third parties." },
  { q: "Can I customize the generated SOPs for my practice?", a: "Absolutely. Every generated SOP is fully editable. You can modify steps, add practice-specific protocols, adjust roles for your team size, and tailor the document to your office before exporting." },
  { q: "What export formats are supported?", a: "SOPGenius supports PDF, Microsoft Word (.docx), Markdown, and HTML exports. Pro and Business plans include custom-branded exports with your practice logo — perfect for binder-ready compliance documentation." },
  { q: "Can I use these SOPs for OSHA and state board audits?", a: "Yes. SOPGenius generates SOPs aligned with OSHA, HIPAA, CDC infection control guidelines, and common state dental board requirements. Business plans include dedicated compliance tracking to help you stay audit-ready year-round." },
];

export default function LandingPage() {
  const planKeys = Object.keys(PLANS) as Plan[];

  return (
    <div className="min-h-screen bg-white text-foreground">
      <PublicNav />

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className={`${CONTAINER} grid lg:grid-cols-2 gap-12 items-center`}>
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Generate Dental Office SOPs in{" "}
              <span className="text-primary">60 Seconds</span> with AI
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Stop spending hours writing standard operating procedures. Whether you need OSHA, HIPAA,
              or CDC-compliant documentation, describe your dental process and SOPGenius creates
              detailed, audit-ready SOPs instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Generate Your First Dental SOP Free <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
          </div>

          {/* Decorative mockup */}
          <div className="relative hidden lg:block">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border p-8 shadow-xl">
              <div className="space-y-3 mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">Input</div>
                <div className="rounded-lg bg-white border p-4 text-sm text-muted-foreground leading-relaxed">
                  &ldquo;After each patient, the assistant breaks down the operatory, disposes of sharps,
                  wipes surfaces with CaviWipes, sterilizes instruments in the autoclave, and
                  resets the chair with a new barrier kit...&rdquo;
                </div>
              </div>
              <div className="flex items-center justify-center py-3">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">Generated SOP</div>
                <div className="rounded-lg bg-white border p-4 space-y-2">
                  <div className="h-3 rounded bg-primary/20 w-3/4" />
                  <div className="h-2 rounded bg-slate-100 w-full" />
                  <div className="h-2 rounded bg-slate-100 w-5/6" />
                  <div className="h-2 rounded bg-slate-100 w-full" />
                  <div className="h-2 rounded bg-slate-100 w-4/6" />
                  <div className="mt-3 h-3 rounded bg-primary/15 w-2/4" />
                  <div className="h-2 rounded bg-slate-100 w-full" />
                  <div className="h-2 rounded bg-slate-100 w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Types Bar */}
      <section className="py-12 border-y bg-white">
        <div className={`${CONTAINER} text-center space-y-6`}>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Built for every type of dental practice
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-muted-foreground">
            {[
              { icon: Building2, label: "Solo Practice" },
              { icon: Users, label: "Group Practice" },
              { icon: MapPin, label: "DSO / Multi-Location" },
              { icon: Baby, label: "Pediatric Dentistry" },
              { icon: Stethoscope, label: "Specialty Practice" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className={`${CONTAINER} space-y-12`}>
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to go from dental workflow to audit-ready SOP.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, icon: FileText, title: "Describe Your Dental Process", desc: "Write a plain-language description of any clinical, front-office, or compliance workflow. Include as much or as little detail as you like." },
              { step: 2, icon: Sparkles, title: "AI Generates Your SOP", desc: "Our AI analyzes your description and produces a structured SOP with roles, step-by-step procedures, safety checks, and OSHA/HIPAA/CDC compliance notes." },
              { step: 3, icon: Download, title: "Export & Implement", desc: "Download your SOP as PDF or Word for your office binder. Share with your team or upload to your practice management system." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <Card key={step} className="text-center relative pt-10">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow">
                  {step}
                </div>
                <CardHeader className="items-center gap-2 pb-2">
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-semibold">{title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 bg-white">
        <div className={`${CONTAINER} space-y-12`}>
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">Everything Your Dental Practice Needs</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful features designed to make dental SOP creation fast, collaborative, and compliant.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "AI-Powered Generation", desc: "Transform plain-language descriptions of dental workflows into structured, professional SOPs in seconds using advanced AI." },
              { icon: LayoutTemplate, title: "Dental-Specific Templates", desc: "Start from 8 dental-specific templates covering sterilization, infection control, OSHA compliance, patient intake, and more." },
              { icon: FileDown, title: "Multiple Export Formats", desc: "Export your SOPs to PDF, Word, Markdown, or HTML — perfect for office binders, digital filing, or practice management systems." },
              { icon: GitBranch, title: "Version Control", desc: "Track every update with full revision history. Compare versions when protocols change and maintain an audit trail for inspectors." },
              { icon: Users, title: "Team Collaboration", desc: "Invite dentists, hygienists, assistants, and office managers to review, edit, and approve SOPs with role-based access." },
              { icon: ShieldCheck, title: "OSHA, HIPAA & CDC Ready", desc: "Generate SOPs aligned with OSHA Bloodborne Pathogens Standard, HIPAA Privacy Rule, CDC infection control guidelines, and state dental board requirements." },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="gap-3 pb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section id="templates" className="py-20 bg-slate-50">
        <div className={`${CONTAINER} space-y-12`}>
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">Dental SOP Templates</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Jump-start your compliance documentation with ready-made templates for common dental practice workflows.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEMPLATES.map((t) => (
              <Card key={t.title} className="hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-2 gap-2">
                  <Badge variant="secondary" className="w-fit text-xs">{t.category}</Badge>
                  <h3 className="font-semibold">{t.title}</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                  <Link
                    href={`/templates/${t.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    View {t.title} SOP Template <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/templates"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              View all templates <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className={`${CONTAINER} space-y-12`}>
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start free, upgrade when your practice needs more. No hidden fees.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {planKeys.map((key) => {
              const plan = PLANS[key];
              const isPopular = plan.highlighted;
              return (
                <Card
                  key={key}
                  className={`relative flex flex-col ${isPopular ? "ring-2 ring-primary shadow-xl" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge>Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="gap-1 pb-2">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <div className="pt-2">
                      <span className="text-4xl font-extrabold">${plan.price}</span>
                      <span className="text-muted-foreground text-sm">/mo</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 gap-4">
                    <ul className="space-y-2 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={isPopular ? "default" : "outline"}
                      className="w-full"
                      asChild
                    >
                      <Link href="/signup">
                        {plan.price === 0 ? "Get Started Free" : `Choose ${plan.name}`}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className={`${CONTAINER} max-w-3xl space-y-10`}>
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="divide-y">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-sm list-none">
                  {q}
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className={`${CONTAINER} text-center space-y-8`}>
          <h2 className="text-3xl sm:text-4xl font-bold max-w-2xl mx-auto">
            Ready to Streamline Your Dental Practice SOPs?
          </h2>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Start Free — No Credit Card Required</Link>
          </Button>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
