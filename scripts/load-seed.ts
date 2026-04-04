/**
 * load-seed.ts
 *
 * Loads the seed clinic data into localStorage, matching the keys used by
 * ClinicProvider in src/lib/clinic-store.tsx:
 *   - clinic_team        -> TeamMember[]
 *   - clinic_assignments  -> Assignment[]
 *   - clinic_reads        -> ReadRecord[]
 *
 * Usage options:
 *
 * 1. Browser console (quickest):
 *    Copy-paste the minified output of this script, or import from a bundled
 *    version. See the IIFE at the bottom for a self-contained snippet.
 *
 * 2. Via tsx / ts-node (for CI or scripting):
 *    npx tsx scripts/load-seed.ts
 *    This prints the localStorage payloads as JSON so you can pipe them
 *    into Playwright, Puppeteer, or any test harness.
 *
 * 3. Import in test setup:
 *    import { applyToLocalStorage } from "./load-seed";
 *    applyToLocalStorage();  // call inside a browser context
 */

import { team, assignments, reads, procedures, SEED_CLINIC } from "./seed-clinic";

// ---------------------------------------------------------------------------
// Apply to localStorage (browser context only)
// ---------------------------------------------------------------------------

export function applyToLocalStorage(): void {
  if (typeof localStorage === "undefined") {
    throw new Error("applyToLocalStorage() must run in a browser context.");
  }

  localStorage.setItem("clinic_team", JSON.stringify(team));
  localStorage.setItem("clinic_assignments", JSON.stringify(assignments));
  localStorage.setItem("clinic_reads", JSON.stringify(reads));

  console.log("[seed] Loaded seed data into localStorage:");
  console.log(`  Team members:  ${team.length}`);
  console.log(`  Assignments:   ${assignments.length}`);
  console.log(`  Read records:  ${reads.length}`);
  console.log("  Reload the page for ClinicProvider to pick up the data.");
}

// ---------------------------------------------------------------------------
// Print summary (works in Node and browser)
// ---------------------------------------------------------------------------

export function printSummary(): void {
  console.log(`\nClinic: ${SEED_CLINIC.name}`);
  console.log(`${"=".repeat(50)}`);
  console.log(`Team:       ${team.length} members`);
  console.log(`Procedures: ${procedures.length} (${procedures.filter(p => p.documented).length} documented)`);
  console.log(`Assignments: ${assignments.length}`);
  console.log(`Reads:       ${reads.length}`);

  // Per-member compliance breakdown
  console.log(`\nCompliance by staff member:`);
  console.log(`${"─".repeat(50)}`);
  for (const member of team) {
    const memberAssignments = assignments.filter(a => a.memberId === member.id);
    const memberReads = reads.filter(r => r.memberId === member.id);
    const total = memberAssignments.length;
    const read = memberReads.length;
    const pct = total > 0 ? Math.round((read / total) * 100) : 0;
    const bar = "█".repeat(Math.round(pct / 5)) + "░".repeat(20 - Math.round(pct / 5));
    console.log(`  ${member.name.padEnd(22)} ${member.role.padEnd(18)} ${bar} ${pct}% (${read}/${total})`);
  }

  // Unread procedures per non-compliant member
  const nonCompliant = team
    .map(member => {
      const assigned = assignments.filter(a => a.memberId === member.id).map(a => a.sopId);
      const readIds = reads.filter(r => r.memberId === member.id).map(r => r.sopId);
      const unread = assigned.filter(id => !readIds.includes(id));
      return { member, unread };
    })
    .filter(x => x.unread.length > 0);

  if (nonCompliant.length > 0) {
    console.log(`\nUnread procedures:`);
    console.log(`${"─".repeat(50)}`);
    for (const { member, unread } of nonCompliant) {
      const titles = unread.map(id => {
        const proc = procedures.find(p => p.sopId === id);
        return proc ? proc.title : id;
      });
      console.log(`  ${member.name}: ${titles.join(", ")}`);
    }
  }
}

// ---------------------------------------------------------------------------
// JSON export (for Playwright / Puppeteer / test fixtures)
// ---------------------------------------------------------------------------

export function toJSON(): { clinic_team: string; clinic_assignments: string; clinic_reads: string } {
  return {
    clinic_team: JSON.stringify(team),
    clinic_assignments: JSON.stringify(assignments),
    clinic_reads: JSON.stringify(reads),
  };
}

// ---------------------------------------------------------------------------
// Self-executing: when run directly, print summary + JSON
// ---------------------------------------------------------------------------

const isNode = typeof process !== "undefined" && process.versions?.node;
if (isNode) {
  printSummary();
  console.log("\n--- JSON payloads (paste into browser console) ---\n");
  const json = toJSON();
  console.log(`localStorage.setItem("clinic_team", '${json.clinic_team}');`);
  console.log(`localStorage.setItem("clinic_assignments", '${json.clinic_assignments}');`);
  console.log(`localStorage.setItem("clinic_reads", '${json.clinic_reads}');`);
  console.log(`\n// Then reload the page.`);
}

// Browser console snippet: copy the block below into DevTools console
// to load seed data directly.
//
// (function(){
//   const s = await import("/scripts/load-seed");
//   s.applyToLocalStorage();
//   location.reload();
// })();
