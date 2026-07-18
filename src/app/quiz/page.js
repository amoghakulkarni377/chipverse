"use client";

import { useState } from "react";

export default function QuizPage() {
  const questions = [
    {
      question: "Which logic gate outputs HIGH only when both inputs are HIGH?",
      options: ["OR", "AND", "XOR", "NOR"],
      answer: "AND",
    },
    {
      question: "What does RTL stand for?",
      options: [
        "Register Transfer Level",
        "Real Time Logic",
        "Resistor Transfer Logic",
        "Routing Transfer Layer",
      ],
      answer: "Register Transfer Level",
    },
    {
      question: "Which HDL is widely used for digital circuit design?",
      options: ["Python", "Verilog", "Java", "MATLAB"],
      answer: "Verilog",
    },
    {
      question: "What is the output of a NOT gate when the input is HIGH?",
      options: ["HIGH", "LOW", "Undefined", "Depends on the clock"],
      answer: "LOW",
    },
    {
      question: "Which flip-flop stores exactly one bit of data?",
      options: [
        "JK Flip-Flop",
        "SR Flip-Flop",
        "D Flip-Flop",
        "T Flip-Flop",
      ],
      answer: "D Flip-Flop",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState("");

  const nextQuestion = () => {
    if (!selected) {
      alert("Please select an answer.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected("");
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <main className="min-h-screen bg-[#070b14] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8">

        <p className="text-cyan-400 mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <h1 className="text-3xl font-bold mb-8">
          {questions[currentQuestion].question}
        </h1>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selected === option
                  ? "bg-cyan-500 text-black border-cyan-400"
                  : "border-gray-600 hover:border-cyan-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={nextQuestion}
          className="mt-8 w-full rounded-xl bg-cyan-400 py-3 font-bold text-black hover:bg-cyan-300"
        >
          {currentQuestion === questions.length - 1
            ? "Finish Assessment"
            : "Next →"}
        </button>

      </div>
    </main>
  );
}