import { Router } from "express";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-5";

export function searchRoutes() {
  const router = Router();

  router.post("/", async (req, res) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "Web search not configured. Set ANTHROPIC_API_KEY in server/.env to enable.",
      });
    }

    const { query, brand, model } = req.body || {};
    if (!query || typeof query !== "string" || !query.trim()) {
      return res.status(400).json({ error: "Empty query" });
    }

    const prompt = `Search the web for forklift diagnostic information about: ${brand || ""} ${model || ""} ${query}. Provide a concise summary of the most relevant technical findings. Focus on mechanic-relevant diagnostic info, common failures, TSBs, and repair procedures. Format your response as a JSON array of objects with "source" and "content" fields. Keep each entry concise (2-3 sentences). Return ONLY the JSON array, no markdown, no backticks.`;

    try {
      const response = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 1024,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Anthropic search error:", response.status, errText.slice(0, 500));
        return res.status(502).json({ error: "Upstream search error" });
      }

      const data = await response.json();
      const textContent = (data.content || [])
        .filter((item) => item.type === "text")
        .map((item) => item.text)
        .join("\n");

      if (!textContent) {
        return res.json({ results: [] });
      }

      let results;
      try {
        const cleaned = textContent.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        results = Array.isArray(parsed)
          ? parsed
          : [{ source: "Web Search", content: textContent }];
      } catch {
        results = [{ source: "Web Search", content: textContent }];
      }

      res.json({ results });
    } catch (err) {
      console.error("Search proxy failed:", err);
      res.status(500).json({ error: "Search failed" });
    }
  });

  return router;
}
