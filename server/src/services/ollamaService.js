import ollama from "ollama";

export async function generateNotes(text) {
  const response = await ollama.chat({
    model: "llama3.2:3b",
    messages: [
      {
        role: "system",
        content: `
You are StudyMate, an AI study assistant.

Analyze the study material provided by the user.

Generate:
1. A concise summary.
2. Important key points.
3. 5 multiple-choice quiz questions.

Rules:
- Use only information from the supplied study material.
- Keep the summary clear and easy to understand.
- Extract the most important concepts.
- Each quiz question must have exactly 4 options.
- Each question must have exactly one correct answer.
- Do not invent facts.
- Return ONLY valid JSON.
        `,
      },
      {
        role: "user",
        content: text,
      },
    ],
    format: {
      type: "object",
      properties: {
        summary: {
          type: "string",
        },
        keyPoints: {
          type: "array",
          items: {
            type: "string",
          },
        },
        quiz: {
          type: "array",
          items: {
            type: "object",
            properties: {
              question: {
                type: "string",
              },
              options: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              correctAnswer: {
                type: "string",
              },
            },
          },
        },
      },
    },
  });

  return JSON.parse(response.message.content);
}