"use client";

import { useState } from "react";
import Link from "next/link";

const starterCode = `module mux2to1 (
  input wire a,
  input wire b,
  input wire sel,
  output wire y
);

  // Write your logic here

endmodule`;

export default function MultiplexerChallengePage() {
  const [code, setCode] = useState(starterCode);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function checkSolution() {
    setIsSubmitting(true);
    setFeedback(null);

    setTimeout(() => {
      const normalizedCode = code
        .replace(/\s+/g, " ")
        .toLowerCase();

      const hasModule = normalizedCode.includes("module");
      const hasEndmodule = normalizedCode.includes("endmodule");
      const hasAssign = normalizedCode.includes("assign");
      const hasSelLogic =
        normalizedCode.includes("sel ? b : a") ||
        normalizedCode.includes("sel?b:a") ||
        normalizedCode.includes("if (sel)") ||
        normalizedCode.includes("if(sel)");

      if (!hasModule || !hasEndmodule) {
        setFeedback({
          type: "error",
          title: "Module structure incomplete",
          message:
            "Make sure your code begins with module and ends with endmodule.",
        });
      } else if (!hasAssign && !normalizedCode.includes("always")) {
        setFeedback({
          type: "error",
          title: "Logic not detected",
          message:
            "Add the multiplexer logic using an assign statement or an always block.",
        });
      } else if (!hasSelLogic) {
        setFeedback({
          type: "warning",
          title: "Selection logic needs review",
          message:
            "Your solution should select input a when sel is 0 and input b when sel is 1.",
        });
      } else {
        setFeedback({
          type: "success",
          title: "Challenge completed",
          message:
            "Your 2:1 multiplexer logic looks correct. You earned 100 XP.",
        });
      }

      setIsSubmitting(false);
    }, 700);
  }

  function resetCode() {
    setCode(starterCode);
    setFeedback(null);
  }

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <nav className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ChipVerse
          </Link>

          <Link
            href="/dashboard"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
              Beginner
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-400">
              Combinational RTL
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-400">
              100 XP
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Build a 2:1 Multiplexer
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-gray-400">
            Design a Verilog module that selects one of two input signals using
            a single select signal.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Problem Statement
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Design Requirements
              </h2>

              <p className="mt-4 leading-7 text-gray-400">
                Create a module named
                <code className="mx-1 rounded bg-white/10 px-2 py-1 text-cyan-300">
                  mux2to1
                </code>
                with two data inputs, one select input, and one output.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Inputs
                  </p>
                  <p className="mt-2 text-gray-200">
                    a, b, sel
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Output
                  </p>
                  <p className="mt-2 text-gray-200">y</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Expected Behaviour
              </p>

              <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-400">
                    <tr>
                      <th className="px-4 py-3">sel</th>
                      <th className="px-4 py-3">Output</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t border-white/10">
                      <td className="px-4 py-3">0</td>
                      <td className="px-4 py-3 text-cyan-300">y = a</td>
                    </tr>

                    <tr className="border-t border-white/10">
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3 text-cyan-300">y = b</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <details className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.05] p-6">
              <summary className="cursor-pointer font-semibold text-amber-300">
                Show Hint
              </summary>

              <p className="mt-4 leading-7 text-gray-400">
                A multiplexer can be written using a continuous assignment and
                the ternary operator:
              </p>

              <code className="mt-3 block rounded-xl bg-black/30 p-4 text-sm text-amber-200">
                assign y = sel ? b : a;
              </code>
            </details>
          </aside>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  Verilog Editor
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Write your solution
                </h2>
              </div>

              <button
                onClick={resetCode}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5"
              >
                Reset Code
              </button>
            </div>

            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              spellCheck="false"
              className="mt-6 min-h-[430px] w-full resize-y rounded-2xl border border-white/10 bg-[#02050b] p-5 font-mono text-sm leading-7 text-cyan-100 outline-none transition focus:border-cyan-400/50"
            />

            <div className="mt-5 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={checkSolution}
                disabled={isSubmitting}
                className="rounded-xl bg-cyan-500 px-7 py-4 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Checking Solution..." : "Submit Solution →"}
              </button>

              <button
                onClick={() =>
                  setCode(
                    `module mux2to1 (
  input wire a,
  input wire b,
  input wire sel,
  output wire y
);

  assign y = sel ? b : a;

endmodule`
                  )
                }
                className="rounded-xl border border-white/15 px-7 py-4 font-semibold text-gray-300 transition hover:bg-white/5"
              >
                Load Example
              </button>
            </div>

            {feedback && (
              <div
                className={`mt-6 rounded-2xl border p-5 ${
                  feedback.type === "success"
                    ? "border-emerald-400/30 bg-emerald-400/10"
                    : feedback.type === "warning"
                    ? "border-amber-400/30 bg-amber-400/10"
                    : "border-red-400/30 bg-red-400/10"
                }`}
              >
                <h3
                  className={`font-semibold ${
                    feedback.type === "success"
                      ? "text-emerald-300"
                      : feedback.type === "warning"
                      ? "text-amber-300"
                      : "text-red-300"
                  }`}
                >
                  {feedback.title}
                </h3>

                <p className="mt-2 leading-7 text-gray-300">
                  {feedback.message}
                </p>

                {feedback.type === "success" && (
                  <Link
                    href="/dashboard"
                    className="mt-4 inline-block text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                  >
                    Return to Dashboard →
                  </Link>
                )}
              </div>
            )}

            <p className="mt-5 text-sm leading-6 text-gray-500">
              This first MVP version checks common Verilog patterns in your
              browser. Later, we will connect it to real simulation and AI code
              feedback.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}