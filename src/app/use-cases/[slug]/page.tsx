import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { USE_CASES } from "@/lib/use-cases";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return USE_CASES.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const uc = USE_CASES.find((u) => u.slug === slug);
  if (!uc) return {};
  return {
    title: uc.metaTitle,
    description: uc.metaDescription,
  };
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const uc = USE_CASES.find((u) => u.slug === slug);
  if (!uc) notFound();

  const industry = uc.title.replace(" SOP Generator", "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sopgenius.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Use Cases",
        item: "https://sopgenius.com/use-cases",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: uc.title,
        item: `https://sopgenius.com/use-cases/${uc.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8"
      >
        <ol className="flex items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li>
            <span className="text-muted-foreground">Use Cases</span>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li className="text-foreground font-medium">{uc.title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {uc.h1}
        </h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>{uc.intro[0]}</p>
          <p>{uc.intro[1]}</p>
        </div>
      </section>

      {/* Processes */}
      <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">
          Common {industry} processes you can document
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {uc.processes.map((p) => (
            <li
              key={p}
              className="flex items-start gap-2 rounded-lg border p-4 text-sm"
            >
              <span className="mt-0.5 text-primary">&#9679;</span>
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* Benefits */}
      <section className="border-t bg-slate-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">
            Benefits of AI-generated {industry} SOPs
          </h2>
          <ul className="mt-6 space-y-4">
            {uc.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <span className="mt-1 text-green-600">&#10003;</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-bold">
            Start generating {industry} SOPs
          </h2>
          <p className="mt-3 text-muted-foreground">
            Describe your process in plain language. Get a structured, professional
            SOP in minutes.
          </p>
          <Link href="/signup" className="mt-6 inline-block">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>

      {/* Related Templates */}
      {uc.relatedTemplates.length > 0 && (
        <section className="border-t py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold">Related templates</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {uc.relatedTemplates.map((t) => (
                <Link
                  key={t}
                  href={`/templates/${t}`}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
                >
                  {t
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <PublicFooter />
    </div>
  );
}
