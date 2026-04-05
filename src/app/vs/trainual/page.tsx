import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "DentiSOP vs Trainual — Dental-Specific Documentation & Tracking",
  description:
    "Trainual is generic SMB onboarding. DentiSOP is built for dental practices with OSHA/HIPAA templates, compliance scoring, role-based SOP assignments, and read tracking.",
};

const rows = [
  { feature: "Built for dental practices", dentisop: true, competitor: false },
  { feature: "OSHA/HIPAA/CDC templates included", dentisop: true, competitor: false },
  { feature: "Assign SOPs by role (hygienist, front desk, etc.)", dentisop: true, competitor: false },
  { feature: "Read tracking with timestamps", dentisop: true, competitor: true },
  { feature: "Non-compliance flagging & alerts", dentisop: true, competitor: false },
  { feature: "Compliance scoring per staff member", dentisop: true, competitor: false },
  { feature: "Regulatory mapping (OSHA, HIPAA, CDC)", dentisop: true, competitor: false },
  { feature: "Weekly accountability reports", dentisop: true, competitor: false },
  { feature: "Multi-location support", dentisop: true, competitor: true },
  { feature: "Starts under $50/month", dentisop: true, competitor: false },
];

function Check() {
  return <CheckCircle className="mx-auto h-5 w-5 text-green-600" />;
}
function X() {
  return <XCircle className="mx-auto h-5 w-5 text-red-400" />;
}

export default function VsTrainualPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            DentiSOP vs Trainual
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Trainual is a solid onboarding tool for generic small businesses.
            But dental practices don&apos;t need generic &mdash; they need OSHA
            compliance, HIPAA accountability, and role-based SOP assignments that
            actually get tracked. That&apos;s DentiSOP.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-gray-900">Feature</th>
                  <th className="py-3 px-4 text-center font-semibold text-blue-600">DentiSOP</th>
                  <th className="py-3 pl-4 text-center font-semibold text-gray-500">Trainual</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-700">{row.feature}</td>
                    <td className="py-3 px-4 text-center">{row.dentisop ? <Check /> : <X />}</td>
                    <td className="py-3 pl-4 text-center">{row.competitor ? <Check /> : <X />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 space-y-6 text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900">
              Why dental teams switch from Trainual
            </h2>
            <p>
              Trainual treats your sterilization protocol the same as a coffee
              shop&apos;s opening checklist. There&apos;s no regulatory mapping,
              no compliance scoring, and no way to show your hygienist actually
              read the updated OSHA bloodborne pathogen procedure last Tuesday.
            </p>
            <p>
              DentiSOP was built from day one for dental. Every template maps to
              OSHA, HIPAA, or CDC requirements. Every SOP is assigned by role,
              tracked by read status, and scored for compliance. When someone
              hasn&apos;t read a critical procedure, you know &mdash; before an
              auditor does.
            </p>
          </div>

          <div className="mt-16 rounded-2xl bg-blue-50 px-8 py-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Stop onboarding. Start tracking.
            </h2>
            <p className="mt-3 text-gray-600">
              Switch from generic onboarding to dental-specific compliance
              tracking in under 10 minutes.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
