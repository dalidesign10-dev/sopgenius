import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

export const metadata: Metadata = {
  title: "Help Center — DentiSOP",
  description:
    "Find answers about using DentiSOP to assign, track, and enforce dental practice procedures across your team.",
};

const faqCategories = [
  {
    title: "Getting Started",
    questions: [
      {
        q: "What is DentiSOP?",
        a: "DentiSOP is an execution enforcement system for dental practices. It helps you document procedures with AI, assign them to the right team members by role, track who's read what, and flag non-compliance by name. It's not just a document tool — it's the system your team uses every day.",
      },
      {
        q: "Do I need an account to use DentiSOP?",
        a: "Yes. Sign up for a free account to get started. Free accounts let you document, assign, and track a limited number of procedures per month.",
      },
      {
        q: "What formats can I export my SOPs in?",
        a: "You can export SOPs as PDF, Word (.docx), and Markdown files depending on your plan. PDFs are formatted for compliance binders and state board audits.",
      },
      {
        q: "Is there a free plan?",
        a: "Yes. The free plan lets you create and manage a limited number of SOPs. Check our pricing page for full details.",
      },
    ],
  },
  {
    title: "Creating Dental SOPs",
    questions: [
      {
        q: "How do I create a new SOP?",
        a: "From your dashboard, click 'New Procedure' and either describe your workflow or choose a dental-specific template. DentiSOP creates a structured procedure you can edit, then assign to team members and track for compliance.",
      },
      {
        q: "Can I use dental templates?",
        a: "Yes. We offer templates built for dental practices including infection control, instrument sterilization, radiograph protocols, patient check-in, emergency response, OSHA training, front desk procedures, and new hire onboarding.",
      },
      {
        q: "Can I customize procedures after creation?",
        a: "Absolutely. Every procedure is fully editable. Modify steps, add sections, adjust details to match your practice — then re-assign and track the updated version.",
      },
      {
        q: "How does version history work?",
        a: "Every time you save changes, a new version is recorded. You can view previous versions, compare changes, and restore any earlier version — keeping you ready for OSHA inspections and state board audits.",
      },
    ],
  },
  {
    title: "Assignments and Tracking",
    questions: [
      {
        q: "How do I assign SOPs to my team?",
        a: "From any procedure, click 'Assign' and select team members by role — hygienists, assistants, front desk, dentists. They'll be notified and the system tracks whether they've read and acknowledged the procedure.",
      },
      {
        q: "How do read receipts work?",
        a: "When a team member opens and reads an assigned procedure, it's logged automatically. You can see exactly who has and hasn't read each SOP from your dashboard — by name.",
      },
      {
        q: "What happens when someone doesn't read an assigned SOP?",
        a: "They show up as non-compliant on your dashboard with a red flag. DentiSOP can also send automated email reminders to nudge them. You stay informed without having to chase anyone.",
      },
      {
        q: "Can I export SOPs for compliance binders?",
        a: "Yes. Export to PDF or Word for inclusion in OSHA compliance binders, state board audit folders, or office procedure manuals.",
      },
      {
        q: "Are exported PDFs formatted for audits?",
        a: "Yes. PDF exports include headers, revision dates, page numbers, and clean formatting suitable for state board audits and regulatory inspections.",
      },
    ],
  },
  {
    title: "Account and Billing",
    questions: [
      {
        q: "How do I upgrade my plan?",
        a: "Go to your account settings and select 'Billing'. You can upgrade, downgrade, or manage your subscription at any time.",
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes. You can cancel from your billing settings at any time. You'll retain access until the end of your current billing period.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major credit and debit cards via Stripe. All payments are processed securely.",
      },
      {
        q: "How do I delete my account?",
        a: "Contact us at support@dentisop.com to request account deletion. We'll remove your data in accordance with our privacy policy.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Help Center
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about DentiSOP.
          </p>

          <div className="mt-12 space-y-12">
            {faqCategories.map((category) => (
              <section key={category.title}>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h2>
                <div className="mt-4 space-y-2">
                  {category.questions.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-lg border px-5 py-4"
                    >
                      <summary className="cursor-pointer font-medium text-gray-900 group-open:mb-2">
                        {item.q}
                      </summary>
                      <p className="text-gray-600">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-xl border bg-gray-50 p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Still have questions?
            </h2>
            <p className="mt-2 text-gray-600">
              We're happy to help.{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700"
              >
                Contact us &rarr;
              </Link>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link
              href="/templates"
              className="text-blue-600 hover:text-blue-700"
            >
              Browse templates
            </Link>
            <Link
              href="/features"
              className="text-blue-600 hover:text-blue-700"
            >
              See features
            </Link>
            <Link
              href="/pricing"
              className="text-blue-600 hover:text-blue-700"
            >
              View pricing
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
