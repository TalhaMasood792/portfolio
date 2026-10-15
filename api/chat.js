// Vercel serverless function: POST /api/chat
// Works with any OpenAI-compatible provider (OpenAI, Groq, Gemini, OpenRouter...).
// Set AI_API_KEY, AI_BASE_URL and AI_MODEL in Vercel > Project > Settings > Environment Variables.
// Optional: without a key, the site answers from your project data in the browser instead.
import { profile, buildKnowledge } from "../data/profile.js";

const hits = new Map();
const LIMIT = 20;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) { entry.count = 0; entry.start = now; }
  entry.count += 1;
  hits.set(ip, entry);
  return entry.count > LIMIT;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Send a POST request." });
  if (!process.env.AI_API_KEY) return res.status(503).json({ error: "AI is not configured on this deployment." });

  const ip = (req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) return res.status(429).json({ error: "Too many questions. Try again in a few minutes." });

  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : null;
  if (!incoming?.length) return res.status(400).json({ error: "Include a messages array." });

  const messages = incoming.slice(-10).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 1000),
  }));

  const system = `You are the assistant on ${profile.name}'s portfolio website. Visitors are usually recruiters, clients or other developers.
Answer questions about ${profile.name}'s skills, projects and experience using ONLY the facts below, in the third person.
If something isn't covered, say you don't know and suggest emailing ${profile.email}.
Keep answers to 2-4 sentences of plain text. Mention project links when relevant.
Politely decline unrelated requests and steer back to the portfolio.

FACTS:
${buildKnowledge()}`;

  const baseUrl = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  try {
    const r = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.AI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "gpt-4o-mini",
        messages: [{ role: "system", content: system }, ...messages],
        max_tokens: 350,
        temperature: 0.4,
      }),
    });
    if (!r.ok) {
      console.error("AI provider error", r.status, await r.text());
      return res.status(502).json({ error: "The AI provider returned an error." });
    }
    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) return res.status(502).json({ error: "The AI provider sent an empty reply." });
    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not reach the AI provider." });
  }
}
