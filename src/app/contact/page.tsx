import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { Mail, Clock, MessageSquare, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact DentiSOP — Get Help, Ask Questions, or Request a Demo",
  description:
    "Reach the DentiSOP team for support, pricing questions, enterprise inquiries, or a live demo. We typically respond within one business day.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Whether you have a question about features, pricing, or need help
            getting started &mdash; we&apos;re here to help.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* General support */}
            <div className="rounded-xl border bg-gray-50 p-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900">
                  General Support
                </h2>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Questions about your account, features, or getting started.
              </p>
              <a
                href="mailto:support@dentisop.com"
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              >
                support@dentisop.com
              </a>
            </div>

            {/* Response time */}
            <div className="rounded-xl border bg-gray-50 p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Response Time
                </h2>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                We typically respond within one business day. Priority support
                (24-hour) is available on Multi-Clinic and Enterprise plans.
              </p>
            </div>

            {/* Enterprise / DSO */}
            <div className="rounded-xl border bg-gray-50 p-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Enterprise &amp; DSO Inquiries
                </h2>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Multi-location deployments, SSO, API access, or custom
                pricing.
              </p>
              <a
                href="mailto:support@dentisop.com?subject=Enterprise%20Inquiry"
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              >
                support@dentisop.com
              </a>
            </div>

            {/* Request a demo */}
            <div className="rounded-xl border bg-gray-50 p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Request a Demo
                </h2>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Want to see DentiSOP in action for your practice? We&apos;ll
                walk you through the platform and answer your questions live.
              </p>
              <a
                href="mailto:support@dentisop.com?subject=Demo%20Request"
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              >
                Request a demo &rarr;
              </a>
            </div>
          </div>

          <div className="mt-12 space-y-3 text-gray-600">
            <p className="font-medium text-gray-900">
              Before reaching out, you might find your answer here:
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pricing"
                  className="text-primary hover:underline"
                >
                  Pricing and plans &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-primary hover:underline"
                >
                  Features overview &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-primary hover:underline"
                >
                  Security and compliance &rarr;
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
