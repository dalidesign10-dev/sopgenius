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
    description: "See the system in action — no commitment",
    generationsPerMonth: 3,
    maxTeamMembers: null,
    features: [
      "3 procedures per month",
      "Assign to team members",
      "Basic read tracking",
      "Clinic compliance score",
      "OSHA & HIPAA templates",
      "Email support (72-hour response)",
    ],
  },
  clinic: {
    name: "Clinic",
    price: 79,
    annualPrice: 59,
    description: "Full enforcement for single-location practices",
    generationsPerMonth: null,
    maxTeamMembers: 10,
    highlighted: true,
    features: [
      "Unlimited procedure generation",
      "All dental templates",
      "Role-based assignments",
      "Read receipts & acknowledgements",
      "Non-compliance flags by staff name",
      "Automated email reminders for unread SOPs",
      "Clinic compliance score dashboard",
      "Export to PDF, Word, Markdown — no watermark",
      "Full OSHA, HIPAA, CDC, ADA, State Board, EPA frameworks",
      "Up to 10 team members",
      "30-day money-back guarantee",
    ],
  },
  "multi-clinic": {
    name: "Multi-Clinic",
    price: 149,
    annualPrice: 119,
    description: "Enforce standards across every location",
    generationsPerMonth: null,
    maxTeamMembers: 30,
    features: [
      "Everything in Clinic",
      "Up to 30 team members",
      "Up to 5 locations",
      "Multi-location compliance dashboard",
      "Onboarding sequences for new hires",
      "Audit-ready export pack with read logs",
      "Custom branding on all procedures",
      "Compliance audit trail",
      "HIPAA BAA included",
      "Priority support (24-hour response)",
      "30-day money-back guarantee",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 597,
    annualPrice: 597,
    description: "Total operational control for DSOs",
    generationsPerMonth: null,
    maxTeamMembers: null,
    features: [
      "Everything in Multi-Clinic",
      "Unlimited team members and locations",
      "Custom compliance frameworks",
      "SSO and API access",
      "Quiz-based acknowledgement verification",
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
