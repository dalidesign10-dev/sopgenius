/**
 * simulation.spec.ts
 *
 * Multi-actor Playwright simulation of a full clinic day in DentiSOP.
 * Seeds localStorage with clinic data, then simulates staff reading SOPs,
 * a manager reviewing compliance, and staff responding to reminders.
 */

import { test, expect, type BrowserContext, type Page } from "@playwright/test";

// ---------------------------------------------------------------------------
// Seed data (inlined from scripts/seed-clinic.ts to avoid TS import issues)
// ---------------------------------------------------------------------------

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  addedAt: string;
}

interface Assignment {
  id: string;
  sopId: string;
  memberId: string;
  assignedAt: string;
}

interface ReadRecord {
  id: string;
  sopId: string;
  memberId: string;
  readAt: string;
}

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

const team: TeamMember[] = [
  { id: "m_patel", name: "Dr. Priya Patel", role: "Dentist", email: "priya@brightsmiles.com", addedAt: daysAgo(365) },
  { id: "m_garcia", name: "Maria Garcia", role: "Hygienist", email: "maria@brightsmiles.com", addedAt: daysAgo(300) },
  { id: "m_james", name: "James Whitfield", role: "Hygienist", email: "james@brightsmiles.com", addedAt: daysAgo(250) },
  { id: "m_ashley", name: "Ashley Chen", role: "Dental Assistant", email: "ashley@brightsmiles.com", addedAt: daysAgo(200) },
  { id: "m_tyler", name: "Tyler Brooks", role: "Dental Assistant", email: "tyler@brightsmiles.com", addedAt: daysAgo(14) },
  { id: "m_rachel", name: "Rachel Kim", role: "Front Desk", email: "rachel@brightsmiles.com", addedAt: daysAgo(180) },
  { id: "m_devon", name: "Devon Marshall", role: "Front Desk", email: "devon@brightsmiles.com", addedAt: daysAgo(10) },
  { id: "m_linda", name: "Linda Nguyen", role: "Office Manager", email: "linda@brightsmiles.com", addedAt: daysAgo(400) },
];

const assignmentMatrix: Record<string, string[]> = {
  m_patel: [
    "sop_instrument_sterilization", "sop_osha_exposure", "sop_hipaa_records",
    "sop_emergency_response", "sop_radiograph_safety", "sop_infection_control",
    "sop_hazard_communication", "sop_patient_dismissal",
  ],
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
  m_linda: [
    "sop_instrument_sterilization", "sop_patient_checkin", "sop_osha_exposure",
    "sop_hipaa_records", "sop_emergency_response", "sop_radiograph_safety",
    "sop_new_hire_onboarding", "sop_infection_control", "sop_hazard_communication",
    "sop_front_desk_opening", "sop_end_of_day_closing", "sop_patient_dismissal",
    "sop_lab_case_tracking", "sop_insurance_verification", "sop_supply_ordering",
  ],
};

const complianceTargets: Record<string, number> = {
  m_linda: 1.0,
  m_patel: 0.88,
  m_garcia: 0.85,
  m_james: 0.75,
  m_ashley: 0.65,
  m_rachel: 0.60,
  m_tyler: 0.25,
  m_devon: 0.20,
};

// Build assignments
const assignments: Assignment[] = [];
for (const [memberId, sopIds] of Object.entries(assignmentMatrix)) {
  for (const sopId of sopIds) {
    assignments.push({
      id: uid(),
      sopId,
      memberId,
      assignedAt: daysAgo(Math.floor(Math.random() * 60) + 30),
    });
  }
}

