"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SOPRenderer } from "@/components/dashboard/sop-renderer";
import {
  INDUSTRIES,
  DEPARTMENTS,
  COMPLIANCE_FRAMEWORKS,
  SOPContent,
} from "@/types";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Check,
  FileText,
  Shield,
  ShieldCheck,
  Syringe,
  ClipboardList,
  Users,
  Phone,
  AlertTriangle,
  Heart,
} from "lucide-react";

// ── Dental-specific templates ──────────────────────────────────────

interface TemplateOption {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  prefill: {
    processDescription: string;
    industry: string;
    department: string;
    complexity: string;
    targetAudience: string;
    complianceFrameworks: string[];
  };
}

const TEMPLATES: TemplateOption[] = [
  {
    id: "sterilisation",
    title: "Instrument Sterilisation Protocol",
    description: "Step-by-step instrument cleaning, packaging, and autoclave sterilisation process.",
    category: "Clinical",
    icon: <Syringe className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Complete instrument sterilisation protocol for a dental practice, covering collection of used instruments, ultrasonic cleaning, hand scrubbing, corrosion inhibitor application, packaging, autoclave loading and cycle selection, biological monitoring, storage, and documentation of each sterilisation batch.",
      industry: "Dental",
      department: "Clinical",
      complexity: "Intermediate",
      targetAudience: "All Staff",
      complianceFrameworks: ["OSHA", "CDC Guidelines", "HTM 01-05"],
    },
  },
  {
    id: "patient-intake",
    title: "Patient Intake & Registration",
    description: "New and returning patient check-in, medical history, and consent workflow.",
    category: "Front Desk",
    icon: <ClipboardList className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Patient intake and registration procedure for a dental practice, including greeting the patient, verifying identity and insurance, collecting and reviewing medical history form, obtaining informed consent, entering data into the practice management system, and notifying the clinical team the patient is ready.",
      industry: "Dental",
      department: "Front Desk",
      complexity: "Basic",
      targetAudience: "All Staff",
      complianceFrameworks: ["HIPAA"],
    },
  },
  {
    id: "osha-exposure",
    title: "OSHA Exposure Control Plan",
    description: "Bloodborne pathogen exposure prevention, response, and reporting.",
    category: "Compliance",
    icon: <Shield className="h-5 w-5" />,
    prefill: {
      processDescription:
        "OSHA Bloodborne Pathogen Exposure Control Plan for a dental practice, covering exposure determination by job classification, universal precautions, engineering and work practice controls, PPE requirements, hepatitis B vaccination policy, post-exposure evaluation and follow-up, sharps injury log, employee training schedule, and annual plan review.",
      industry: "Dental",
      department: "Compliance",
      complexity: "Advanced",
      targetAudience: "All Staff",
      complianceFrameworks: ["OSHA", "CDC Guidelines"],
    },
  },
  {
    id: "hipaa-privacy",
    title: "HIPAA Privacy Procedures",
    description: "Patient data handling, access controls, and breach response.",
    category: "Compliance",
    icon: <ShieldCheck className="h-5 w-5" />,
    prefill: {
      processDescription:
        "HIPAA privacy procedures for a dental practice, covering Notice of Privacy Practices distribution, minimum necessary standard, patient access to records, authorisation for disclosures, electronic PHI safeguards, workstation security, social media policy, breach identification and notification procedures, staff training requirements, and documentation retention.",
      industry: "Dental",
      department: "Compliance",
      complexity: "Advanced",
      targetAudience: "All Staff",
      complianceFrameworks: ["HIPAA"],
    },
  },
  {
    id: "emergency-response",
    title: "Medical Emergency Response",
    description: "Protocols for syncope, allergic reactions, cardiac arrest, and other emergencies.",
    category: "Clinical",
    icon: <Heart className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Medical emergency response procedures for a dental practice, covering emergency kit contents and checks, team roles and assignments, protocols for syncope, anaphylaxis, cardiac arrest, seizure, hypoglycaemia, and aspiration, emergency drug dosages, oxygen administration, AED use, when to call emergency services, post-incident documentation, and quarterly emergency drills.",
      industry: "Dental",
      department: "Clinical",
      complexity: "Advanced",
      targetAudience: "All Staff",
      complianceFrameworks: ["OSHA", "ADA Standards"],
    },
  },
  {
    id: "infection-control",
    title: "Infection Control Protocol",
    description: "Daily infection prevention including PPE, surface disinfection, and waste handling.",
    category: "Clinical",
    icon: <Shield className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Infection control protocol for a dental practice, covering hand hygiene procedures, PPE donning and doffing sequence, operatory setup and barrier placement, surface disinfection between patients, dental unit waterline management, regulated waste segregation and disposal, laundry handling, and daily/weekly cleaning checklists.",
      industry: "Dental",
      department: "Clinical",
      complexity: "Intermediate",
      targetAudience: "All Staff",
      complianceFrameworks: ["OSHA", "CDC Guidelines", "EPA"],
    },
  },
  {
    id: "front-desk-opening",
    title: "Front Desk Opening Procedures",
    description: "Morning checklist from unlocking the door to first patient arrival.",
    category: "Front Desk",
    icon: <ClipboardList className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Front desk morning opening procedures for a dental practice, covering building access and alarm deactivation, lights and HVAC, computer and phone system startup, checking voicemail and after-hours messages, reviewing the day's schedule, confirming appointments, printing route slips or day sheets, preparing patient forms, verifying insurance eligibility for the day's patients, and morning huddle preparation.",
      industry: "Dental",
      department: "Front Desk",
      complexity: "Basic",
      targetAudience: "All Staff",
      complianceFrameworks: [],
    },
  },
  {
    id: "front-desk-closing",
    title: "Front Desk Closing Procedures",
    description: "End-of-day checklist from last patient to lockup.",
    category: "Front Desk",
    icon: <ClipboardList className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Front desk end-of-day closing procedures for a dental practice, covering reconciling the day's payments and deposits, posting charges and adjustments, confirming next-day appointments, forwarding phones to after-hours service, running end-of-day reports, backing up data, securing patient records, shutting down computers and equipment, setting the alarm, and locking the building.",
      industry: "Dental",
      department: "Front Desk",
      complexity: "Basic",
      targetAudience: "All Staff",
      complianceFrameworks: ["HIPAA"],
    },
  },
  {
    id: "new-hire-onboarding",
    title: "New Hire Onboarding Checklist",
    description: "First-week orientation covering compliance training, systems access, and shadowing.",
    category: "HR",
    icon: <Users className="h-5 w-5" />,
    prefill: {
      processDescription:
        "New hire onboarding checklist for a dental practice, covering pre-arrival preparation, first-day orientation, practice tour, introduction to team, OSHA and HIPAA compliance training, practice management software training, phone system training, role-specific shadowing schedule, uniform and badge setup, emergency procedure review, 30/60/90-day check-in milestones.",
      industry: "Dental",
      department: "HR",
      complexity: "Intermediate",
      targetAudience: "All Staff",
      complianceFrameworks: ["OSHA", "HIPAA"],
    },
  },
  {
    id: "patient-complaint",
    title: "Patient Complaint Handling",
    description: "Receive, escalate, resolve, and document patient concerns.",
    category: "Front Desk",
    icon: <Phone className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Patient complaint handling procedure for a dental practice, covering receiving the complaint (in person, phone, online), active listening and de-escalation, documenting the complaint, escalation criteria and chain of command, resolution options and authority levels, follow-up communication with the patient, logging in the complaint tracking system, and identifying patterns for practice improvement.",
      industry: "Dental",
      department: "Front Desk",
      complexity: "Intermediate",
      targetAudience: "All Staff",
      complianceFrameworks: [],
    },
  },
  {
    id: "hazard-communication",
    title: "Hazard Communication Plan",
    description: "Chemical safety, SDS management, labelling, and staff training.",
    category: "Compliance",
    icon: <AlertTriangle className="h-5 w-5" />,
    prefill: {
      processDescription:
        "OSHA Hazard Communication Plan for a dental practice, covering chemical inventory list, Safety Data Sheet management and accessibility, container labelling requirements, employee training on chemical hazards, PPE for chemical handling, spill response procedures, and annual review and update of the plan.",
      industry: "Dental",
      department: "Compliance",
      complexity: "Intermediate",
      targetAudience: "All Staff",
      complianceFrameworks: ["OSHA"],
    },
  },
  {
    id: "dental-radiology",
    title: "Dental Radiology Safety",
    description: "X-ray protocols, lead apron use, equipment QA, and exposure documentation.",
    category: "Clinical",
    icon: <ShieldCheck className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Dental radiology safety protocol covering ALARA principle, patient selection criteria, lead apron and thyroid collar use, positioning and technique for periapical, bitewing, and panoramic radiographs, digital sensor or film handling, equipment quality assurance checks, radiation exposure logging, and staff dosimetry badge programme.",
      industry: "Dental",
      department: "Clinical",
      complexity: "Intermediate",
      targetAudience: "All Staff",
      complianceFrameworks: ["OSHA", "State Dental Board"],
    },
  },
];

