// Answers a student's doubt about one concept, grounded in that concept's own material.
//
// Needs ANTHROPIC_API_KEY in .env.local. Without it the route returns
// { configured: false } and the chat falls back to an answer composed from the
// concept data, so the flow still demos.

const ENDPOINT = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

function systemPrompt({ classId, subject, concept, lang }) {
  return [
    `You are a study helper inside a learning app for Tamil Nadu state board students.`,
    `The student is in class ${classId ?? "?"}, studying ${subject ?? "?"}.`,
    ``,
    `They are on this concept:`,
    `Name: ${concept.name}`,
    `Meaning: ${concept.summary}`,
    `Rule to remember: ${concept.formula}`,
    `Worked steps: ${concept.steps.join(" / ")}`,
    ``,
    `Rules you must follow:`,
    `1. Answer only about this concept. If the question is about something else, say so in one line and tell them to open that concept instead.`,
    `2. Never give the final answer to a sum or a homework question. Give the next step only, and ask them to try it.`,
    `3. Keep it under 60 words. Short sentences. A 12 year old must understand it.`,
    `4. Use the wording of the material above rather than a different method, so it matches what their teacher taught.`,
    `5. If you are not sure, say so and tell them to ask their teacher.`,
    lang === "ta"
      ? `6. Reply in simple spoken Tamil. Keep technical terms in both Tamil and English.`
      : `6. Reply in simple English.`,
  ].join("\n");
}

export async function POST(request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json({ configured: false });

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ configured: true, error: "Bad body" }, { status: 400 });
  }

  const { question, concept, classId, subject, lang, history = [] } = body;
  if (!question?.trim() || !concept?.name) {
    return Response.json({ configured: true, error: "Missing question" }, { status: 400 });
  }

  const messages = [
    ...history.slice(-6).map((m) => ({ role: m.role, content: m.text })),
    { role: "user", content: question },
  ];

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 300,
        system: systemPrompt({ classId, subject, concept, lang }),
        messages,
      }),
    });

    if (!res.ok) {
      return Response.json(
        { configured: true, error: `Model returned ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const answer = (data.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return Response.json({ configured: true, answer });
  } catch {
    return Response.json({ configured: true, error: "Request failed" }, { status: 502 });
  }
}
