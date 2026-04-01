import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
} from "docx";
import {
  SOPContent,
  SOPStep,
  SOPResponsibility,
  SOPRevision,
} from "@/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sopToMarkdown(content: SOPContent): string {
  const { header } = content;
  const lines: string[] = [];

  lines.push(`# ${header.title}`);
  lines.push("");
  lines.push(`**SOP Number:** ${header.sopNumber}`);
  lines.push(`**Version:** ${header.version}`);
  lines.push(`**Department:** ${header.department}`);
  lines.push(`**Effective Date:** ${header.effectiveDate}`);
  lines.push("");

  // Purpose
  lines.push("## 1. Purpose");
  lines.push("");
  lines.push(content.purpose);
  lines.push("");

  // Scope
  lines.push("## 2. Scope");
  lines.push("");
  lines.push(content.scope);
  lines.push("");

  // Definitions
  if (content.definitions.length > 0) {
    lines.push("## 3. Definitions");
    lines.push("");
    content.definitions.forEach((d) => {
      lines.push(`- **${d.term}:** ${d.definition}`);
    });
    lines.push("");
  }

  // Responsibilities
  if (content.responsibilities.length > 0) {
    lines.push("## 4. Responsibilities");
    lines.push("");
    lines.push("| Role | Duties |");
    lines.push("|------|--------|");
    content.responsibilities.forEach((r) => {
      lines.push(`| ${r.role} | ${r.duties.join("; ")} |`);
    });
    lines.push("");
  }

  // Prerequisites
  if (content.prerequisites.length > 0) {
    lines.push("## 5. Prerequisites");
    lines.push("");
    content.prerequisites.forEach((p, i) => {
      lines.push(`${i + 1}. ${p}`);
    });
    lines.push("");
  }

  // Procedure Steps
  if (content.steps.length > 0) {
    lines.push("## 6. Procedure");
    lines.push("");
    lines.push("| Step | Action | Role | Expected Outcome | Notes |");
    lines.push("|------|--------|------|-------------------|-------|");
    content.steps.forEach((s) => {
      lines.push(
        `| ${s.number} | ${s.action} | ${s.role} | ${s.outcome} | ${s.notes} |`
      );
    });
    lines.push("");
  }

  // Flowchart Description
  if (content.flowchartDescription) {
    lines.push("## 7. Flowchart");
    lines.push("");
    lines.push(content.flowchartDescription);
    lines.push("");
  }

  // Quality Checks
  if (content.qualityChecks.length > 0) {
    lines.push("## 8. Quality Checks");
    lines.push("");
    content.qualityChecks.forEach((q, i) => {
      lines.push(`${i + 1}. ${q}`);
    });
    lines.push("");
  }

  // Compliance Notes
  if (content.complianceNotes.length > 0) {
    lines.push("## 9. Compliance Notes");
    lines.push("");
    content.complianceNotes.forEach((c) => {
      lines.push(`- ${c}`);
    });
    lines.push("");
  }

  // Related Documents
  if (content.relatedDocuments.length > 0) {
    lines.push("## 10. Related Documents");
    lines.push("");
    content.relatedDocuments.forEach((d) => {
      lines.push(`- ${d}`);
    });
    lines.push("");
  }

  // Revision History
  if (content.revisionHistory.length > 0) {
    lines.push("## 11. Revision History");
    lines.push("");
    lines.push("| Version | Date | Author | Changes |");
    lines.push("|---------|------|--------|---------|");
    content.revisionHistory.forEach((r) => {
      lines.push(`| ${r.version} | ${r.date} | ${r.author} | ${r.changes} |`);
    });
    lines.push("");
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// PDF generation
// ---------------------------------------------------------------------------

function generatePDF(content: SOPContent): ArrayBuffer {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const usableWidth = pageWidth - margin * 2;
  let y = margin;

  const addPageNumber = () => {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, {
        align: "center",
      });
    }
  };

  const checkPageBreak = (needed: number) => {
    if (y + needed > pageHeight - 20) {
      doc.addPage();
      y = margin;
    }
  };

  const addHeading = (text: string, size: number) => {
    checkPageBreak(size + 4);
    doc.setFontSize(size);
    doc.setFont("helvetica", "bold");
    doc.text(text, margin, y);
    y += size * 0.5 + 4;
  };

  const addBody = (text: string) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, usableWidth);
    lines.forEach((line: string) => {
      checkPageBreak(6);
      doc.text(line, margin, y);
      y += 5;
    });
    y += 3;
  };

  const addSimpleTable = (
    headers: string[],
    rows: string[][],
    colWidths: number[]
  ) => {
    const rowH = 7;
    // header
    checkPageBreak(rowH * 2);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    let x = margin;
    headers.forEach((h, i) => {
      doc.text(h, x + 1, y + 5);
      doc.rect(x, y, colWidths[i], rowH);
      x += colWidths[i];
    });
    y += rowH;
    // rows
    doc.setFont("helvetica", "normal");
    rows.forEach((row) => {
      checkPageBreak(rowH);
      x = margin;
      row.forEach((cell, i) => {
        const cellLines = doc.splitTextToSize(cell, colWidths[i] - 2);
        doc.text(cellLines[0] || "", x + 1, y + 5);
        doc.rect(x, y, colWidths[i], rowH);
        x += colWidths[i];
      });
      y += rowH;
    });
    y += 4;
  };

  // --- Title Page ---
  const { header } = content;
  y = 60;
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text(header.title, pageWidth / 2, y, { align: "center" });
  y += 20;
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(`SOP Number: ${header.sopNumber}`, pageWidth / 2, y, {
    align: "center",
  });
  y += 10;
  doc.text(`Version: ${header.version}`, pageWidth / 2, y, {
    align: "center",
  });
  y += 10;
  doc.text(`Department: ${header.department}`, pageWidth / 2, y, {
    align: "center",
  });
  y += 10;
  doc.text(`Effective Date: ${header.effectiveDate}`, pageWidth / 2, y, {
    align: "center",
  });

  // --- Table of Contents ---
  doc.addPage();
  y = margin;
  addHeading("Table of Contents", 18);
  y += 4;
  const tocItems = [
    "1. Purpose",
    "2. Scope",
    "3. Definitions",
    "4. Responsibilities",
    "5. Prerequisites",
    "6. Procedure",
    "7. Flowchart",
    "8. Quality Checks",
    "9. Compliance Notes",
    "10. Related Documents",
    "11. Revision History",
  ];
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  tocItems.forEach((item) => {
    doc.text(item, margin + 5, y);
    y += 7;
  });

  // --- Content pages ---
  doc.addPage();
  y = margin;

  addHeading("1. Purpose", 14);
  addBody(content.purpose);

  addHeading("2. Scope", 14);
  addBody(content.scope);

  if (content.definitions.length > 0) {
    addHeading("3. Definitions", 14);
    content.definitions.forEach((d) => {
      addBody(`${d.term} - ${d.definition}`);
    });
  }

  if (content.responsibilities.length > 0) {
    addHeading("4. Responsibilities", 14);
    const colW = [usableWidth * 0.3, usableWidth * 0.7];
    addSimpleTable(
      ["Role", "Duties"],
      content.responsibilities.map((r: SOPResponsibility) => [
        r.role,
        r.duties.join("; "),
      ]),
      colW
    );
  }

  if (content.prerequisites.length > 0) {
    addHeading("5. Prerequisites", 14);
    content.prerequisites.forEach((p, i) => {
      addBody(`${i + 1}. ${p}`);
    });
  }

  if (content.steps.length > 0) {
    addHeading("6. Procedure", 14);
    const stepColW = [
      usableWidth * 0.08,
      usableWidth * 0.3,
      usableWidth * 0.15,
      usableWidth * 0.27,
      usableWidth * 0.2,
    ];
    addSimpleTable(
      ["Step", "Action", "Role", "Outcome", "Notes"],
      content.steps.map((s: SOPStep) => [
        String(s.number),
        s.action,
        s.role,
        s.outcome,
        s.notes,
      ]),
      stepColW
    );
  }

  if (content.flowchartDescription) {
    addHeading("7. Flowchart", 14);
    addBody(content.flowchartDescription);
  }

  if (content.qualityChecks.length > 0) {
    addHeading("8. Quality Checks", 14);
    content.qualityChecks.forEach((q, i) => {
      addBody(`${i + 1}. ${q}`);
    });
  }

  if (content.complianceNotes.length > 0) {
    addHeading("9. Compliance Notes", 14);
    content.complianceNotes.forEach((c) => {
      addBody(`- ${c}`);
    });
  }

  if (content.relatedDocuments.length > 0) {
    addHeading("10. Related Documents", 14);
    content.relatedDocuments.forEach((d) => {
      addBody(`- ${d}`);
    });
  }

  if (content.revisionHistory.length > 0) {
    addHeading("11. Revision History", 14);
    const revColW = [
      usableWidth * 0.15,
      usableWidth * 0.2,
      usableWidth * 0.25,
      usableWidth * 0.4,
    ];
    addSimpleTable(
      ["Version", "Date", "Author", "Changes"],
      content.revisionHistory.map((r: SOPRevision) => [
        String(r.version),
        r.date,
        r.author,
        r.changes,
      ]),
      revColW
    );
  }

  addPageNumber();
  return doc.output("arraybuffer");
}

