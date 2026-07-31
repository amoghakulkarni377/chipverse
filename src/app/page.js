"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    question: "Which language is commonly used for RTL design?",
    options: ["Python", "Verilog", "Java", "HTML"],
    answer: "Verilog",
  },
  {
    question: "What type of circuit is an AND gate?",
    options: [
      "Sequential circuit",
      "Combinational circuit",
      "Memory circuit",
      "Clock circuit",
    ],
    answer: "Combinational circuit",
  },
  {
    question: "Which keyword ends a Verilog module?",
    options: ["end", "endmodule", "finish", "stop"],
    answer: "endmodule",
  },
  {
    question: "Which component stores one bit of data?",
    options: ["Multiplexer", "Flip-flop", "Decoder", "Adder"],
    answer: "Flip-flop",
  },
  {
    question: "What does RTL stand for?",
    options: [
      "Real-Time Logic",
      "Register Transfer Level",
      "Runtime Technology Layer",
      "Register Timing Logic",
    ],
    answer: "Register Transfer Level",
  },
];

export default function StartPage() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  function handleNext() {
    if (!selectedAnswer) return;

    const isCorrect =
      selectedAnswer === questions[currentQuestion].answer;

    const updatedScore = isCorrect ? score + 1 : score;

    if (currentQuestion === questions.length - 1) {
      setScore(updatedScore);
      setCompleted(true);
      return;
    }

    setScore(updatedScore);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer("");
  }

  function restartAssessment() {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setCompleted(false);
  }

  function getLevel() {
    if (score <= 2) return "Silicon Starter";
    if (score <= 4) return "RTL Explorer";
    return "Logic Builder";
  }

  function getRoadmap() {
    if (score <= 2) {
      return [
        "Digital Logic Fundamentals",
        "Logic Gates and Boolean Algebra",
        "Introduction to Verilog",
        "Basic Combinational Circuits",
      ];
    }

    if (score <= 4) {
      return [
        "Verilog Syntax Revision",
        "Combinational RTL Design",
        "Sequential Logic and Flip-Flops",
        "Simulation and Testbenches",
      ];
    }

    return [
      "Advanced RTL Challenges",
      "Finite-State Machines",
      "Verification Fundamentals",
      "Portfolio-Ready VLSI Projects",
    ];
  }

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <main className="min-h-screen bg-[#070b14] px-6 py-8 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          ChipVerse
        </Link>

        <Link
          href="/"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          Back to Home
        </Link>
      </nav>

      {!started && !completed && (
  <section className="mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center px-2 py-10 text-center sm:px-4">
   

   <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2">
  <span className="text-cyan-400"></span>


  <p className="text-xs font-medium tracking-[0.14em] text-gray-400 sm:text-sm">
    The Playground for{" "}
    <span className="bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text font-semibold text-transparent">
      Future Silicon Minds
    </span>
  </p>
</div>
<h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-slate-100">
  Design the Next Era
  <br />
  of{" "}
  <span className="text-cyan-400">
    Computing.
  </span>
</h1>

    <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-400 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
      Assess your fundamentals and receive a personalised roadmap
      to begin your journey into chip design.
    </p>

    <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <p className="text-xl font-bold text-cyan-400 sm:text-2xl">5</p>
        <p className="mt-1 text-sm text-gray-400">Questions</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <p className="text-xl font-bold text-cyan-400 sm:text-2xl">3 min</p>
        <p className="mt-1 text-sm text-gray-400">Completion time</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <p className="text-xl font-bold text-cyan-400 sm:text-2xl">1</p>
        <p className="mt-1 text-sm text-gray-400">Personal roadmap</p>
      </div>
    </div>

    <div className="mt-8 flex w-full justify-center sm:mt-10">
      <Link
        href="/login"
        className="w-full max-w-sm rounded-xl bg-cyan-400 px-6 py-3 text-center font-semibold text-black transition hover:bg-cyan-300 sm:w-auto"
      >
        Begin Assessment →
      </Link>
    </div>
  </section>
)}

      {started && !completed && (
        <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center">
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between text-sm text-gray-400">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>
                {Math.round(
                  ((currentQuestion + 1) / questions.length) * 100
                )}
                %
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestion + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              VLSI Fundamentals
            </p>

            <h2 className="mt-4 text-2xl font-bold leading-snug sm:text-4xl">
              {questions[currentQuestion].question}
            </h2>

            <div className="mt-8 grid gap-4">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`rounded-xl border p-4 text-left transition ${
                    selectedAnswer === option
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
                      : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/30 hover:bg-white/[0.06]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="mt-8 w-full rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentQuestion === questions.length - 1
                ? "View My Results"
                : "Next Question →"}
            </button>
          </div>
        </section>
      )}

      {completed && (
        <section className="mx-auto flex min-h-[80vh] max-w-4xl flex-col justify-center py-12">
          <div className="rounded-3xl border border-cyan-400/20 bg-white/[0.04] p-7 shadow-2xl sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Assessment Complete
            </p>

            <div className="mt-5 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-4xl font-bold sm:text-5xl">
                  You are an
                  <span className="block text-cyan-400">
                    {getLevel()}
                  </span>
                </h1>

                <p className="mt-4 max-w-xl leading-7 text-gray-400">
                  Your result gives ChipVerse a starting point for building
                  your personalized path toward practical RTL and VLSI
                  skills.
                </p>
              </div>

              <div className="flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full border-8 border-cyan-400/20 bg-cyan-400/10">
                <span className="text-4xl font-bold text-cyan-300">
                  {percentage}%
                </span>
                <span className="mt-1 text-xs text-gray-400">
                  Skill score
                </span>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-6">
              <h2 className="text-xl font-semibold">
                Your recommended roadmap
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {getRoadmap().map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 font-semibold text-cyan-300">
                      {index + 1}
                    </span>

                    <span className="text-gray-200">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="rounded-xl bg-cyan-500 px-7 py-4 text-center font-semibold text-black transition hover:bg-cyan-400"
              >
                Open My Dashboard →
              </Link>

              <button
                onClick={restartAssessment}
                className="rounded-xl border border-white/20 px-7 py-4 font-semibold text-gray-200 transition hover:bg-white/5"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}