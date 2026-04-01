"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Users,
  ShieldCheck,
  Server,
  DollarSign,
  ClipboardList,
  Truck,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

// ── Template definitions ──────────────────────────────────────────────

interface TemplateOption {
  id: string;
  title: string;
  description: string;
  industry: string;
  icon: React.ReactNode;
  prefill: {
    processDescription: string;
    industry: string;
    department: string;
    complexity: string;
    targetAudience: string;
  };
}

const TEMPLATES: TemplateOption[] = [
  {
    id: "onboarding",
    title: "Employee Onboarding",
    description: "Standardize your new hire orientation and training process.",
    industry: "HR",
    icon: <Users className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Employee onboarding process from offer acceptance through the first 90 days, including orientation, training, system access setup, and performance check-ins.",
      industry: "Other",
      department: "HR",
      complexity: "Intermediate",
      targetAudience: "New Employees",
    },
  },
  {
    id: "support-escalation",
    title: "Customer Support Escalation",
    description: "Define clear paths for escalating customer issues.",
    industry: "Customer Support",
    icon: <AlertTriangle className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Customer support escalation process including triage criteria, tier-based routing, SLA timelines, and resolution tracking.",
      industry: "Technology/SaaS",
      department: "Customer Support",
      complexity: "Intermediate",
      targetAudience: "All Staff",
    },
  },
  {
    id: "inventory",
    title: "Inventory Management",
    description: "Track stock levels, ordering, and warehouse operations.",
    industry: "Retail / Logistics",
    icon: <Truck className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Inventory management covering stock receiving, storage, cycle counts, reorder triggers, and discrepancy resolution.",
      industry: "Retail",
      department: "Operations",
      complexity: "Advanced",
      targetAudience: "Experienced Staff",
    },
  },
  {
    id: "deployment",
    title: "Software Deployment",
    description: "Standardize code releases and rollback procedures.",
    industry: "Technology",
    icon: <Server className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Software deployment pipeline including code review, staging verification, production release, monitoring, and rollback procedures.",
      industry: "Technology/SaaS",
      department: "IT",
      complexity: "Advanced",
      targetAudience: "Experienced Staff",
    },
  },
  {
    id: "financial-reporting",
    title: "Financial Reporting",
    description: "Ensure accurate and timely financial statements.",
    industry: "Finance",
    icon: <DollarSign className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Monthly financial reporting process including data collection, reconciliation, report generation, review, and submission to stakeholders.",
      industry: "Finance",
      department: "Finance",
      complexity: "Advanced",
      targetAudience: "Experienced Staff",
    },
  },
  {
    id: "quality-control",
    title: "Quality Control",
    description: "Maintain product quality through systematic inspection.",
    industry: "Manufacturing",
    icon: <ClipboardList className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Quality control inspection process for manufactured goods including incoming material checks, in-process inspections, final testing, and non-conformance handling.",
      industry: "Manufacturing",
      department: "Quality Assurance",
      complexity: "Intermediate",
      targetAudience: "All Staff",
    },
  },
  {
    id: "data-backup",
    title: "Data Backup & Recovery",
    description: "Protect critical data with reliable backup procedures.",
    industry: "Technology",
    icon: <ShieldCheck className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Data backup and disaster recovery procedures including scheduled backups, verification, offsite storage, and recovery testing.",
      industry: "Technology/SaaS",
      department: "IT",
      complexity: "Advanced",
      targetAudience: "Experienced Staff",
    },
  },
  {
    id: "incident-response",
    title: "Incident Response",
    description: "Respond to security incidents quickly and effectively.",
    industry: "Cybersecurity",
    icon: <AlertTriangle className="h-5 w-5" />,
    prefill: {
      processDescription:
        "Security incident response plan covering detection, containment, eradication, recovery, and post-incident review.",
      industry: "Technology/SaaS",
      department: "IT",
      complexity: "Advanced",
      targetAudience: "Experienced Staff",
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
  industry: "",
  department: "",
  complianceFrameworks: [],
  complexity: "Intermediate",
  targetAudience: "All Staff",
  additionalNotes: "",
};

const LOADING_MESSAGES = [
  "Analyzing your process...",
  "Structuring SOP sections...",
  "Adding compliance notes...",
  "Finalizing your SOP...",
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

export default function CreateSOPPage() {
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
        throw new Error(body.error || "Failed to generate SOP");
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
    if (!sopId) return;
    setSaving(true);
    try {
      router.push(`/dashboard/sop/${sopId}`);
    } finally {
      setSaving(false);
    }
  }

  function handleRegenerate() {
    setGeneratedSOP(null);
    setSopId(null);
    handleGenerate();
  }

  // ── Render ──────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <StepIndicator currentStep={step} />

      {/* Step 1: Template Selection */}
      {step === 1 && (
        <div>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Choose a Template</h1>
            <p className="mt-1 text-muted-foreground">
              Pick a template to get started quickly, or start from scratch.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Start from Scratch */}
            <Card
              className="cursor-pointer border-dashed hover:border-primary hover:shadow-md transition-all"
              onClick={() => selectTemplate(null)}
            >
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <FileText className="mb-3 h-8 w-8 text-muted-foreground" />
                <h3 className="font-semibold">Start from Scratch</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Build your SOP without a template
                </p>
              </CardContent>
            </Card>

            {TEMPLATES.map((tpl) => (
              <Card
                key={tpl.id}
                className={`cursor-pointer hover:border-primary hover:shadow-md transition-all ${
                  selectedTemplate === tpl.id ? "border-primary ring-2 ring-primary/20" : ""
                }`}
                onClick={() => selectTemplate(tpl.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {tpl.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm leading-tight">
                        {tpl.title}
                      </h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {tpl.description}
                  </p>
                  <Badge variant="secondary" className="mt-3 text-[10px]">
                    {tpl.industry}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Details Form */}
      {step === 2 && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">SOP Details</h1>
            <p className="mt-1 text-muted-foreground">
              Provide details about the process you want to document.
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
                Process Description <span className="text-destructive">*</span>
              </label>
              <textarea
                rows={6}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Describe the business process you want to document as an SOP. Be as detailed as possible..."
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
                Target Audience
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
                  "New Employees",
                  "Experienced Staff",
                  "Management",
                  "All Staff",
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
                placeholder="Any extra context, specific requirements, or preferences..."
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
                Generate SOP
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
          <h2 className="text-xl font-semibold">Generating Your SOP</h2>
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
              <h1 className="text-2xl font-bold">Review Your SOP</h1>
              <p className="mt-1 text-muted-foreground">
                Review the generated SOP below and save or regenerate.
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
                Save SOP
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
              Save SOP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
