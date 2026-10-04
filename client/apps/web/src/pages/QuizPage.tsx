import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface NotesResult {
  summary: string;
  keyPoints: string[];
  quiz: QuizQuestion[];
}

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result as NotesResult | undefined;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!result || !result.quiz?.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Quiz Available</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4 text-gray-600">
              Generate notes and quiz questions first.
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

  const question = result.quiz[currentQuestion];

  /*
   * Checks whether the selected option is correct.
   * Supports:
   *
   * correctAnswer = "B"
   * correctAnswer = "b"
   * correctAnswer = "To manage computer hardware..."
   */
  const isAnswerCorrect = (
    selected: string,
    currentQuestion: QuizQuestion
  ) => {
    const correct = currentQuestion.correctAnswer.trim();

    // Case 1: Backend returns A/B/C/D
    const optionIndex = ["A", "B", "C", "D"].indexOf(
      correct.toUpperCase()
    );

    if (optionIndex !== -1) {
      return currentQuestion.options[optionIndex] === selected;
    }

    // Case 2: Backend returns the actual option text
    return correct.toLowerCase() === selected.trim().toLowerCase();
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const correct = isAnswerCorrect(
      selectedAnswer,
      question
    );

    // Update score
    if (correct) {
      setScore((prev) => prev + 1);
    }

    // Last question
    if (currentQuestion === result.quiz.length - 1) {
      setFinished(true);
      return;
    }

    // Next question
    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  /*
   * Calculate final score.
   *
   * React state updates are asynchronous, so `score` may
   * still contain the score before the last question.
   */
  if (finished) {
    const lastAnswerCorrect =
      selectedAnswer !== null &&
      isAnswerCorrect(selectedAnswer, question);

    const finalScore =
      score + (lastAnswerCorrect ? 1 : 0);

    return (
      <div className="min-h-screen bg-gray-50">

        <main className="flex min-h-[80vh] items-center justify-center px-6">

          <Card className="w-full max-w-lg border-gray-800 bg-[#171717] text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white">
                Quiz Completed!
              </CardTitle>
            </CardHeader>

            <CardContent className="text-center">

              <p className="mb-2 text-6xl font-bold text-blue-500">
                {finalScore}/{result.quiz.length}
              </p>

              <p className="mb-8 text-lg text-gray-300">
                You scored{" "}
                {Math.round(
                  (finalScore / result.quiz.length) * 100
                )}
                %
              </p>

              <div className="flex justify-center gap-3">

                <Button
                  onClick={() =>
                    navigate("/notes", {
                      state: { result },
                    })
                  }
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  View Notes
                </Button>

                <Button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setScore(0);
                    setFinished(false);
                  }}
                  variant="outline"
                  className="border-gray-600 bg-transparent text-white hover:bg-gray-800"
                >
                  Retake Quiz
                </Button>

              </div>
            </CardContent>
          </Card>

        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="mx-auto max-w-3xl px-6 py-10">

        {/* Progress */}
        <div className="mb-6">

          <div className="flex justify-between text-base font-medium text-gray-700">

            <span>
              Question {currentQuestion + 1} of{" "}
              {result.quiz.length}
            </span>

            <span>
              Score: {score}
            </span>

          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full bg-blue-600 transition-all"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    result.quiz.length) *
                  100
                }%`,
              }}
            />

          </div>
        </div>

        {/* Question */}
        <Card className="border-gray-800 bg-[#171717] text-white">

          <CardHeader>

            <CardTitle className="text-2xl font-bold leading-9 text-white">
              {question.question}
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-3">

            {question.options.map((option, index) => {

              const isSelected =
                selectedAnswer === option;

              return (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedAnswer(option)
                  }
                  className={`w-full rounded-lg border p-5 text-left text-lg transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-900 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                >

                  <span
                    className={`mr-3 font-bold ${
                      isSelected
                        ? "text-white"
                        : "text-blue-600"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}.
                  </span>

                  {option}

                </button>
              );
            })}

            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="mt-6 w-full bg-blue-600 py-6 text-lg text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {currentQuestion === result.quiz.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>

          </CardContent>
        </Card>

      </main>
    </div>
  );
}