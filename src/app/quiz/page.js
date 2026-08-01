"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: 1,
    category: "digitalLogic",
    categoryLabel: "Digital Logic",
    question: "What is the output of an AND gate when both inputs are 1?",
    options: ["0", "1", "Undefined", "High impedance"],
    correctAnswer: "1",
  },
  {
    id: 2,
    category: "digitalLogic",
    categoryLabel: "Digital Logic",
    question: "Which number system uses only 0 and 1?",
    options: ["Decimal", "Hexadecimal", "Binary", "Octal"],
    correctAnswer: "Binary",
  },
  {
    id: 3,
    category: "verilog",
    categoryLabel: "Verilog",
    question: "Which keyword is used to begin a Verilog design block?",
    options: ["begin", "module", "design", "entity"],
    correctAnswer: "module",
  },
  {
    id: 4,
    category: "verilog",
    categoryLabel: "Verilog",
    question: "Which symbol is commonly used for continuous assignment?",
    options: ["assign", "always", "initial", "wire"],
    correctAnswer: "assign",
  },
  {
    id: 5,
    category: "rtlDesign",
    categoryLabel: "RTL Design",
    question:
      "Which circuit selects one input from multiple inputs using a select signal?",
    options: ["Decoder", "Counter", "Multiplexer", "Register"],
    correctAnswer: "Multiplexer",
  },
  {
    id: 6,
    category: "rtlDesign",
    categoryLabel: "RTL Design",
    question: "Which element is commonly used to store one bit of data?",
    options: ["Multiplexer", "Flip-flop", "Adder", "Encoder"],
    correctAnswer: "Flip-flop",
  },
];

export default function QuizPage() {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [learnerName, setLearnerName] = useState("Amogh");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const answeredCount = Object.keys(selectedAnswers).length;

  const progress = Math.round(
    (answeredCount / questions.length) * 100
  );

  const selectedAnswer = selectedAnswers[currentQuestion.id];

  const isLastQuestion =
    currentQuestionIndex === questions.length - 1;

  const canGoNext = Boolean(selectedAnswer);

  const questionNumberLabel = useMemo(
    () => `${currentQuestionIndex + 1} of ${questions.length}`,
    [currentQuestionIndex]
  );

  function handleAnswerSelect(option) {
    setSelectedAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion.id]: option,
    }));
  }

  function handlePrevious() {
    if (currentQuestionIndex === 0) return;

    setCurrentQuestionIndex((previousIndex) => previousIndex - 1);
  }

  function handleNext() {
    if (!canGoNext) return;

    if (isLastQuestion) {
      submitAssessment();
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
  }

  function submitAssessment() {
    if (answeredCount !== questions.length) return;

    setIsSubmitting(true);

    const answers = questions.map((question) => {
      const selected = selectedAnswers[question.id];

      return {
        questionId: question.id,
        category: question.category,
        categoryLabel: question.categoryLabel,
        question: question.question,
        selectedAnswer: selected,
        correctAnswer: question.correctAnswer,
        isCorrect: selected === question.correctAnswer,
      };
    });

    const correctAnswers = answers.filter(
      (answer) => answer.isCorrect
    ).length;

    const assessmentResult = {
      name: learnerName.trim() || "Learner",
      answers,
      correctAnswers,
      totalQuestions: questions.length,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "chipverse-assessment",
      JSON.stringify(assessmentResult)
    );

    localStorage.removeItem("chipverse-dashboard");

    router.push("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050914] px-5 py-8 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-10%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              ChipVerse Assessment
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Discover your current VLSI skill level
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              Your answers will be used to generate a personalized
              dashboard, roadmap and recommended challenge.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Progress
            </p>

            <p className="mt-1 text-xl font-bold text-cyan-300">
              {progress}%
            </p>
          </div>
        </div>

        <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <label
              htmlFor="learner-name"
              className="text-sm font-semibold text-gray-300"
            >
              Your name
            </label>

            <input
              id="learner-name"
              type="text"
              value={learnerName}
              onChange={(event) =>
                setLearnerName(event.target.value)
              }
              placeholder="Enter your name"
              className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50"
            />

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Assessment areas
              </p>

              <div className="mt-4 space-y-3">
                {[
                  "Digital Logic",
                  "Verilog",
                  "RTL Design",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-4">
              <p className="text-sm font-semibold text-cyan-200">
                Answer honestly
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                The dashboard will recommend the weakest skill area,
                not just display a fixed result.
              </p>
            </div>
          </aside>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  {currentQuestion.categoryLabel}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Question {questionNumberLabel}
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-gray-400">
                {answeredCount} answered
              </span>
            </div>

            <h2 className="mt-8 text-2xl font-bold leading-snug sm:text-3xl">
              {currentQuestion.question}
            </h2>

            <div className="mt-8 space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAnswerSelect(option)}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition sm:p-5 ${
                      isSelected
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                        isSelected
                          ? "border-cyan-300 bg-cyan-400 text-black"
                          : "border-white/10 text-gray-400"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span
                      className={
                        isSelected
                          ? "font-semibold text-white"
                          : "text-gray-300"
                      }
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {!selectedAnswer && (
              <p className="mt-5 text-sm text-amber-300">
                Select one answer to continue.
              </p>
            )}

            <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-gray-300 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext || isSubmitting}
                className="rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting
                  ? "Generating dashboard..."
                  : isLastQuestion
                    ? "View My Dashboard →"
                    : "Next Question →"}
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}