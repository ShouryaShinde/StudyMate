import { generateNotes } from "../services/OllamaService.js";

export async function generateNotesController(req, res) {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Study material is required.",
      });
    }

    const result = await generateNotes(text);

    res.status(200).json(result);
  } catch (error) {
    console.error("Notes generation error:", error);

    res.status(500).json({
      message: "Failed to generate notes.",
    });
  }
}