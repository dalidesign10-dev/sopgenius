import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "DentiSOP terms of service. Read before using our AI SOP generation platform.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Last updated: April 2, 2026
          </p>

          <div className="mt-10 space-y-10 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Acceptance of terms
              </h2>
              <p className="mt-3">
                By accessing or using DentiSOP, you agree to be bound by these
                Terms of Service. If you do not agree, do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Service description
              </h2>
              <p className="mt-3">
                DentiSOP is a web-based platform that uses AI to help users
                create, manage, and share standard operating procedures. We
                provide tools for SOP generation, editing, exporting, and team
                collaboration.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                User accounts
              </h2>
              <p className="mt-3">
                You are responsible for maintaining the security of your account
                credentials. You must provide accurate information when creating
                an account. You are responsible for all activity that occurs
                under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Acceptable use
              </h2>
              <p className="mt-3">You agree not to:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  Use the service for any unlawful purpose
                </li>
                <li>
                  Attempt to gain unauthorized access to the service or its
                  systems
                </li>
                <li>
                  Interfere with or disrupt the service for other users
                </li>
                <li>
                  Reverse engineer or attempt to extract the source code of the
                  service
                </li>
                <li>
                  Use the service to generate content that is harmful, abusive,
                  or violates the rights of others
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Intellectual property
              </h2>
              <p className="mt-3">
                You retain ownership of the content you create using DentiSOP,
                including your SOPs. DentiSOP retains ownership of the platform,
                its design, code, and branding. The AI-generated output is
                provided for your use but does not grant you rights to the
                underlying AI models.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Payment terms
              </h2>
              <p className="mt-3">
                Paid plans are billed on a recurring basis. You authorize us to
                charge your payment method at the start of each billing cycle.
                Refunds are handled on a case-by-case basis. You can cancel your
                subscription at any time from your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Limitation of liability
              </h2>
              <p className="mt-3">
                DentiSOP is provided &quot;as is&quot; without warranties of any
                kind. We are not liable for any indirect, incidental, or
                consequential damages arising from your use of the service.
                AI-generated SOPs should be reviewed by qualified personnel
                before use in critical or regulated processes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Changes to terms
              </h2>
              <p className="mt-3">
                We may update these terms from time to time. We will notify
                registered users of material changes via email. Continued use of
                the service after changes constitutes acceptance of the updated
                terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
              <p className="mt-3">
                Questions about these terms? Email us at{" "}
                <a
                  href="mailto:support@dentisop.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  support@dentisop.com
                </a>{" "}
                or visit our{" "}
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700"
                >
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
