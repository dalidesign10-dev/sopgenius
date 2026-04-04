import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Edit,
  Copy,
  FileText,
  Shield,
  Clock,
  User,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { SOP, SOPContent } from "@/types";

export const metadata: Metadata = {
  title: "View SOP — DentiSOP",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function daysSince(dateStr: string) {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
}

export default async function SOPViewerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: sop } = await supabase
    .from("sops")
    .select("*")
    .eq("id", id)
    .single();

  if (!sop) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
        <div className="rounded-full bg-muted p-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">SOP not found</h2>
        <p className="text-muted-foreground">
          The SOP you&apos;re looking for doesn&apos;t exist or has been deleted.
        </p>
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  const typedSop = sop as unknown as SOP;
  const content: SOPContent | null =
    typeof typedSop.content === "string"
      ? JSON.parse(typedSop.content)
      : typedSop.content;

  const days = daysSince(typedSop.updated_at);
  const needsReview = days > 365;
  const reviewSoon = days > 300;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Back button */}
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Header row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">{typedSop.title}</h1>
          <Badge variant={typedSop.status === "published" ? "default" : "secondary"}>
            {typedSop.status}
          </Badge>
          {needsReview && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />Review Overdue
            </Badge>
          )}
          {!needsReview && reviewSoon && (
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 gap-1">
              <Clock className="h-3 w-3" />Review Soon
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href={`/dashboard/sop/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />Export
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />Duplicate
          </Button>
        </div>
      </div>

      {/* Metadata bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
        <div><span className="font-medium text-foreground">Industry:</span> {typedSop.industry}</div>
        {typedSop.department && <div><span className="font-medium text-foreground">Department:</span> {typedSop.department}</div>}
        <div><span className="font-medium text-foreground">Version:</span> {typedSop.version}</div>
        <div><span className="font-medium text-foreground">Last Updated:</span> {formatDate(typedSop.updated_at)}</div>
        <div><span className="font-medium text-foreground">Created:</span> {formatDate(typedSop.created_at)}</div>
        {needsReview && (
          <div className="text-red-600 font-semibold">⚠ Annual review overdue ({days} days since last update)</div>
        )}
      </div>

      {/* Review alert */}
      {needsReview && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-700">
            This SOP hasn&apos;t been reviewed in over a year. OSHA and HIPAA require annual reviews of compliance-related procedures.
          </p>
          <Button size="sm" variant="outline" className="ml-auto shrink-0 border-red-200 text-red-700 hover:bg-red-100" asChild>
            <Link href={`/dashboard/sop/${id}/edit`}>Review & Update</Link>
          </Button>
        </div>
      )}

      {/* SOP Content */}
      {content ? (
        <Card>
          <CardContent className="py-6 space-y-8">
            {/* Header */}
            {content.header && (
              <div className="border-b pb-4">
                <h2 className="text-xl font-bold">{content.header.title}</h2>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {content.header.sopNumber && <span>SOP: {content.header.sopNumber}</span>}
                  {content.header.department && <span>· {content.header.department}</span>}
                  {content.header.effectiveDate && <span>· Effective: {content.header.effectiveDate}</span>}
                </div>
              </div>
            )}

            {/* Purpose */}
            {content.purpose && (
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Purpose</h3>
                <p className="text-sm leading-relaxed">{content.purpose}</p>
              </div>
            )}

            {/* Scope */}
            {content.scope && (
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Scope</h3>
                <p className="text-sm leading-relaxed">{content.scope}</p>
              </div>
            )}

            {/* Definitions */}
            {content.definitions?.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Definitions</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {content.definitions.map((d) => (
                    <div key={d.term} className="rounded-lg border bg-muted/30 p-3">
                      <p className="text-sm font-semibold">{d.term}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{d.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Responsibilities */}
            {content.responsibilities?.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Responsibilities</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {content.responsibilities.map((r) => (
                    <div key={r.role} className="rounded-lg border p-3">
                      <p className="text-sm font-semibold flex items-center gap-2"><User className="h-3.5 w-3.5" />{r.role}</p>
                      <ul className="mt-2 space-y-1">
                        {r.duties.map((d, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <CheckCircle className="h-3 w-3 mt-0.5 shrink-0 text-emerald-500" />{d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {content.prerequisites?.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Prerequisites</h3>
                <ul className="space-y-1.5">
                  {content.prerequisites.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-primary" />{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps */}
            {content.steps?.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Procedure Steps</h3>
                <div className="space-y-4">
                  {content.steps.map((s) => (
                    <div key={s.number} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {s.number}
                      </span>
                      <div className="pt-1 flex-1">
                        <p className="text-sm leading-relaxed">{s.action}</p>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {s.role && <span className="text-xs text-muted-foreground">👤 {s.role}</span>}
                          {s.outcome && <span className="text-xs text-muted-foreground">✓ {s.outcome}</span>}
                        </div>
                        {s.notes && (
                          <p className="mt-1 text-xs italic text-amber-600">⚠ {s.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Checks */}
            {content.qualityChecks?.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Quality Checks</h3>
                <ul className="space-y-1.5">
                  {content.qualityChecks.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm"><Shield className="h-4 w-4 mt-0.5 shrink-0 text-primary" />{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Compliance Notes */}
            {content.complianceNotes?.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Compliance References</h3>
                <ul className="space-y-1.5">
                  {content.complianceNotes.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><Shield className="h-4 w-4 mt-0.5 shrink-0 text-primary" />{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Revision History */}
            {content.revisionHistory?.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Revision History</h3>
                <div className="space-y-2">
                  {content.revisionHistory.map((r) => (
                    <div key={r.version} className="flex items-center gap-4 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">v{r.version}</Badge>
                      <span>{r.date}</span>
                      <span>{r.author}</span>
                      <span className="flex-1">{r.changes}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="border-t pt-4">
              <p className="text-xs italic text-muted-foreground">
                Generated by DentiSOP. All content should be reviewed by a qualified compliance officer before implementation.
                Do not include patient names, health records, or other protected health information.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Fallback: render markdown */
        <Card>
          <CardContent className="py-6">
            <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap">
              {typedSop.markdown_content}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
