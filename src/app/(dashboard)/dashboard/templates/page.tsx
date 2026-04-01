import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Headphones,
  Package,
  Code,
  BarChart3,
  CheckCircle,
  Database,
  ShieldAlert,
  Heart,
  RefreshCw,
  Truck,
  TrendingUp,
} from "lucide-react";

const INDUSTRIES = [
  "All",
  "Human Resources",
  "Customer Service",
  "Operations",
  "IT & Engineering",
  "Finance",
  "Quality Assurance",
  "Healthcare",
  "Sales",
] as const;

const TEMPLATES = [
  {
    id: "employee-onboarding",
    name: "Employee Onboarding",
    description:
      "Step-by-step process for onboarding new employees including documentation, training, and orientation.",
    industry: "Human Resources",
    icon: Users,
  },
  {
    id: "customer-support-escalation",
    name: "Customer Support Escalation",
    description:
      "Define clear escalation paths for customer issues based on severity and type.",
    industry: "Customer Service",
    icon: Headphones,
  },
  {
    id: "inventory-management",
    name: "Inventory Management",
    description:
      "Track inventory levels, reorder points, and stock management procedures.",
    industry: "Operations",
    icon: Package,
  },
  {
    id: "software-deployment",
    name: "Software Deployment",
    description:
      "Standardize your software release process from staging to production.",
    industry: "IT & Engineering",
    icon: Code,
  },
  {
    id: "financial-reporting",
    name: "Financial Reporting",
    description:
      "Monthly and quarterly financial reporting procedures and compliance checks.",
    industry: "Finance",
    icon: BarChart3,
  },
  {
    id: "quality-control",
    name: "Quality Control",
    description:
      "Inspection and quality assurance procedures for products and services.",
    industry: "Quality Assurance",
    icon: CheckCircle,
  },
  {
    id: "data-backup-recovery",
    name: "Data Backup & Recovery",
    description:
      "Procedures for regular data backups and disaster recovery protocols.",
    industry: "IT & Engineering",
    icon: Database,
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description:
      "Handle security incidents and system outages with a structured response plan.",
    industry: "IT & Engineering",
    icon: ShieldAlert,
  },
  {
    id: "hipaa-compliance",
    name: "HIPAA Compliance",
    description:
      "Ensure healthcare data handling meets HIPAA regulatory requirements.",
    industry: "Healthcare",
    icon: Heart,
  },
  {
    id: "change-management",
    name: "Change Management",
    description:
      "Manage organizational changes with structured approval and communication workflows.",
    industry: "Operations",
    icon: RefreshCw,
  },
  {
    id: "vendor-onboarding",
    name: "Vendor Onboarding",
    description:
      "Evaluate, approve, and onboard new vendors with consistent due diligence.",
    industry: "Operations",
    icon: Truck,
  },
  {
    id: "sales-process",
    name: "Sales Process",
    description:
      "Standardize your sales pipeline from lead qualification to deal closure.",
    industry: "Sales",
    icon: TrendingUp,
  },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-muted-foreground mt-1">
          Browse pre-built SOP templates to get started quickly.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {INDUSTRIES.map((industry) => (
          <Badge
            key={industry}
            variant={industry === "All" ? "default" : "outline"}
            className="cursor-pointer"
          >
            {industry}
          </Badge>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.id}>
              <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                <div className="rounded-md bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold leading-none">
                    {template.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {template.industry}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
                <Button asChild className="w-full" size="sm">
                  <Link
                    href={`/dashboard/create?template=${template.id}`}
                  >
                    Use Template
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