// ── Form state type ───────────────────────────────────────────────────

interface FormData {
  processDescription: string;
  industry: string;
  department: string;
  complianceFrameworks: string[];
  complexity: string;
  targetAudience: string;
  additionalNotes: string;
}

const INITIAL_FORM: FormData = {
  processDescription: "",
  industry: "Dental",
  department: "",
  complianceFrameworks: [],
  complexity: "Intermediate",
  targetAudience: "All Staff",
  additionalNotes: "",
};

const LOADING_MESSAGES = [
  "Analysing your procedure...",
  "Structuring sections...",
  "Adding compliance references...",
  "Finalising your procedure...",
];

// ── Step indicator ────────────────────────────────────────────────────

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Template" },
    { num: 2, label: "Details" },
    { num: 3, label: "Generate" },
    { num: 4, label: "Review" },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                currentStep > s.num
                  ? "bg-primary text-primary-foreground"
                  : currentStep === s.num
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > s.num ? <Check className="h-4 w-4" /> : s.num}
            </div>
            <span className="mt-1.5 text-xs text-muted-foreground hidden sm:block">
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`mx-2 h-0.5 w-10 sm:w-16 transition-colors ${
                currentStep > s.num ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Page component ────────────────────────────────────────────────────

export default function CreateProcedurePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [generatedSOP, setGeneratedSOP] = useState<SOPContent | null>(null);
  const [sopId, setSopId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [saving, setSaving] = useState(false);

  // Cycle loading messages
  useEffect(() => {
    if (step !== 3) return;
    const interval = setInterval(() => {
      setLoadingMsg((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [step]);

  // ── Handlers ────────────────────────────────────────────────────────

  function selectTemplate(id: string | null) {
    setSelectedTemplate(id);
    if (id) {
      const tpl = TEMPLATES.find((t) => t.id === id);
      if (tpl) {
        setForm((prev) => ({
          ...prev,
          ...tpl.prefill,
        }));
      }
    }
    setStep(2);
  }

  function toggleCompliance(framework: string) {
    setForm((prev) => ({
      ...prev,
      complianceFrameworks: prev.complianceFrameworks.includes(framework)
        ? prev.complianceFrameworks.filter((f) => f !== framework)
        : [...prev.complianceFrameworks, framework],
    }));
  }

  async function handleGenerate() {
    setError(null);
    setStep(3);
    setLoadingMsg(0);

    try {
      const res = await fetch("/api/generate-sop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to generate procedure");
      }

      const data = await res.json();
      setGeneratedSOP(data.content);
      setSopId(data.id);
      setStep(4);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
      setStep(2);
    }
  }

  async function handleSave() {
    if (!generatedSOP) return;
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to save procedures.");
        setSaving(false);
        return;
      }

      const { data, error: dbError } = await supabase
        .from("sops")
        .insert({
          user_id: user.id,
          title: generatedSOP.header?.title || "Untitled Procedure",
          description: form.processDescription,
          industry: form.industry,
          department: form.department,
          content: generatedSOP,
          status: "draft",
          version: 1,
        })
        .select("id")
        .single();

      if (dbError) throw dbError;

      router.push(`/dashboard/sop/${data.id}`);
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message ?? "Failed to save procedure.");
      setSaving(false);
    }
  }

  function handleRegenerate() {
    setGeneratedSOP(null);
    setSopId(null);
    handleGenerate();
  }

  // Group templates by category
  const categories = ["Clinical", "Front Desk", "Compliance", "HR"];

  // ── Render ──────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <StepIndicator currentStep={step} />

      {/* Step 1: Template Selection */}
      {step === 1 && (
        <div>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">New Procedure</h1>
            <p className="mt-1 text-muted-foreground">
              Choose a template to document a procedure, or describe one from scratch.
            </p>
          </div>

          {/* Start from Scratch */}
          <Card
            className="cursor-pointer border-dashed hover:border-primary hover:shadow-md transition-all mb-6"
            onClick={() => selectTemplate(null)}
          >
            <CardContent className="flex items-center gap-4 py-5">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Describe your own procedure</h3>
                <p className="text-sm text-muted-foreground">
                  Write a description and we&apos;ll structure it into a complete procedure document.
                </p>
              </div>
              <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>

          {/* Templates grouped by category */}
          {categories.map((cat) => {
            const catTemplates = TEMPLATES.filter((t) => t.category === cat);
            if (catTemplates.length === 0) return null;
            return (
              <div key={cat} className="mb-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {cat}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {catTemplates.map((tpl) => (
                    <Card
                      key={tpl.id}
                      className="cursor-pointer hover:border-primary hover:shadow-md transition-all"
                      onClick={() => selectTemplate(tpl.id)}
                    >
                      <CardContent className="flex items-start gap-3 py-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {tpl.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm">{tpl.title}</h3>
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                            {tpl.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Step 2: Details Form */}
      {step === 2 && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Procedure Details</h1>
            <p className="mt-1 text-muted-foreground">
              Describe what your team does. We&apos;ll turn it into a structured procedure.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Process Description */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                What does your team do? <span className="text-destructive">*</span>
              </label>
              <textarea
                rows={6}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Describe the procedure step by step. For example: 'After each patient, the dental assistant collects used instruments, runs them through the ultrasonic cleaner for 10 minutes, then...'"
                value={form.processDescription}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    processDescription: e.target.value,
                  }))
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Industry */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Industry <span className="text-destructive">*</span>
                </label>
                <select
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={form.industry}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, industry: e.target.value }))
                  }
                >
                  <option value="">Select industry...</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Department <span className="text-destructive">*</span>
                </label>
                <select
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={form.department}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, department: e.target.value }))
                  }
                >
                  <option value="">Select department...</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Compliance Frameworks */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Compliance Frameworks
              </label>
              <div className="flex flex-wrap gap-2">
                {COMPLIANCE_FRAMEWORKS.map((fw) => (
                  <label
                    key={fw}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      form.complianceFrameworks.includes(fw)
                        ? "border-primary bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={form.complianceFrameworks.includes(fw)}
                      onChange={() => toggleCompliance(fw)}
                    />
                    {form.complianceFrameworks.includes(fw) && (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    {fw}
                  </label>
                ))}
              </div>
            </div>

            {/* Complexity */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Complexity Level
              </label>
              <div className="flex gap-3">
                {["Basic", "Intermediate", "Advanced"].map((level) => (
                  <label
                    key={level}
                    className={`flex-1 cursor-pointer rounded-lg border px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                      form.complexity === level
                        ? "border-primary bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="complexity"
                      value={level}
                      checked={form.complexity === level}
                      onChange={() =>
                        setForm((prev) => ({ ...prev, complexity: level }))
                      }
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Who follows this procedure?
              </label>
              <select
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={form.targetAudience}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    targetAudience: e.target.value,
                  }))
                }
              >
                {[
                  "All Staff",
                  "Dentist",
                  "Dental Assistant",
                  "Hygienist",
                  "Front Desk",
                  "Office Manager",
                  "New Hires",
                ].map((aud) => (
                  <option key={aud} value={aud}>
                    {aud}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Additional Notes{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                rows={3}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Any specific requirements, equipment, or details for your practice..."
                value={form.additionalNotes}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    additionalNotes: e.target.value,
                  }))
                }
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={
                  !form.processDescription.trim() ||
                  !form.industry ||
                  !form.department
                }
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Procedure
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Loading */}
      {step === 3 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="relative mb-6">
            <div className="h-16 w-16 rounded-full border-4 border-muted" />
            <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />
            <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Building Your Procedure</h2>
          <p className="mt-3 text-muted-foreground animate-pulse">
            {LOADING_MESSAGES[loadingMsg]}
          </p>
          <div className="mt-6 flex gap-1.5">
            {LOADING_MESSAGES.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-8 rounded-full transition-colors ${
                  i <= loadingMsg ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && generatedSOP && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Review Your Procedure</h1>
              <p className="mt-1 text-muted-foreground">
                Check the procedure below, then save it to your clinic.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRegenerate}>
                <Loader2 className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                Save Procedure
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8">
              <SOPRenderer content={generatedSOP} />
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={handleRegenerate}>
              Regenerate
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              Save Procedure
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
