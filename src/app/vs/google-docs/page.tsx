import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "DentiSOP vs Google Docs — SOPs Need Enforcement, Not a Text Editor",
  description:
    "Google Docs has no assignments, no read tracking, no compliance structure, and no accountability. DentiSOP enforces SOPs across your dental team with role-based tracking.",
};

const rows = [
  { feature: "Assign SOPs to specific roles", dentisop: true, competitor: false },
  { feature: "Read tracking with timestamps", dentisop: true, competitor: false },
  { feature: "Non-compliance alerts", dentisop: true, competitor: false },
  { feature: "Compliance scoring per staff member", dentisop: true, competitor: false },
  { feature: "OSHA/HIPAA/CDC template library", dentisop: true, competitor: false },
  { feature: "Version control with audit trail", dentisop: true, competitor: false },
  { feature: "Weekly enforcement reports", dentisop: true, competitor: false },
  { feature: "Regulatory mapping", dentisop: true, competitor: false },
  { feature: "Free to start", dentisop: true, competitor: true },
  { feature: "Works offline", dentisop: false, competitor: true },
];

function Check() {
  return <CheckCircle className="mx-auto h-5 w-5 text-green-600" />;
}
function X() {
  return <XCircle className="mx-auto h-5 w-5 text-red-400" />;
}

export default function VsGoogleDocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            DentiSOP vs Google Docs
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Google Docs is where SOPs go to die. You write them, share a link,
            and hope someone reads them. No assignments. No tracking. No
            accountability. No compliance structure. DentiSOP turns SOPs from
            static documents into enforced operational standards.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-gray-900">Feature</th>
                  <th className="py-3 px-4 text-center font-semibold text-blue-600">DentiSOP</th>
                  <th className="py-3 pl-4 text-center font-semibold text-gray-500">Google Docs</th>
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
              The problem with Google Docs for SOPs
            </h2>
            <p>
              A Google Doc can&apos;t tell you whether your new hygienist read
              the updated sterilization protocol. It can&apos;t flag that three
              staff members are overdue on OSHA training procedures. It
              can&apos;t send you a weekly compliance report or score your
              team&apos;s adherence to HIPAA workflows.
            </p>
            <p>
              Google Docs is a text editor. DentiSOP is an execution enforcement
              platform. You assign SOPs by role, track who reads what and when,
              flag non-compliance automatically, and get weekly reports that show
              exactly where your practice stands &mdash; before an inspector
              walks through the door.
            </p>
          </div>

          <div className="mt-16 rounded-2xl bg-blue-50 px-8 py-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Your SOPs deserve more than a shared folder.
            </h2>
            <p className="mt-3 text-gray-600">
              Move from hoping people read the doc to knowing they did &mdash;
              with timestamps, scores, and enforcement built in.
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
