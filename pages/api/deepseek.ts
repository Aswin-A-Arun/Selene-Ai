// pages/api/deepseek.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message in request body" });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    console.error("❌ Missing DEEPSEEK_API_KEY in .env.local");
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are Selene, a celestial AI assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ DeepSeek API error response:", data);
      return res.status(response.status).json({ error: data });
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      console.error("❌ No reply content in DeepSeek response:", data);
      return res.status(500).json({ error: "No reply received" });
    }

    res.status(200).json({ reply });
  } catch (error: any) {
    console.error("❌ Unexpected error:", error);
    res.status(500).json({ error: "Something went wrong on the server" });
  }
}
