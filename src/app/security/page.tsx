import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Learn how SOPGenius protects your dental practice data. HIPAA-aware SOP formatting, hosted on Vercel, database on Supabase, with row-level security and encrypted connections.",
};

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Security at SOPGenius
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We take the security of your dental practice data seriously. Here is
            how we protect your information.
          </p>

          <div className="mt-12 space-y-10 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Infrastructure
              </h2>
              <p className="mt-3">
                SOPGenius is hosted on{" "}
                <strong className="text-gray-900">Vercel</strong>, which
                provides production-grade infrastructure with automatic scaling,
                DDoS protection, and global edge delivery.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Database</h2>
              <p className="mt-3">
                Our database runs on{" "}
                <strong className="text-gray-900">Supabase</strong> (PostgreSQL)
                with row-level security (RLS) policies. This means your data is
                isolated at the database level — users can only access their own
                records.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Encryption
              </h2>
              <p className="mt-3">
                All connections to SOPGenius are encrypted via HTTPS/TLS. Data in
                transit between your browser, our servers, and the database is
                always encrypted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Authentication
              </h2>
              <p className="mt-3">
                User authentication is handled by Supabase Auth, which supports
                secure email/password login and social sign-in. Passwords are
                hashed and never stored in plain text.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Data isolation
              </h2>
              <p className="mt-3">
                Row-level security policies enforce strict per-user data
                isolation. API requests are authenticated and scoped so that
                users can only read and modify their own SOPs and account data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                HIPAA Compliance Note
              </h2>
              <p className="mt-3">
                SOPGenius helps dental practices format SOPs that align with
                HIPAA requirements, but SOPGenius is not itself a covered entity
                or business associate under HIPAA. Our platform is designed for
                documenting processes and procedures — users describe how
                workflows operate, not individual patient data. No protected
                health information (PHI) is stored in SOPGenius. If your SOPs
                describe patient-facing processes, they document the procedure
                itself, not patient records.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Questions?
              </h2>
              <p className="mt-3">
                If you have security concerns or questions, please{" "}
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700"
                >
                  contact us
                </Link>
                . You can also review our{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700"
                >
                  privacy policy
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
