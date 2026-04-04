/**
 * seed-clinic.ts
 *
 * Realistic seed data for DentiSOP testing.
 * Exports a full fake clinic dataset matching the shape consumed by
 * ClinicProvider (clinic-store.tsx): TeamMember[], Assignment[], ReadRecord[].
 *
 * Compliance profile per staff member:
 *   - Office Manager (Linda)      ~100% compliant
 *   - Dentist (Dr. Patel)         ~90% compliant
 *   - Hygienist (Maria)           ~85% compliant
 *   - Hygienist (James)           ~75% compliant
 *   - Dental Assistant (Ashley)   ~65% compliant
 *   - Front Desk (Rachel)         ~60% compliant
 *   - Dental Assistant (Tyler)    ~25% non-compliant (new hire)
 *   - Front Desk (Devon)          ~20% non-compliant (new hire)
 */

import type { TeamMember, Assignment, ReadRecord } from "../src/lib/clinic-store";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let counter = 0;
function uid(): string {
  counter++;
  return `seed_${counter.toString(36).padStart(4, "0")}`;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

// ---------------------------------------------------------------------------
// Team Members (8 staff)
// ---------------------------------------------------------------------------

export const team: TeamMember[] = [
  { id: "m_patel",   name: "Dr. Priya Patel",     role: "Dentist",            email: "priya@brightsmiles.com",   addedAt: daysAgo(365) },
  { id: "m_garcia",  name: "Maria Garcia",         role: "Hygienist",          email: "maria@brightsmiles.com",   addedAt: daysAgo(300) },
  { id: "m_james",   name: "James Whitfield",      role: "Hygienist",          email: "james@brightsmiles.com",   addedAt: daysAgo(250) },
  { id: "m_ashley",  name: "Ashley Chen",          role: "Dental Assistant",   email: "ashley@brightsmiles.com",  addedAt: daysAgo(200) },
  { id: "m_tyler",   name: "Tyler Brooks",         role: "Dental Assistant",   email: "tyler@brightsmiles.com",   addedAt: daysAgo(14) },  // new hire
  { id: "m_rachel",  name: "Rachel Kim",           role: "Front Desk",         email: "rachel@brightsmiles.com",  addedAt: daysAgo(180) },
  { id: "m_devon",   name: "Devon Marshall",       role: "Front Desk",         email: "devon@brightsmiles.com",   addedAt: daysAgo(10) },  // new hire
  { id: "m_linda",   name: "Linda Nguyen",         role: "Office Manager",     email: "linda@brightsmiles.com",   addedAt: daysAgo(400) },
];

// ---------------------------------------------------------------------------
// Procedures (15 total)
// sopId values are stable, human-readable slugs so the seed data is easy to
// cross-reference. In production these would be Supabase UUIDs; the clinic
// store treats them as opaque strings so slugs work fine for testing.
// ---------------------------------------------------------------------------

export interface SeedProcedure {
  sopId: string;
  title: string;
  documented: boolean; // whether a full SOP doc exists yet
}

export const procedures: SeedProcedure[] = [
  { sopId: "sop_instrument_sterilization", title: "Instrument Sterilization",    documented: true },
  { sopId: "sop_patient_checkin",          title: "Patient Check-In",            documented: true },
  { sopId: "sop_osha_exposure",            title: "OSHA Exposure Control",       documented: true },
  { sopId: "sop_hipaa_records",            title: "HIPAA Patient Records",       documented: true },
  { sopId: "sop_emergency_response",       title: "Emergency Response",          documented: true },
  { sopId: "sop_radiograph_safety",        title: "Radiograph Safety",           documented: true },
  { sopId: "sop_new_hire_onboarding",      title: "New Hire Onboarding",         documented: true },
  { sopId: "sop_infection_control",        title: "Infection Control",           documented: true },
  { sopId: "sop_hazard_communication",     title: "Hazard Communication",        documented: true },
  { sopId: "sop_front_desk_opening",       title: "Front Desk Opening",          documented: true },
  { sopId: "sop_end_of_day_closing",       title: "End of Day Closing",          documented: true },
  { sopId: "sop_patient_dismissal",        title: "Patient Dismissal",           documented: true },
  { sopId: "sop_lab_case_tracking",        title: "Lab Case Tracking",           documented: false }, // not yet written
  { sopId: "sop_insurance_verification",   title: "Insurance Verification",      documented: false },
  { sopId: "sop_supply_ordering",          title: "Supply Ordering",             documented: false },
];

// ---------------------------------------------------------------------------
// Assignment matrix
// Maps each staff member to the procedures they are responsible for.
// Not every procedure applies to every role.
// ---------------------------------------------------------------------------

const assignmentMatrix: Record<string, string[]> = {
  // Dentist -- clinical + compliance
  m_patel: [
    "sop_instrument_sterilization", "sop_osha_exposure", "sop_hipaa_records",
    "sop_emergency_response", "sop_radiograph_safety", "sop_infection_control",
    "sop_hazard_communication", "sop_patient_dismissal",
  ],
  // Hygienists -- clinical focus
  m_garcia: [
    "sop_instrument_sterilization", "sop_patient_checkin", "sop_osha_exposure",
    "sop_hipaa_records", "sop_emergency_response", "sop_radiograph_safety",
    "sop_infection_control", "sop_hazard_communication", "sop_patient_dismissal",
  ],
  m_james: [
    "sop_instrument_sterilization", "sop_patient_checkin", "sop_osha_exposure",
    "sop_hipaa_records", "sop_emergency_response", "sop_radiograph_safety",
    "sop_infection_control", "sop_hazard_communication", "sop_patient_dismissal",
  ],
  // Dental Assistants -- similar to hygienists minus radiograph
  m_ashley: [
    "sop_instrument_sterilization", "sop_patient_checkin", "sop_osha_exposure",
    "sop_emergency_response", "sop_infection_control", "sop_hazard_communication",
    "sop_patient_dismissal",
  ],
  m_tyler: [
    "sop_instrument_sterilization", "sop_patient_checkin", "sop_osha_exposure",
    "sop_emergency_response", "sop_infection_control", "sop_hazard_communication",
    "sop_new_hire_onboarding",
  ],
  // Front Desk -- admin + patient-facing
  m_rachel: [
    "sop_patient_checkin", "sop_hipaa_records", "sop_emergency_response",
    "sop_front_desk_opening", "sop_end_of_day_closing", "sop_patient_dismissal",
    "sop_insurance_verification", "sop_supply_ordering",
  ],
  m_devon: [
    "sop_patient_checkin", "sop_hipaa_records", "sop_emergency_response",
    "sop_front_desk_opening", "sop_end_of_day_closing", "sop_patient_dismissal",
    "sop_new_hire_onboarding", "sop_insurance_verification",
  ],
  // Office Manager -- everything
  m_linda: [
    "sop_instrument_sterilization", "sop_patient_checkin", "sop_osha_exposure",
    "sop_hipaa_records", "sop_emergency_response", "sop_radiograph_safety",
    "sop_new_hire_onboarding", "sop_infection_control", "sop_hazard_communication",
    "sop_front_desk_opening", "sop_end_of_day_closing", "sop_patient_dismissal",
    "sop_lab_case_tracking", "sop_insurance_verification", "sop_supply_ordering",
  ],
};

// Build Assignment[] from the matrix
export const assignments: Assignment[] = [];
for (const [memberId, sopIds] of Object.entries(assignmentMatrix)) {
  for (const sopId of sopIds) {
    assignments.push({
      id: uid(),
      sopId,
      memberId,
      assignedAt: daysAgo(Math.floor(Math.random() * 60) + 30), // 30-90 days ago
    });
  }
}

// ---------------------------------------------------------------------------
// Read records
// Compliance targets per member (fraction of their assigned SOPs they've read)
// ---------------------------------------------------------------------------

const complianceTargets: Record<string, number> = {
  m_linda:  1.0,   // 100% -- Office Manager, most diligent
  m_patel:  0.88,  // ~90%
  m_garcia: 0.85,
  m_james:  0.75,
  m_ashley: 0.65,
  m_rachel: 0.60,
  m_tyler:  0.25,  // new hire, barely started
  m_devon:  0.20,  // new hire, barely started
};

export const reads: ReadRecord[] = [];
for (const [memberId, sopIds] of Object.entries(assignmentMatrix)) {
  const target = complianceTargets[memberId] ?? 0.5;
  // Deterministically pick which SOPs this member has read.
  // We read from the front of the list so compliance gaps cluster at the end
  // (newer / less critical procedures tend to be skipped).
  const readCount = Math.round(sopIds.length * target);
  const readSopIds = sopIds.slice(0, readCount);

  for (const sopId of readSopIds) {
    reads.push({
      id: uid(),
      sopId,
      memberId,
      readAt: daysAgo(Math.floor(Math.random() * 30) + 1), // within last 30 days
    });
  }
}

// ---------------------------------------------------------------------------
// Combined export for convenience
// ---------------------------------------------------------------------------

export const SEED_CLINIC = {
  name: "Bright Smiles Family Dentistry",
  team,
  procedures,
  assignments,
  reads,
};

export default SEED_CLINIC;
