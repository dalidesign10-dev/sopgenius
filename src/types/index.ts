export type Plan = "free" | "pro" | "clinic";
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
    description: "Try SOPGenius risk-free",
    generationsPerMonth: 3,
    maxTeamMembers: null,
    features: [
      "3 SOP generations per month",
      "2 dental templates",
      "Export to PDF",
      "SOPGenius watermark",
      "Community support",
    ],
  },
  pro: {
    name: "Pro",
    price: 49,
    annualPrice: 39,
    description: "For solo and small practices",
    generationsPerMonth: null,
    maxTeamMembers: null,
    highlighted: true,
    features: [
      "Unlimited SOP generations",
      "All dental templates",
      "Export to PDF, Word, Markdown",
      "No watermark",
      "OSHA & HIPAA compliance formatting",
      "Version history",
      "Email support",
    ],
  },
  clinic: {
    name: "Clinic",
    price: 99,
    annualPrice: 79,
    description: "For group practices and multi-location",
    generationsPerMonth: null,
    maxTeamMembers: 15,
    features: [
      "Everything in Pro",
      "Team sharing (up to 15 users)",
      "Multi-location management",
      "Custom branding on exports",
      "Compliance audit trail",
      "Priority support",
    ],
  },
};

export const INDUSTRIES = [
  "General Dentistry",
  "Pediatric Dentistry",
  "Orthodontics",
  "Oral Surgery",
  "Periodontics",
  "Endodontics",
  "Prosthodontics",
  "Dental Hygiene",
  "Other",
] as const;

export const DEPARTMENTS = [
  "Front Office",
  "Clinical Operations",
  "Sterilization",
  "Lab Coordination",
  "Billing & Insurance",
  "Compliance & Safety",
  "HR & Training",
  "Other",
] as const;

export const COMPLIANCE_FRAMEWORKS = [
  "OSHA",
  "HIPAA",
  "CDC Guidelines",
  "ADA Standards",
  "State Dental Board",
  "EPA Regulations",
  "None",
] as const;
