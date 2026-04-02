import type { Metadata } from "next";
import Link from "next/link";
import {
  UserPlus,
  Package,
  ClipboardCheck,
  ShieldAlert,
  Heart,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { getTemplatesByIndustry, type Template } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Dental SOP Templates — Free Templates for Dental Practices",
  description:
    "Browse dental SOP templates for sterilization, OSHA compliance, HIPAA, infection control, and more. Customize any template with AI and export to PDF or Word.",
};

const iconMap: Record<string, React.ReactNode> = {
  UserPlus: <UserPlus className="h-6 w-6" />,
  Package: <Package className="h-6 w-6" />,
  ClipboardCheck: <ClipboardCheck className="h-6 w-6" />,
  ShieldAlert: <ShieldAlert className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
};

function TemplateCard({ template }: { template: Template }) {
  return (
    <Link href={`/templates/${template.slug}`} className="group block">
      <Card className="h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="text-primary">{iconMap[template.icon]}</div>
            <Badge variant="secondary">{template.department}</Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {template.title}
          </CardTitle>
          <CardDescription>{template.shortDescription}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default function TemplatesPage() {
  const grouped = getTemplatesByIndustry();

  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Dental SOP Templates for Every Practice
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Start with a dental-specific template, customize it with AI, and
            export an OSHA, HIPAA, or CDC-compliant SOP in minutes. Each
            template includes real clinical and administrative procedures,
            example steps, and best practices drawn from dental industry
            standards. Explore our{" "}
            <Link href="/features" className="text-primary underline">
              features
            </Link>{" "}
            to see how SOPGenius turns these templates into fully customized
            documents for your practice.
          </p>

          {Object.entries(grouped).map(([industry, templates]) => (
            <section key={industry} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">{industry}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <TemplateCard key={template.slug} template={template} />
                ))}
              </div>
            </section>
          ))}
        </section>

        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Don&apos;t see your template?
            </h2>
            <p className="text-muted-foreground mb-6">
              Describe any dental office process and SOPGenius generates a
              custom SOP tailored to your practice, equipment, and workflows.
              No template required.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Create a Custom Dental SOP
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              View{" "}
              <Link href="/pricing" className="text-primary underline">
                pricing plans
              </Link>{" "}
              for teams and enterprises.
            </p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