// ---------------------------------------------------------------------------
// DOCX generation
// ---------------------------------------------------------------------------

async function generateDOCX(content: SOPContent): Promise<Buffer> {
  const { header } = content;

  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 1 },
    bottom: { style: BorderStyle.SINGLE, size: 1 },
    left: { style: BorderStyle.SINGLE, size: 1 },
    right: { style: BorderStyle.SINGLE, size: 1 },
  };

  const makeCell = (text: string, bold = false) =>
    new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text, bold, size: 20 })],
        }),
      ],
      borders: tableBorder,
    });

  const sections: Paragraph[] = [];

  // Title page content
  sections.push(
    new Paragraph({
      text: header.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `SOP Number: ${header.sopNumber}`, size: 24 })],
      spacing: { after: 200 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Version: ${header.version}`, size: 24 })],
      spacing: { after: 200 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Department: ${header.department}`, size: 24 })],
      spacing: { after: 200 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `Effective Date: ${header.effectiveDate}`, size: 24 }),
      ],
      spacing: { after: 600 },
    })
  );

  // Purpose
  sections.push(
    new Paragraph({ text: "1. Purpose", heading: HeadingLevel.HEADING_1 }),
    new Paragraph({ text: content.purpose, spacing: { after: 200 } })
  );

  // Scope
  sections.push(
    new Paragraph({ text: "2. Scope", heading: HeadingLevel.HEADING_1 }),
    new Paragraph({ text: content.scope, spacing: { after: 200 } })
  );

  // Definitions
  if (content.definitions.length > 0) {
    sections.push(
      new Paragraph({ text: "3. Definitions", heading: HeadingLevel.HEADING_1 })
    );
    content.definitions.forEach((d) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${d.term}: `, bold: true }),
            new TextRun({ text: d.definition }),
          ],
          spacing: { after: 100 },
        })
      );
    });
  }

  // Responsibilities table
  if (content.responsibilities.length > 0) {
    sections.push(
      new Paragraph({
        text: "4. Responsibilities",
        heading: HeadingLevel.HEADING_1,
      })
    );
    const respTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [makeCell("Role", true), makeCell("Duties", true)],
        }),
        ...content.responsibilities.map(
          (r) =>
            new TableRow({
              children: [makeCell(r.role), makeCell(r.duties.join("; "))],
            })
        ),
      ],
    });
    sections.push(respTable as unknown as Paragraph);
    sections.push(new Paragraph({ text: "", spacing: { after: 200 } }));
  }

  // Prerequisites
  if (content.prerequisites.length > 0) {
    sections.push(
      new Paragraph({ text: "5. Prerequisites", heading: HeadingLevel.HEADING_1 })
    );
    content.prerequisites.forEach((p, i) => {
      sections.push(new Paragraph({ text: `${i + 1}. ${p}`, spacing: { after: 100 } }));
    });
  }

  // Procedure steps table
  if (content.steps.length > 0) {
    sections.push(
      new Paragraph({ text: "6. Procedure", heading: HeadingLevel.HEADING_1 })
    );
    const stepsTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell("Step", true),
            makeCell("Action", true),
            makeCell("Role", true),
            makeCell("Outcome", true),
            makeCell("Notes", true),
          ],
        }),
        ...content.steps.map(
          (s) =>
            new TableRow({
              children: [
                makeCell(String(s.number)),
                makeCell(s.action),
                makeCell(s.role),
                makeCell(s.outcome),
                makeCell(s.notes),
              ],
            })
        ),
      ],
    });
    sections.push(stepsTable as unknown as Paragraph);
    sections.push(new Paragraph({ text: "", spacing: { after: 200 } }));
  }

  // Flowchart
  if (content.flowchartDescription) {
    sections.push(
      new Paragraph({ text: "7. Flowchart", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: content.flowchartDescription, spacing: { after: 200 } })
    );
  }

  // Quality Checks
  if (content.qualityChecks.length > 0) {
    sections.push(
      new Paragraph({ text: "8. Quality Checks", heading: HeadingLevel.HEADING_1 })
    );
    content.qualityChecks.forEach((q, i) => {
      sections.push(new Paragraph({ text: `${i + 1}. ${q}`, spacing: { after: 100 } }));
    });
  }

  // Compliance Notes
  if (content.complianceNotes.length > 0) {
    sections.push(
      new Paragraph({ text: "9. Compliance Notes", heading: HeadingLevel.HEADING_1 })
    );
    content.complianceNotes.forEach((c) => {
      sections.push(new Paragraph({ text: `- ${c}`, spacing: { after: 100 } }));
    });
  }

  // Related Documents
  if (content.relatedDocuments.length > 0) {
    sections.push(
      new Paragraph({
        text: "10. Related Documents",
        heading: HeadingLevel.HEADING_1,
      })
    );
    content.relatedDocuments.forEach((d) => {
      sections.push(new Paragraph({ text: `- ${d}`, spacing: { after: 100 } }));
    });
  }

  // Revision History table
  if (content.revisionHistory.length > 0) {
    sections.push(
      new Paragraph({
        text: "11. Revision History",
        heading: HeadingLevel.HEADING_1,
      })
    );
    const revTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell("Version", true),
            makeCell("Date", true),
            makeCell("Author", true),
            makeCell("Changes", true),
          ],
        }),
        ...content.revisionHistory.map(
          (r) =>
            new TableRow({
              children: [
                makeCell(String(r.version)),
                makeCell(r.date),
                makeCell(r.author),
                makeCell(r.changes),
              ],
            })
        ),
      ],
    });
    sections.push(revTable as unknown as Paragraph);
  }

  const doc = new Document({
    sections: [
      {
        children: sections as (Paragraph | Table)[],
      },
    ],
  });

  return Buffer.from(await Packer.toBuffer(doc));
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ format: string }> }
) {
  try {
    const { format } = await params;
    const body = await request.json();
    const content: SOPContent = body.content;

    if (!content || !content.header) {
      return NextResponse.json(
        { error: "Invalid SOP content provided" },
        { status: 400 }
      );
    }

    const filename = `${content.header.sopNumber || "SOP"}-v${content.header.version}`;

    switch (format) {
      case "md": {
        const markdown = sopToMarkdown(content);
        return new NextResponse(markdown, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown",
            "Content-Disposition": `attachment; filename="${filename}.md"`,
          },
        });
      }

      case "pdf": {
        const pdfBuffer = generatePDF(content);
        return new NextResponse(pdfBuffer, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${filename}.pdf"`,
          },
        });
      }

      case "docx": {
        const docxBuffer = await generateDOCX(content);
        const uint8 = new Uint8Array(docxBuffer);
        return new NextResponse(uint8, {
          status: 200,
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "Content-Disposition": `attachment; filename="${filename}.docx"`,
          },
        });
      }

      default:
        return NextResponse.json(
          { error: `Unsupported export format: ${format}. Use "pdf", "docx", or "md".` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export SOP" },
      { status: 500 }
    );
  }
}