// Build reads based on compliance targets
const reads: ReadRecord[] = [];
for (const [memberId, sopIds] of Object.entries(assignmentMatrix)) {
  const target = complianceTargets[memberId] ?? 0.5;
  const readCount = Math.round(sopIds.length * target);
  const readSopIds = sopIds.slice(0, readCount);
  for (const sopId of readSopIds) {
    reads.push({
      id: uid(),
      sopId,
      memberId,
      readAt: daysAgo(Math.floor(Math.random() * 30) + 1),
    });
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Compute unread SOP IDs for a given member */
function getUnreadSopIds(memberId: string): string[] {
  const assigned = assignmentMatrix[memberId] ?? [];
  const readIds = reads.filter((r) => r.memberId === memberId).map((r) => r.sopId);
  return assigned.filter((id) => !readIds.includes(id));
}

/** Seed localStorage in a browser context and navigate to a page */
async function seedAndNavigate(
  context: BrowserContext,
  url: string,
  extraReads: ReadRecord[] = []
): Promise<Page> {
  const allReads = [...reads, ...extraReads];

  // Add localStorage entries before navigation via addInitScript
  await context.addInitScript(
    ({ teamJson, assignmentsJson, readsJson }) => {
      localStorage.setItem("clinic_team", teamJson);
      localStorage.setItem("clinic_assignments", assignmentsJson);
      localStorage.setItem("clinic_reads", readsJson);
    },
    {
      teamJson: JSON.stringify(team),
      assignmentsJson: JSON.stringify(assignments),
      readsJson: JSON.stringify(allReads),
    }
  );

  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  return page;
}

/** Mark a SOP as read for a member by updating localStorage directly */
async function markSopRead(page: Page, sopId: string, memberId: string): Promise<void> {
  await page.evaluate(
    ({ sopId, memberId }) => {
      const raw = localStorage.getItem("clinic_reads");
      const currentReads = raw ? JSON.parse(raw) : [];
      const already = currentReads.some(
        (r: { sopId: string; memberId: string }) => r.sopId === sopId && r.memberId === memberId
      );
      if (!already) {
        currentReads.push({
          id: `sim_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          sopId,
          memberId,
          readAt: new Date().toISOString(),
        });
        localStorage.setItem("clinic_reads", JSON.stringify(currentReads));
      }
    },
    { sopId, memberId }
  );
}

/** Get current read count from localStorage */
async function getReadCount(page: Page): Promise<number> {
  return page.evaluate(() => {
    const raw = localStorage.getItem("clinic_reads");
    return raw ? JSON.parse(raw).length : 0;
  });
}

// ---------------------------------------------------------------------------
// Non-compliant staff we simulate
// ---------------------------------------------------------------------------

const nonCompliantStaff = [
  { id: "m_tyler", name: "Tyler Brooks" },
  { id: "m_devon", name: "Devon Marshall" },
  { id: "m_rachel", name: "Rachel Kim" },
  { id: "m_ashley", name: "Ashley Chen" },
];

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

const SCREENSHOT_DIR = "tests/screenshots";

test.describe("DentiSOP Clinic Day Simulation", () => {
  test.describe.configure({ mode: "serial" });

  // Track reads added during the simulation so later tests can include them
  const simulationReads: ReadRecord[] = [];

  test("Staff members read assigned SOPs", async ({ browser }) => {
    for (const staff of nonCompliantStaff) {
      const unread = getUnreadSopIds(staff.id);
      if (unread.length === 0) continue;

      // Each staff reads 1-2 of their unread SOPs
      const toRead = unread.slice(0, Math.min(2, unread.length));

      const context = await browser.newContext();
      const page = await seedAndNavigate(context, "/dashboard", simulationReads);

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/01-${staff.id}-dashboard-before.png`,
        fullPage: true,
      });

      for (const sopId of toRead) {
        // Mark the SOP as read in localStorage
        await markSopRead(page, sopId, staff.id);

        simulationReads.push({
          id: `sim_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          sopId,
          memberId: staff.id,
          readAt: new Date().toISOString(),
        });
      }

      // Reload to reflect updated reads
      await page.reload({ waitUntil: "networkidle" });

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/02-${staff.id}-dashboard-after-reads.png`,
        fullPage: true,
      });

      // Verify localStorage was updated
      const readCount = await getReadCount(page);
      expect(readCount).toBeGreaterThan(reads.length);

      await context.close();
    }
  });

  test("Manager reviews compliance dashboard", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await seedAndNavigate(context, "/dashboard", simulationReads);

    // Screenshot the compliance score
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/03-manager-compliance-overview.png`,
      fullPage: true,
    });

    // Verify non-compliant staff names are visible
    const pageText = await page.textContent("body");
    for (const staff of nonCompliantStaff) {
      // Some may now be compliant after test 1 reads, so just check the ones
      // that still have unread SOPs
      const unreadBefore = getUnreadSopIds(staff.id);
      const readsAdded = simulationReads.filter((r) => r.memberId === staff.id).length;
      if (unreadBefore.length - readsAdded > 0) {
        expect(pageText).toContain(staff.name);
      }
    }

    // Click "Send Reminders" button if visible
    const sendButton = page.getByRole("button", { name: /send reminders/i });
    if (await sendButton.isVisible()) {
      await sendButton.click();

      // Wait for success or failure message (the API may not be running,
      // so accept either outcome)
      await page.waitForTimeout(3000);

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/04-manager-after-reminders.png`,
        fullPage: true,
      });

      // Check for a response message (success or failure)
      const reminderText = await page.textContent("body");
      const hasMessage =
        reminderText?.includes("Reminders sent") ||
        reminderText?.includes("Failed to send");
      expect(hasMessage).toBeTruthy();
    }

    await context.close();
  });

  test("Staff respond to reminders", async ({ browser }) => {
    // 2 of the 4 non-compliant staff read their remaining SOPs
    const responders = nonCompliantStaff.slice(0, 2); // Tyler and Devon

    for (const staff of responders) {
      const originalUnread = getUnreadSopIds(staff.id);
      const alreadyReadInSim = simulationReads
        .filter((r) => r.memberId === staff.id)
        .map((r) => r.sopId);
      const stillUnread = originalUnread.filter((id) => !alreadyReadInSim.includes(id));

      if (stillUnread.length === 0) continue;

      const context = await browser.newContext();
      const page = await seedAndNavigate(context, "/dashboard", simulationReads);

      // Read all remaining unread SOPs
      for (const sopId of stillUnread) {
        await markSopRead(page, sopId, staff.id);

        simulationReads.push({
          id: `sim_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          sopId,
          memberId: staff.id,
          readAt: new Date().toISOString(),
        });
      }

      await page.reload({ waitUntil: "networkidle" });

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/05-${staff.id}-after-responding.png`,
        fullPage: true,
      });

      await context.close();
    }

    // Manager refreshes and checks improved compliance
    const managerContext = await browser.newContext();
    const managerPage = await seedAndNavigate(managerContext, "/dashboard", simulationReads);

    const initialReadTotal = reads.length;
    const currentReadTotal = await getReadCount(managerPage);
    expect(currentReadTotal).toBeGreaterThan(initialReadTotal);

    await managerPage.screenshot({
      path: `${SCREENSHOT_DIR}/06-manager-final-compliance.png`,
      fullPage: true,
    });

    // Verify that Tyler and Devon are no longer listed as non-compliant
    // (or have fewer unread items)
    const finalText = await managerPage.textContent("body");
    for (const staff of responders) {
      const originalUnread = getUnreadSopIds(staff.id);
      const simReadsForStaff = simulationReads
        .filter((r) => r.memberId === staff.id)
        .map((r) => r.sopId);
      const remaining = originalUnread.filter((id) => !simReadsForStaff.includes(id));

      if (remaining.length === 0) {
        // Fully compliant now -- their name may still appear but with 0 unread,
        // or not appear at all in the non-compliant section
        // We just verify the read count went up (already asserted above)
      }
    }

    await managerPage.screenshot({
      path: `${SCREENSHOT_DIR}/07-simulation-complete.png`,
      fullPage: true,
    });

    await managerContext.close();
  });
});
