import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { TEMPLATES, getTemplateBySlug } from "@/lib/templates";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return {};
  return {
    title: template.metaTitle,
    description: template.metaDescription,
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) notFound();

  const relatedTemplates = template.relatedSlugs
    .map((s) => getTemplateBySlug(s))
    .filter(Boolean);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: template.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dentisop.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Templates",
        item: "https://dentisop.com/templates",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: template.title,
        item: `https://dentisop.com/templates/${template.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PublicNav />
      <main className="min-h-screen">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/templates" className="hover:text-primary transition-colors">
                  Templates
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium truncate">
                {template.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <p className="text-sm font-medium text-primary mb-2">
              {template.industry} &middot; {template.department}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {template.title}
            </h1>
          </header>

          {/* Long Description */}
          <section className="mb-10">
            {template.longDescription.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Who Is This For */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Who is this for?</h2>
            <ul className="space-y-2">
              {template.whoIsItFor.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* What To Include */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              What should this SOP include?
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {template.whatToInclude.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Example Steps */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Example procedure steps
            </h2>
            <ol className="space-y-4">
              {template.exampleSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-muted-foreground leading-relaxed pt-0.5">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Why Use AI */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Why use AI to create and enforce this procedure?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {template.whyUseAI}
            </p>
          </section>

          {/* CTA */}
          <section className="mb-16 rounded-xl bg-muted/50 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3">
              Create &amp; Assign Your {template.title.replace(" Template", "")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Answer a few questions about your team and tools, and DentiSOP
              creates a ready-to-use SOP you can export to PDF or Word.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Create &amp; Assign Your {template.title.replace(" Template", "")}
            </Link>
          </section>

          {/* Related Templates */}
          {relatedTemplates.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Related templates</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTemplates.map(
                  (related) =>
                    related && (
                      <Link
                        key={related.slug}
                        href={`/templates/${related.slug}`}
                        className="block rounded-lg border p-4 hover:shadow-md transition-shadow"
                      >
                        <p className="font-medium mb-1">{related.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {related.shortDescription}
                        </p>
                      </Link>
                    ),
                )}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {template.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-lg border px-4 py-3 [&_summary]:cursor-pointer"
                >
                  <summary className="font-medium text-foreground group-open:mb-2">
                    {item.q}
                  </summary>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </article>
      </main>
      <PublicFooter />
    </>
  );
}
