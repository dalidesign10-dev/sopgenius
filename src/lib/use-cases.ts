export interface UseCase {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: [string, string];
  processes: string[];
  benefits: string[];
  relatedTemplates: string[];
}

export const USE_CASES: UseCase[] = [
  {
    slug: "solo-dental-practice-sop-generator",
    title: "Solo Dental Practice SOP Generator",
    metaTitle: "SOP Generator for Solo Dental Practices — SOPGenius",
    metaDescription:
      "Generate OSHA, HIPAA, and clinical SOPs tailored for solo dental practices. Standardize your office procedures without hiring a consultant.",
    h1: "SOP Generator for Solo Dental Practices",
    intro: [
      "Running a solo dental practice means wearing every hat — clinician, employer, compliance officer, and business owner. Without a dedicated team to manage regulatory requirements, it is easy for critical procedures to fall through the cracks. OSHA exposure control plans, HIPAA privacy policies, and clinical protocols all demand written documentation, yet most solo practitioners lack the time or resources to build these from scratch.",
      "SOPGenius helps solo dental practitioners turn their clinical and administrative workflows into clear, structured standard operating procedures. Describe how your office handles a process — from instrument sterilization to patient intake — and receive a formatted SOP with numbered steps, role assignments, compliance references, and training checkpoints that your team can follow from day one.",
    ],
    processes: [
      "Instrument sterilization and autoclave monitoring",
      "Patient intake and medical history review",
      "Dental radiology safety and image acquisition",
      "Infection control and operatory turnover",
      "Emergency medical response in the dental office",
      "Controlled substance prescribing and documentation",
    ],
    benefits: [
      "Stay OSHA and HIPAA compliance-ready with documented procedures that map to federal and state requirements",
      "Ensure every team member follows the same clinical and administrative steps regardless of who trained them",
      "Reduce reliance on expensive consultants by generating audit-quality SOPs in-house",
      "Prepare for state dental board inspections and DEA audits with organized, up-to-date documentation",
    ],
    relatedTemplates: [
      "sterilization-protocol",
      "hipaa-privacy-policy",
      "infection-control-checklist",
    ],
  },
  {
    slug: "multi-location-dso-sop-generator",
    title: "DSO & Multi-Location SOP Generator",
    metaTitle:
      "DSO & Multi-Location Dental SOP Generator — SOPGenius",
    metaDescription:
      "Standardize procedures across every dental office in your DSO. Generate consistent OSHA, HIPAA, and operational SOPs that scale with your organization.",
    h1: "SOP Generator for DSOs and Multi-Location Dental Groups",
    intro: [
      "Dental service organizations and multi-location groups face a unique challenge: every office must deliver the same standard of care and compliance, yet each location may have different staff, equipment, and workflows. Without centralized documentation, inconsistencies creep in — one office follows an outdated sterilization protocol while another skips steps during patient onboarding, exposing the entire organization to regulatory risk.",
      "SOPGenius gives DSO operations teams a fast way to create standardized procedures that every location can adopt. Generate SOPs for clinical workflows, front-office operations, and compliance programs, then roll them out across your network with confidence that each site is following the same playbook.",
    ],
    processes: [
      "Standardized clinical protocols across all locations",
      "New location onboarding and operational setup",
      "Centralized OSHA and HIPAA compliance program management",
      "Multi-site audit scheduling and corrective action tracking",
      "Credentialing and privileging for associate dentists",
      "Supply chain standardization and vendor approval",
    ],
    benefits: [
      "Eliminate location-to-location variation with a single set of approved procedures",
      "Accelerate new office launches by deploying proven SOP packages from day one",
      "Reduce organization-wide compliance risk with centralized documentation and version control",
      "Simplify internal audits by giving every location the same measurable standards to follow",
    ],
    relatedTemplates: [
      "location-onboarding-checklist",
      "clinical-protocol-standardization",
      "multi-site-audit-tracker",
    ],
  },
  {
    slug: "dental-compliance-sop-generator",
    title: "Dental Compliance SOP Generator",
    metaTitle:
      "Dental Compliance SOP Generator — OSHA, HIPAA & CDC Procedures | SOPGenius",
    metaDescription:
      "Create OSHA, HIPAA, and CDC-aligned compliance SOPs for your dental practice. Document exposure control plans, infection control protocols, and annual training requirements.",
    h1: "Generate Dental Compliance SOPs for OSHA, HIPAA, and CDC Requirements",
    intro: [
      "Dental practices operate under overlapping layers of regulation — OSHA's Bloodborne Pathogens Standard, HIPAA's Privacy and Security Rules, CDC infection prevention guidelines, state dental board mandates, and DEA controlled substance requirements. Compliance officers and practice owners must maintain written programs for each, update them when regulations change, and prove that staff have been trained on every policy.",
      "SOPGenius helps dental compliance professionals generate structured procedures that address specific regulatory requirements. Describe the compliance area you need to document and receive a detailed SOP with regulatory references, responsible-party assignments, documentation checklists, and training verification steps — ready for your next OSHA inspection or HIPAA risk assessment.",
    ],
    processes: [
      "OSHA exposure control plan development and annual review",
      "HIPAA privacy and security policy documentation",
      "CDC-based infection control and sterilization protocols",
      "Regulated medical waste segregation and disposal",
      "Medical emergency preparedness and response drills",
      "Annual compliance training documentation and staff sign-off",
    ],
    benefits: [
      "Map every SOP directly to the applicable OSHA, HIPAA, or CDC requirement for audit clarity",
      "Maintain a defensible compliance program with version-controlled, timestamped documentation",
      "Reduce the risk of citations and fines by ensuring no regulatory area goes undocumented",
      "Cut annual training preparation time by generating ready-to-use training SOPs with built-in sign-off sheets",
    ],
    relatedTemplates: [
      "osha-exposure-control-plan",
      "hipaa-risk-assessment",
      "infection-control-protocol",
    ],
  },
  {
    slug: "dental-office-manager-sop-generator",
    title: "Dental Office Manager SOP Generator",
    metaTitle:
      "Dental Office Manager SOP Generator — Front Office Procedures | SOPGenius",
    metaDescription:
      "Generate front office SOPs for dental office managers. Standardize patient intake, insurance verification, scheduling, billing, and staff training procedures.",
    h1: "SOP Generator for Dental Office Managers",
    intro: [
      "Dental office managers are responsible for keeping the front office running smoothly — from the moment a patient calls to schedule an appointment through claim submission and collections. Without written procedures, staff handle tasks differently, insurance verifications get missed, recall patients fall off the schedule, and revenue leaks through billing errors that no one catches until month-end reports.",
      "SOPGenius helps dental office managers document every front-office workflow in a clear, trainable format. Describe how your office handles a process and receive a step-by-step SOP with decision points, responsible roles, and quality checks — so new hires can get up to speed quickly and experienced staff have a consistent reference to follow.",
    ],
    processes: [
      "New patient intake and registration",
      "Insurance eligibility verification and benefits breakdown",
      "Patient recall and reactivation systems",
      "Staff scheduling, time-off requests, and shift coverage",
      "Vendor management and dental supply ordering",
      "Patient communication templates and follow-up protocols",
    ],
    benefits: [
      "Reduce front-desk errors by giving every team member the same documented workflow to follow",
      "Improve collections and reduce claim denials with standardized insurance verification steps",
      "Keep the recall system running consistently even when staff turn over",
      "Cut new-hire training time by providing self-serve procedural guides for every front-office task",
    ],
    relatedTemplates: [
      "patient-intake-workflow",
      "insurance-verification-checklist",
      "recall-system-protocol",
    ],
  },
];
