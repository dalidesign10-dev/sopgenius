export type Plan = "starter" | "clinic" | "multi-clinic" | "enterprise";
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
  starter: {
    name: "Starter",
    price: 0,
    annualPrice: 0,
    description: "See what DentiSOP can do — no commitment",
    generationsPerMonth: 3,
    maxTeamMembers: null,
    features: [
      "3 procedures per month",
      "2 starter templates",
      "Export to PDF (DentiSOP watermark)",
      "OSHA & HIPAA basics",
      "Email support (72-hour response)",
    ],
  },
  clinic: {
    name: "Clinic",
    price: 79,
    annualPrice: 59,
    description: "For single-location practices ready to standardise",
    generationsPerMonth: null,
    maxTeamMembers: null,
    highlighted: true,
    features: [
      "Unlimited procedure generation",
      "All dental templates",
      "Export to PDF, Word, Markdown — no watermark",
      "Full OSHA, HIPAA, CDC, ADA, State Board, EPA frameworks",
      "30-day version history",
      "1 seat included (add more at \u00a315/mo each)",
      "Email support (48-hour response)",
      "30-day money-back guarantee",
    ],
  },
  "multi-clinic": {
    name: "Multi-Clinic",
    price: 149,
    annualPrice: 119,
    description: "For group practices and DSOs managing 2+ locations",
    generationsPerMonth: null,
    maxTeamMembers: 15,
    features: [
      "Everything in Clinic",
      "Team sharing (up to 15 users included)",
      "Up to 5 locations",
      "Custom branding on exports",
      "Unlimited version history",
      "Compliance audit trail",
      "HIPAA BAA included",
      "Priority email support (24-hour response)",
      "30-day money-back guarantee",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 597,
    annualPrice: 597,
    description: "For DSOs and multi-location groups needing full control",
    generationsPerMonth: null,
    maxTeamMembers: null,
    features: [
      "Everything in Multi-Clinic",
      "Unlimited team members and locations",
      "Custom compliance frameworks",
      "SSO and API access",
      "White-label option",
      "Dedicated account manager",
      "HIPAA BAA included",
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
  "CQC",
  "GDC",
  "HTM 01-05",
  "None",
] as const;
