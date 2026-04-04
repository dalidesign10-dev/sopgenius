import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      processDescription,
      description,
      industry,
      department,
      complianceFrameworks,
      compliance,
      complexity,
      targetAudience,
      audience,
      additionalNotes,
    } = body;

    // Support both field names (processDescription from form, description from legacy)
    const desc = processDescription || description;
    const comp = complianceFrameworks || compliance;
    const aud = targetAudience || audience;

    // Basic validation
    if (!desc || typeof desc !== "string" || desc.trim().length < 10) {
      return NextResponse.json(
        { error: "Description is required and must be at least 10 characters." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are DentiSOP, an expert Standard Operating Procedure (SOP) writer. You create professional, detailed, and actionable SOPs for businesses across all industries.

When generating an SOP, always include these sections:
1. Document Header: Title, SOP Number (auto-generated), Version, Effective Date, Department, Author
2. Purpose: Why this SOP exists (2-3 sentences)
3. Scope: Who and what this SOP applies to
4. Definitions: Key terms and acronyms used
5. Responsibilities: Roles involved and their specific duties
6. Prerequisites: What's needed before starting the procedure
7. Procedure Steps: Detailed, numbered step-by-step instructions with action, responsible role, expected outcome, and notes
8. Flowchart Description: A text-based description of the process flow
9. Quality Control Checks: Verification points throughout the process
10. Compliance Notes: Relevant regulatory considerations based on industry
11. Related Documents: References to other SOPs or documents
12. Revision History: Table for tracking changes

Guidelines:
- Use clear, concise, imperative language
- Be specific with details — include exact steps
- Include decision points (if/then scenarios) where relevant
- Add safety warnings or caution notes where applicable
- Tailor terminology and compliance requirements to the specified industry

Output the SOP as a JSON object with this exact structure:
{
  "header": { "title": "", "sopNumber": "", "version": 1, "department": "", "effectiveDate": "" },
  "purpose": "",
  "scope": "",
  "definitions": [{ "term": "", "definition": "" }],
  "responsibilities": [{ "role": "", "duties": [""] }],
  "prerequisites": [""],
  "steps": [{ "number": 1, "action": "", "role": "", "outcome": "", "notes": "" }],
  "flowchartDescription": "",
  "qualityChecks": [""],
  "complianceNotes": [""],
  "relatedDocuments": [""],
  "revisionHistory": [{ "version": 1, "date": "", "author": "DentiSOP", "changes": "Initial creation" }]
}

IMPORTANT: Return ONLY the JSON object, no markdown code fences, no additional text.`;

    const userPrompt = `Generate a comprehensive SOP for the following:
Process: ${desc}
Industry: ${industry}
Department: ${department}
Compliance Requirements: ${Array.isArray(comp) && comp.length > 0 ? comp.join(", ") : "None specified"}
Complexity Level: ${complexity}
Target Audience: ${aud}
${additionalNotes ? `Additional context: ${additionalNotes}` : ""}`;

    const message = await getAnthropic().messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    let sopData;
    try {
      sopData = JSON.parse(responseText);
    } catch {
      // Try to extract JSON from the response using regex
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        sopData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse SOP response as JSON.");
      }
    }

    // Generate a simple ID for the SOP
    const sopId = `sop-${Date.now()}`;

    return NextResponse.json({ content: sopData, id: sopId });
  } catch (error) {
    console.error("SOP generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate SOP." },
      { status: 500 }
    );
  }
}
