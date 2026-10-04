import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Input } from "@workspace/ui/components/input";

export default function uploadNotes() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleTextSubmit = () => {
    if (!text.trim()) return;

    console.log("Generate notes from text:", text);
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
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">

          {/* Text */}
          <Card>
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

          {/* PDF */}
          <Card>
            <CardHeader>
              <CardTitle>Upload PDF</CardTitle>
            </CardHeader>

            <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-5">

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl">
                  📄
                </div>

                <h3 className="font-medium">
                  Upload your study material
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  PDF files up to 10MB
                </p>
              </div>

              <Input
                type="file"
                accept=".pdf,application/pdf"
                className="cursor-pointer"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                }}
              />

              {file && (
                <p className="text-sm text-muted-foreground">
                  Selected: <span className="font-medium">{file.name}</span>
                </p>
              )}

              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleFileSubmit}
                disabled={!file}
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