"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "Point-of-use pre-treatment",
    desc: "At chairside, spray or wipe instruments with enzymatic foam immediately after use to prevent bioburden from drying. Place in a puncture-resistant, leak-proof transport container with a lid and carry to the sterilization area.",
  },
  {
    title: "Automated cleaning (ultrasonic or washer-disinfector)",
    desc: "Wearing heavy-duty utility gloves, face protection, and a gown, load instruments into the ultrasonic cleaner with fresh enzymatic solution. Run a full cycle (6\u201310 min) per manufacturer\u2019s IFU. The CDC recommends automated cleaning equipment over hand scrubbing to reduce sharps-injury risk (CDC MMWR 2003, §III.B).",
  },
  {
    title: "Rinse, inspect, and dry",
    desc: "Rinse instruments thoroughly with distilled or deionized water. Visually inspect each instrument for residual debris under adequate lighting; re-clean any instrument that fails inspection. Dry completely before packaging to prevent wet packs.",
  },
  {
    title: "Package with chemical indicators",
    desc: "Arrange instruments in sterilization cassettes or FDA-cleared pouches. Place a Class 5 chemical integrator inside each package. Seal pouches and label with sterilizer ID, cycle number, date, and operator initials.",
  },
  {
    title: "Load autoclave and run cycle",
    desc: "Load without overcrowding per manufacturer\u2019s IFU. Use correct cycle for load type: 132\u00a0\u00b0C (270\u00a0\u00b0F) for 4 min (pre-vacuum, wrapped) or 121\u00a0\u00b0C (250\u00a0\u00b0F) for 30 min (gravity, wrapped). Do not exceed the maximum load weight.",
  },
  {
    title: "Biological monitoring (spore test)",
    desc: "Place a biological indicator (BI) in the most challenging location of the load at least weekly and with every implantable-device load (CDC MMWR 2003, §III.D). Incubate per manufacturer\u2019s instructions. Record pass/fail in the sterilization log.",
  },
  {
    title: "Failed spore-test protocol",
    desc: "If a BI result is positive: remove the sterilizer from service immediately. Quarantine all items processed since the last negative BI. Re-run the spore test after checking loading, packaging, and cycle parameters. Do not return the unit to service until a confirmed negative result is obtained. Document the failure, corrective actions, and retest outcome.",
  },
  {
    title: "Verify, log, and store",
    desc: "After the drying phase, verify package integrity and check the external chemical indicator on each package. Record all cycle data in the sterilization log (date, cycle number, operator, BI result). Store sealed packages in a clean, dry, covered area using first-in-first-out rotation.",
  },
];

const PREVIEW_COUNT = 2;

export function CollapsibleSOP() {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? steps : steps.slice(0, PREVIEW_COUNT);

  return (
    <CardContent className="p-0">
      <ol className="divide-y">
        {visible.map((step, i) => (
          <li key={i} className="flex gap-4 px-6 py-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {i + 1}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </div>
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          </li>
        ))}
      </ol>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-center gap-2 border-t bg-slate-50 py-3 text-sm font-semibold text-primary transition-colors hover:bg-slate-100"
      >
        {expanded ? (
          <>
            Hide steps <ChevronUp className="h-4 w-4" />
          </>
        ) : (
          <>
            Show all {steps.length} steps <ChevronDown className="h-4 w-4" />
          </>
        )}
      </button>
    </CardContent>
  );
}
