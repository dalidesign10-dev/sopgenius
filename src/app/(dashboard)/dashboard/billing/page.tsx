"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/types";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <BillingContent />
    </Suspense>
  );
}

function BillingContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const [showPlans, setShowPlans] = useState(false);

  // Placeholder current plan & usage
  const currentPlan = "starter" as const;
  const usedGenerations = 1;
  const plan = PLANS[currentPlan];
  const maxGenerations = plan.generationsPerMonth ?? Infinity;
  const usagePercent =
    maxGenerations === Infinity
      ? 0
      : Math.round((usedGenerations / maxGenerations) * 100);

  const handleManageBilling = async () => {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription and usage.
        </p>
      </div>

      {success && (
        <div className="flex items-center gap-2 rounded-md bg-green-50 border border-green-200 p-4 text-green-800 text-sm">
          <CheckCircle className="h-4 w-4" />
          Your subscription has been updated successfully.
        </div>
      )}
      {canceled && (
        <div className="flex items-center gap-2 rounded-md bg-yellow-50 border border-yellow-200 p-4 text-yellow-800 text-sm">
          <AlertCircle className="h-4 w-4" />
          Checkout was canceled. No changes were made.
        </div>
      )}

      {/* Current Plan */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {plan.description}
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {plan.name}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-3xl font-bold">
            ${plan.price}
            <span className="text-base font-normal text-muted-foreground">
              /month
            </span>
          </div>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
                {f}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Usage This Month</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Generations used</span>
            <span className="font-medium">
              {usedGenerations} of{" "}
              {maxGenerations === Infinity ? "Unlimited" : maxGenerations}
            </span>
          </div>
          {maxGenerations !== Infinity && (
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={() => setShowPlans(!showPlans)}>
          {showPlans ? "Hide Plans" : "Change Plan"}
        </Button>
        <Button variant="outline" onClick={handleManageBilling}>
          Manage Subscription
        </Button>
      </div>

      {/* Plan Comparison */}
      {showPlans && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.entries(PLANS) as [string, (typeof PLANS)[keyof typeof PLANS]][]).map(
            ([key, p]) => (
              <Card
                key={key}
                className={
                  p.highlighted ? "border-primary shadow-md" : undefined
                }
              >
                <CardHeader>
                  <h3 className="font-semibold">{p.name}</h3>
                  <div className="text-2xl font-bold">
                    ${p.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /mo
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {p.description}
                  </p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <CheckCircle className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    size="sm"
                    variant={key === currentPlan ? "outline" : "default"}
                    disabled={key === currentPlan}
                  >
                    {key === currentPlan ? "Current" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}
