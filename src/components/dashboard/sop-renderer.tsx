"use client";

import { SOPContent } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, FileText } from "lucide-react";

interface SOPRendererProps {
  content: SOPContent;
}

export function SOPRenderer({ content }: SOPRendererProps) {
  const { header } = content;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{header.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              SOP #{header.sopNumber}
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            v{header.version}
          </Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>
            <strong>Department:</strong> {header.department}
          </span>
          <span>
            <strong>Effective Date:</strong> {header.effectiveDate}
          </span>
        </div>
      </div>

      {/* Purpose */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Purpose</h2>
        <p className="text-muted-foreground leading-relaxed">{content.purpose}</p>
      </section>

      {/* Scope */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Scope</h2>
        <p className="text-muted-foreground leading-relaxed">{content.scope}</p>
      </section>

      {/* Definitions */}
      {content.definitions.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Definitions</h2>
          <dl className="space-y-2">
            {content.definitions.map((def, i) => (
              <div key={i} className="rounded-lg bg-muted/50 px-4 py-3">
                <dt className="font-medium">{def.term}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {def.definition}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Responsibilities */}
      {content.responsibilities.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Responsibilities</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Role</th>
                  <th className="px-4 py-3 text-left font-medium">Duties</th>
                </tr>
              </thead>
              <tbody>
                {content.responsibilities.map((resp, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium whitespace-nowrap align-top">
                      {resp.role}
                    </td>
                    <td className="px-4 py-3">
                      <ul className="list-disc pl-4 space-y-1">
                        {resp.duties.map((duty, j) => (
                          <li key={j} className="text-muted-foreground">
                            {duty}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Prerequisites */}
      {content.prerequisites.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Prerequisites</h2>
          <ul className="space-y-2">
            {content.prerequisites.map((prereq, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{prereq}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Steps */}
      {content.steps.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">Procedure Steps</h2>
          <div className="space-y-4">
            {content.steps.map((step) => (
              <Card key={step.number}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {step.number}
                    </span>
                    <h3 className="font-medium leading-snug">{step.action}</h3>
                    <Badge variant="secondary" className="ml-auto shrink-0">
                      {step.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Expected Outcome:</strong>{" "}
                    {step.outcome}
                  </p>
                  {step.notes && (
                    <p>
                      <strong className="text-foreground">Notes:</strong>{" "}
                      {step.notes}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Quality Checks */}
      {content.qualityChecks.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Quality Checks</h2>
          <ul className="space-y-2">
            {content.qualityChecks.map((check, i) => (
              <li key={i} className="flex items-start gap-2">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{check}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Compliance Notes */}
      {content.complianceNotes.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Compliance Notes</h2>
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
            <ul className="space-y-2">
              {content.complianceNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-yellow-600">!</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Related Documents */}
      {content.relatedDocuments.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Related Documents</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {content.relatedDocuments.map((doc, i) => (
              <li key={i}>{doc}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Revision History */}
      {content.revisionHistory.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Revision History</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Version</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Author</th>
                  <th className="px-4 py-3 text-left font-medium">Changes</th>
                </tr>
              </thead>
              <tbody>
                {content.revisionHistory.map((rev, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="px-4 py-3">v{rev.version}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{rev.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{rev.author}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {rev.changes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
