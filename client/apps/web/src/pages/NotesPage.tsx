import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import Header from "../components/header";

interface NotesResult {
  summary: string;
  keyPoints: string[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export default function NotesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result as NotesResult | undefined;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Notes Available</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4 text-gray-600">
              Generate notes first to view them here.
            </p>

            <Button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="mb-8">
          <h2 className="text-4xl font-bold">
            Your Notes
          </h2>

          <p className="mt-2 text-gray-600">
            AI-generated study material based on your input.
          </p>
        </div>

        {/* Summary */}
        <Card className="mb-6 border-gray-800 bg-[#171717] text-white">
          <CardHeader>
            <CardTitle className="text-2xl">
              Summary
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-8 border-gray-800 bg-[#171717] text-white">
              {result.summary}
            </p>
          </CardContent>
        </Card>

        {/* Key Points */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Key Points
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-3">
              {result.keyPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-lg leading-8 text-white"
                >
                  <span className="font-bold text-blue-400">
                    {index + 1}.
                  </span>

                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quiz CTA */}
        <div className="flex justify-center">
          <Button
            onClick={() =>
              navigate("/quiz", {
                state: { result },
              })
            }
            className="bg-blue-600 px-8 py-6 text-lg text-white hover:bg-blue-700"
          >
            Take Quiz
          </Button>
        </div>

      </main>
    </div>
  );
}