import { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLANS, type Plan } from "@/types";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

export const metadata: Metadata = {
  title: "Pricing — SOPGenius",
  description:
    "Simple, transparent pricing for AI-powered SOP generation. Start free, upgrade when you need more.",
};

export default function PricingPage() {
  const planKeys: Plan[] = ["free", "solo", "practice", "dso"];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <PublicNav />

      {/* Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when your team needs more power. No hidden fees.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {planKeys.map((key) => {
            const plan = PLANS[key];
            const isHighlighted = plan.highlighted;

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
                    <span className="text-4xl font-bold">${plan.price}</span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  {plan.annualPrice > 0 && plan.annualPrice < plan.price && (
                    <p className="mt-1 text-sm text-success">
                      ${plan.annualPrice}/mo billed annually (save 20%)
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
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
                        {plan.price === 0 ? "Get Started Free" : `Start ${plan.name} Plan`}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
                a: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged a prorated amount. When downgrading, you'll keep your current plan until the end of the billing cycle.",
              },
              {
                q: "Is there a free trial for paid plans?",
                a: "Our Free plan lets you generate 3 SOPs per month at no cost — no credit card required. This gives you a great feel for the product before committing to a paid plan.",
              },
              {
                q: "What happens if I exceed my generation limit?",
                a: "You'll be prompted to upgrade your plan. We'll never charge you extra without your consent. Your existing SOPs remain fully accessible.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. There are no long-term contracts. Cancel anytime from your billing dashboard and you'll retain access until the end of your billing period.",
              },
              {
                q: "Do you offer discounts for nonprofits or education?",
                a: "Yes! Contact us at support@sopgenius.com for special pricing for nonprofits, educational institutions, and government organizations.",
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

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
