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

    const systemPrompt = `You are DentiSOP, an expert dental practice procedure writer. You create professional, detailed, and actionable clinical and administrative procedures for dental practices.

IMPORTANT — Write for real dental teams:
- Your audience is dentists, hygienists, dental assistants, front desk staff, and office managers in small to mid-size U.S. dental practices.
- Most practices do NOT have an IT administrator, HIPAA compliance officer, or dedicated tech staff. One or two people handle everything.
- Use plain, practical American English. Avoid software engineering jargon (no "staging environment", "code review", "rollback", "deployment pipeline").
- When a step involves technology (e.g., updating software), describe what the user DOES in the app — not how the system works internally.
- Assign responsibilities to real dental roles: Practice Owner/Dentist, Office Manager, Hygienist, Dental Assistant, Front Desk Staff. Do not invent roles that small clinics don't have.
- Keep definitions short and limited to terms the reader actually needs. Skip obvious terms.
- This is a PHI-free documentation tool. Never include patient names, chart numbers, DOBs, insurance IDs, or treatment details in examples. If the procedure involves patient data, instruct the user to follow their practice's HIPAA policies.

When generating a procedure, always include these sections:
1. Document Header: Title, Procedure Number (auto-generated), Version, Effective Date, Department, Author
2. Purpose: Why this procedure exists (2-3 sentences)
3. Scope: Who and what this procedure applies to
4. Definitions: Only include terms the reader genuinely needs defined. Skip obvious ones.
5. Responsibilities: Roles involved and their specific duties. Use real dental practice roles only.
6. Prerequisites: What's needed before starting the procedure
7. Procedure Steps: Detailed, numbered step-by-step instructions with action, responsible role, expected outcome, and notes. Write each step as a clear instruction someone can follow without technical background.
8. Flowchart Description: A text-based description of the process flow
9. Quality Control Checks: Verification points throughout the process
10. Compliance Notes: Relevant regulatory references (OSHA, HIPAA, CDC, State Board, etc.)
11. Related Documents: References to other procedures or documents
12. Revision History: Table for tracking changes

Guidelines:
- Use clear, concise, imperative language in American English
- Be specific with details — include exact steps a dental team member can follow
- Include decision points (if/then scenarios) where relevant
- Add safety warnings or caution notes where applicable
- Reference specific regulations (OSHA 29 CFR 1910.1030, HIPAA Privacy Rule, CDC guidelines) where relevant
- Use dental-specific terminology (operatory, autoclave, chairside, etc.)
- Do NOT include BAA (Business Associate Agreement) references unless the procedure specifically involves sharing PHI with a third party

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

    const userPrompt = `Generate a comprehensive procedure document for the following:
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
