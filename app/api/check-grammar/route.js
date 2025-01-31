import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { text } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          role: "user",
          content: `Check the following text for spelling errors and return the text with misspelled words wrapped in <misspelled> tags:\n\n${text}`,
        },
      ],
    });

    const checkedText = completion.choices[0].message.content;

    return new Response(JSON.stringify({ checkedText }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error checking grammar:", error);
    return new Response(JSON.stringify({ error: "Failed to check grammar" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
