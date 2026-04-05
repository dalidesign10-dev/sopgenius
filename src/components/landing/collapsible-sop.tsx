"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "Transport contaminated instruments",
    desc: "Place used instruments in a puncture-resistant, color-coded container. Transport to the sterilization area immediately after the procedure.",
  },
  {
    title: "Pre-clean and rinse",
    desc: "Wearing heavy-duty utility gloves, scrub instruments under running water using a long-handled brush. Remove all visible debris.",
  },
  {
    title: "Ultrasonic cleaning cycle",
    desc: "Submerge instruments in the ultrasonic cleaner with enzymatic solution. Run a full cycle (6\u201310 minutes) per manufacturer\u2019s instructions.",
  },
  {
    title: "Rinse and inspect",
    desc: "Rinse instruments thoroughly with distilled water. Visually inspect each instrument under magnification for residual debris. Re-clean if necessary.",
  },
  {
    title: "Package for autoclaving",
    desc: "Place instruments in sterilization pouches or cassettes. Include a Class 5 integrator in each package. Seal pouches and label with date, cycle number, and operator initials.",
  },
  {
    title: "Load and run autoclave",
    desc: "Load the autoclave without overcrowding. Run at 134\u00a0\u00b0C / 18 minutes (pre-vacuum) or 121\u00a0\u00b0C / 30 minutes (gravity). Record cycle parameters in the sterilization log.",
  },
  {
    title: "Store sterilized instruments",
    desc: "After the drying cycle, store sealed packages in a clean, dry, covered area. Rotate stock using first-in-first-out. Packages are valid for 12 months if seal integrity is maintained.",
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
