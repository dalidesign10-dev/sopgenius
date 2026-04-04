import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "DentiSOP vs Dental Consultants — Daily Enforcement at 1/50th the Cost",
  description:
    "Dental consultants charge $5K-$25K, deliver a binder, and leave. DentiSOP enforces SOPs daily with role assignments, read tracking, and compliance scoring for under $50/month.",
};

const rows = [
  { feature: "OSHA/HIPAA/CDC procedures included", dentisop: true, competitor: true },
  { feature: "Role-based SOP assignments", dentisop: true, competitor: false },
  { feature: "Daily enforcement & read tracking", dentisop: true, competitor: false },
  { feature: "Compliance scoring per staff member", dentisop: true, competitor: false },
  { feature: "Non-compliance alerts", dentisop: true, competitor: false },
  { feature: "Weekly enforcement reports", dentisop: true, competitor: false },
  { feature: "Scales across multiple locations", dentisop: true, competitor: false },
  { feature: "Updates when regulations change", dentisop: true, competitor: false },
  { feature: "Under $50/month", dentisop: true, competitor: false },
  { feature: "On-site presence", dentisop: false, competitor: true },
];

function Check() {
  return <CheckCircle className="mx-auto h-5 w-5 text-green-600" />;
}
function X() {
  return <XCircle className="mx-auto h-5 w-5 text-red-400" />;
}

export default function VsDentalConsultantPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            DentiSOP vs Dental Consultants
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Consultants charge $5K&ndash;$25K, spend a week in your office,
            hand you a binder, and leave. Six months later that binder is
            collecting dust and your team is back to old habits. DentiSOP is the
            consultant in a box &mdash; at 1/50th the cost with daily
            enforcement built in.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-gray-900">Feature</th>
                  <th className="py-3 px-4 text-center font-semibold text-blue-600">DentiSOP</th>
                  <th className="py-3 pl-4 text-center font-semibold text-gray-500">Consultant</th>
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
              The binder problem
            </h2>
            <p>
              A consultant builds great procedures. The problem is what happens
              after they leave. Nobody assigns those procedures to specific
              roles. Nobody tracks whether staff actually reads them. Nobody
              flags when a new hire skips the OSHA bloodborne pathogen protocol.
              The binder sits on a shelf until the next audit &mdash; and by then
              it&apos;s outdated.
            </p>
            <p>
              DentiSOP closes the loop. Every procedure is assigned by role,
              tracked by read status, and scored for compliance. When regulations
              change, templates update automatically. When someone falls behind,
              you get an alert &mdash; not a surprise during an inspection.
              That&apos;s not consulting. That&apos;s enforcement.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900">Cost comparison</h3>
            <div className="mt-4 grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-500">Dental consultant</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">$5K&ndash;$25K</p>
                <p className="text-gray-500">One-time visit, no ongoing enforcement</p>
              </div>
              <div>
                <p className="text-blue-600 font-medium">DentiSOP</p>
                <p className="mt-1 text-2xl font-bold text-blue-600">&lt;$50/mo</p>
                <p className="text-gray-500">Daily enforcement, unlimited updates</p>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-blue-50 px-8 py-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Fire the binder. Hire the platform.
            </h2>
            <p className="mt-3 text-gray-600">
              Get the procedures of a $25K consultant with the daily enforcement
              no consultant can provide &mdash; for less than your monthly coffee
              budget.
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
