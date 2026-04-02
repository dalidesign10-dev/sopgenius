import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { GUIDES } from "@/lib/guides";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
  };
}

/* ------------------------------------------------------------------ */
/*  Simple markdown-to-JSX renderer                                    */
/* ------------------------------------------------------------------ */

function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // blank line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // h2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="mt-10 mb-4 text-2xl font-semibold tracking-tight"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // h3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${i}`} className="mt-8 mb-3 text-xl font-semibold">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // table — collect all rows until a non-table line
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      // parse header, separator, body
      const parseRow = (row: string) =>
        row
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
      const header = parseRow(tableLines[0]);
      const bodyRows = tableLines.slice(2).map(parseRow);
      elements.push(
        <div key={`table-${i}`} className="my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse border rounded-lg">
            <thead>
              <tr className="bg-slate-50">
                {header.map((h, ci) => (
                  <th
                    key={ci}
                    className="border px-4 py-2 text-left font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // unordered list (- item)
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 ml-6 list-disc space-y-1 text-muted-foreground">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
          ))}
        </ul>
      );
      continue;
    }

    // ordered list (1. item)
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-4 ml-6 list-decimal space-y-1 text-muted-foreground">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
          ))}
        </ol>
      );
      continue;
    }

    // paragraph — collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("## ") &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("- ") &&
      !lines[i].trim().startsWith("|") &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(
        <p
          key={`p-${i}`}
          className="my-4 leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: inlineFormat(paraLines.join(" ")),
          }}
        />
      );
    }
  }

  return elements;
}

/** Handle bold (**text**) and italic (*text*) inline formatting */
function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-foreground font-medium'>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

/* ------------------------------------------------------------------ */

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const relatedGuides = GUIDES.filter((g) => guide.relatedGuides.includes(g.slug));

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
        name: "Guides",
        item: "https://sopgenius.com/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `https://sopgenius.com/guides/${guide.slug}`,
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
        className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8"
      >
        <ol className="flex items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li>
            <span className="text-muted-foreground">Guides</span>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li className="text-foreground font-medium">{guide.title}</li>
        </ol>
      </nav>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {guide.h1}
        </h1>

        <div className="mt-8">{renderMarkdown(guide.content)}</div>
      </article>

      {/* CTA */}
      <section className="border-t bg-slate-50 py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-bold">Try SOPGenius free</h2>
          <p className="mt-3 text-muted-foreground">
            Stop writing SOPs from scratch. Describe your process and get a
            professional, structured procedure in minutes.
          </p>
          <Link href="/signup" className="mt-6 inline-block">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold">Related guides</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="rounded-lg border p-4 hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm font-medium">{g.title}</span>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {g.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Templates */}
      {guide.relatedTemplates.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold">Related templates</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {guide.relatedTemplates.map((t) => (
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
        </section>
      )}

      <PublicFooter />
    </div>
  );
}
