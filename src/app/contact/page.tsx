import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the DentiSOP team. Questions about compliance enforcement, team tracking, pricing, or enterprise features — we're here to help.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Have a question or need help? We'd love to hear from you.
          </p>

          <div className="mt-10 rounded-xl border bg-gray-50 p-8">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Email</h2>
            </div>
            <p className="mt-2 text-gray-600">
              Reach us at{" "}
              <a
                href="mailto:support@dentisop.com"
                className="text-blue-600 hover:text-blue-700"
              >
                support@dentisop.com
              </a>
              . We typically respond within one business day.
            </p>
          </div>

          <div className="mt-10 space-y-3 text-gray-600">
            <p>Before reaching out, you might find your answer here:</p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Help Center &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Pricing and plans &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
