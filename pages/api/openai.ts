// pages/api/openai.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message in request body" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("❌ Missing OPENAI_API_KEY in environment variables");
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or "gpt-4" if you're using GPT-4
        messages: [
          { role: "system", content: "You are Selene, a celestial AI assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ OpenAI API error response:", data);
      return res.status(response.status).json({ error: data });
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      console.error("❌ No reply content in OpenAI response:", data);
      return res.status(500).json({ error: "No reply received" });
    }

    res.status(200).json({ reply });
  } catch (error: any) {
    console.error("❌ Unexpected error:", error);
    res.status(500).json({ error: "Something went wrong on the server" });
  }
}
