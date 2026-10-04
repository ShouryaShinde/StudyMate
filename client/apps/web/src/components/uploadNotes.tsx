import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Input } from "@workspace/ui/components/input";

export default function uploadNotes() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleTextSubmit = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/notes/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate notes");
      }

      navigate("/notes", {
        state: {
          result: data,
        },
      });
    } catch (error) {
      console.error("Error generating notes:", error);
    }
  };

  const handleFileSubmit = () => {
    if (!file) return;

    console.log("Generate notes from PDF:", file);
  };

  return (
    <main className="bg-background">
      <div className="container mx-auto px-6 py-16 bg-white">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black">
            Turn your study material into notes
          </h1>

          <p className="mt-3 text-lg text-bold text-gray-700">
            Enter your content or upload a PDF and let StudyMate
            generate concise study notes for you.
          </p>
        </div>

        {/* Options */}
        <div className="flex justify-center">
  <Card className="w-full max-w-2xl">
    <CardHeader>
      <CardTitle>Enter Text</CardTitle>
    </CardHeader>

    <CardContent className="space-y-4">
      <Textarea
                placeholder="Paste or type your study material here..."
                className="min-h-[260px] resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleTextSubmit}
                disabled={!text.trim()}
              >
                Generate Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}