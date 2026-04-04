"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLANS, type Plan } from "@/types";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

// export const metadata: Metadata = {
//   title: "Pricing — Pricing That Makes Sense for Dental Practices",
//   description:
//     "Pricing that makes sense for dental practices. Start your free pilot, upgrade when your team is ready. 30-day money-back guarantee on all paid plans.",
// };
// Note: metadata must be in a server component. We use generateMetadata or a separate layout for this page.

const planKeys: Plan[] = ["starter", "clinic", "multi-clinic"];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      {/* Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            What Does It Cost When Your Team Doesn&apos;t Follow the Process?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A single OSHA violation costs up to $16,131. A single turnover costs 50–200% of salary. DentiSOP costs less than your daily coffee run. Start free — upgrade when your team depends on it.
          </p>

          {/* Annual / Monthly toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border bg-white p-1 text-sm">
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-4 py-2 font-medium transition ${
                annual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual <span className="text-xs opacity-80">(save up to 31%)</span>
            </button>
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-2 font-medium transition ${
                !annual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {planKeys.map((key) => {
            const plan = PLANS[key];
            const isHighlighted = plan.highlighted;
            const displayPrice = annual ? plan.annualPrice : plan.price;

            return (
              <Card
                key={key}
                className={`relative flex flex-col ${
                  isHighlighted ? "ring-2 ring-primary shadow-lg scale-105" : ""
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {displayPrice === 0 ? "Free" : `\u00a3${displayPrice}`}
                    </span>
                    {displayPrice > 0 && (
                      <span className="text-muted-foreground">/mo</span>
                    )}
                  </div>
                  {annual && plan.price > 0 && plan.annualPrice < plan.price && (
                    <p className="mt-1 text-sm text-green-600">
                      or {"\u00a3"}{plan.price}/mo monthly — save {"\u00a3"}{(plan.price - plan.annualPrice) * 12}/yr
                    </p>
                  )}
                  {!annual && plan.annualPrice > 0 && plan.annualPrice < plan.price && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      or {"\u00a3"}{plan.annualPrice}/mo billed annually
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/signup" className="block">
                      <Button
                        className="w-full"
                        variant={isHighlighted ? "default" : "outline"}
                        size="lg"
                      >
                        {plan.price === 0 ? "Start Free Pilot" : `Start 14-Day Pilot — ${plan.name}`}
                      </Button>
                    </Link>
                    {plan.price > 0 && (
                      <p className="mt-2 text-center text-xs text-muted-foreground">
                        30-day money-back guarantee
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Enterprise card */}
          <Card className="relative flex flex-col border-dashed">
            <CardHeader className="text-center">
              <h3 className="text-lg font-semibold">{PLANS.enterprise.name}</h3>
              <p className="text-sm text-muted-foreground">{PLANS.enterprise.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Tailored pricing for your organisation
              </p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <ul className="flex-1 space-y-3">
                {PLANS.enterprise.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/contact" className="block">
                  <Button className="w-full" variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ROI callout */}
      <section className="mx-auto max-w-3xl px-4 pb-20 text-center">
        <div className="rounded-2xl border bg-primary/5 p-8">
          <p className="text-lg font-semibold">
            The average OSHA fine for a single serious violation is $16,131. Replacing one dental assistant costs $25,000+.
          </p>
          <p className="mt-2 text-muted-foreground">
            DentiSOP Clinic costs less than 1% of that — per year. The system pays for itself the first week your team actually follows the process.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-white py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes. You can upgrade or downgrade at any time. When upgrading, you pay a prorated amount. When downgrading, you keep your current plan until the end of the billing cycle.",
              },
              {
                q: "Is there a free trial for paid plans?",
                a: "Every paid plan includes a 14-day full-access pilot. If DentiSOP doesn't work for your practice, we'll refund every penny — no questions asked, for 30 days.",
              },
              {
                q: "What happens if I exceed my generation limit on the free plan?",
                a: "You'll be prompted to upgrade. We'll never charge you without your consent. Your existing procedures remain fully accessible.",
              },
              {
                q: "Is the AI-generated content actually compliant?",
                a: "DentiSOP structures every procedure with sections mapped to OSHA, HIPAA, CDC, and state dental board frameworks. But generation is just step one — the real value is that every procedure gets assigned, tracked, and enforced across your team.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. No long-term contracts. Cancel from your billing dashboard and retain access until the end of your billing period.",
              },
              {
                q: "Do you offer a HIPAA BAA?",
                a: "Yes — HIPAA Business Associate Agreements are included with Multi-Clinic and Enterprise plans. Contact us for details.",
              },
              {
                q: "Do you offer discounts for dental schools or nonprofits?",
                a: "Yes. Contact us at support@dentisop.com for special pricing for dental schools, nonprofits, and government organisations.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border bg-white p-4 transition-shadow hover:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  {q}
                  <span className="ml-2 text-muted-foreground transition-transform group-open:rotate-180">
                    &#9662;
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
