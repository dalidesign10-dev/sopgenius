export type Plan = "free" | "starter" | "pro" | "business";
export type SOPStatus = "draft" | "published" | "archived";

export interface User {
  id: string;
  email: string;
  full_name: string;
  company_name: string | null;
  industry: string | null;
  plan: Plan;
  sop_count: number;
  monthly_generations: number;
  generations_reset_at: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SOPHeader {
  title: string;
  sopNumber: string;
  version: number;
  department: string;
  effectiveDate: string;
}

export interface SOPDefinition {
  term: string;
  definition: string;
}

export interface SOPResponsibility {
  role: string;
  duties: string[];
}

export interface SOPStep {
  number: number;
  action: string;
  role: string;
  outcome: string;
  notes: string;
}

export interface SOPRevision {
  version: number;
  date: string;
  author: string;
  changes: string;
}

export interface SOPContent {
  header: SOPHeader;
  purpose: string;
  scope: string;
  definitions: SOPDefinition[];
  responsibilities: SOPResponsibility[];
  prerequisites: string[];
  steps: SOPStep[];
  flowchartDescription: string;
  qualityChecks: string[];
  complianceNotes: string[];
  relatedDocuments: string[];
  revisionHistory: SOPRevision[];
}

export interface SOP {
  id: string;
  user_id: string;
  title: string;
  description: string;
  industry: string;
  department: string | null;
  content: SOPContent;
  markdown_content: string;
  status: SOPStatus;
  version: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  industry: string;
  category: string;
  prompt_template: string;
  sample_output: SOPContent;
  is_premium: boolean;
  usage_count: number;
  created_at: string;
}

export interface Folder {
  id: string;
  user_id: string;
  name: string;
  parent_id: string | null;
  created_at: string;
}

export interface PlanDetails {
  name: string;
  price: number;
  annualPrice: number;
  description: string;
  features: string[];
  generationsPerMonth: number | null;
  maxTeamMembers: number | null;
  highlighted?: boolean;
}

export const PLANS: Record<Plan, PlanDetails> = {
  free: {
    name: "Free",
    price: 0,
    annualPrice: 0,
    description: "Get started with basic SOP generation",
    generationsPerMonth: 3,
    maxTeamMembers: null,
    features: [
      "3 SOP generations per month",
      "Basic templates only",
      "Export to PDF",
      "SOPGenius watermark on exports",
      "Community support",
    ],
  },
  starter: {
    name: "Starter",
    price: 19,
    annualPrice: 15,
    description: "For individuals and small teams",
    generationsPerMonth: 25,
    maxTeamMembers: null,
    features: [
      "25 SOP generations per month",
      "All templates",
      "Export to PDF, Word, Markdown",
      "No watermark",
      "Version history (last 5 versions)",
      "Email support",
    ],
  },
  pro: {
    name: "Pro",
    price: 49,
    annualPrice: 39,
    description: "For growing teams that need more power",
    generationsPerMonth: null,
    maxTeamMembers: 5,
    highlighted: true,
    features: [
      "Unlimited SOP generations",
      "All templates + industry-specific",
      "All export formats + HTML",
      "Team sharing (up to 5 users)",
      "Unlimited version history",
      "Custom branding on exports",
      "Priority support",
      "Flowchart generation",
    ],
  },
  business: {
    name: "Business",
    price: 99,
    annualPrice: 79,
    description: "Enterprise-grade features for large organizations",
    generationsPerMonth: null,
    maxTeamMembers: null,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "API access",
      "Custom templates",
      "Bulk generation",
      "SSO integration",
      "Dedicated support",
      "Compliance tracking (ISO, HIPAA, GDPR)",
    ],
  },
};

export const INDUSTRIES = [
  "Healthcare",
  "Technology/SaaS",
  "Manufacturing",
  "Finance",
  "Retail",
  "Education",
  "Government",
  "Construction",
  "Food & Beverage",
  "Other",
] as const;

export const DEPARTMENTS = [
  "Operations",
  "HR",
  "IT",
  "Finance",
  "Sales",
  "Marketing",
  "Customer Support",
  "Quality Assurance",
  "Other",
] as const;

export const COMPLIANCE_FRAMEWORKS = [
  "ISO 9001",
  "ISO 27001",
  "HIPAA",
  "GDPR",
  "SOX",
  "FDA",
  "OSHA",
  "None",
] as const;
