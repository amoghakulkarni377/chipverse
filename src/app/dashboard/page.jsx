"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const emptyDashboardData = {
  name: "Learner",
  completedChallenges: 0,
  totalChallenges: 0,
  xp: 0,
  streak: 0,
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  skills: {
    digitalLogic: 0,
    verilog: 0,
    rtlDesign: 0,
  },
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] =
    useState(emptyDashboardData);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAssessment, setHasAssessment] = useState(false);

  useEffect(() => {
    const savedAssessment = localStorage.getItem(
      "chipverse-assessment"
    );

    if (!savedAssessment) {
      setIsLoaded(true);
      return;
    }

    try {
      const assessment = JSON.parse(savedAssessment);
      const answers = Array.isArray(assessment.answers)
        ? assessment.answers
        : [];

      const categories = {
        digitalLogic: answers.filter(
          (answer) => answer.category === "digitalLogic"
        ),
        verilog: answers.filter(
          (answer) => answer.category === "verilog"
        ),
        rtlDesign: answers.filter(
          (answer) => answer.category === "rtlDesign"
        ),
      };

      function calculateCategoryScore(categoryAnswers) {
        if (categoryAnswers.length === 0) return 0;

        const correctAnswers = categoryAnswers.filter(
          (answer) => answer.isCorrect
        ).length;

        return Math.round(
          (correctAnswers / categoryAnswers.length) * 100
        );
      }

      const digitalLogicScore = calculateCategoryScore(
        categories.digitalLogic
      );

      const verilogScore = calculateCategoryScore(
        categories.verilog
      );

      const rtlDesignScore = calculateCategoryScore(
        categories.rtlDesign
      );

      const totalCorrectAnswers = answers.filter(
        (answer) => answer.isCorrect
      ).length;

      const completionDay = assessment.completedAt
        ? new Date(assessment.completedAt).getDay()
        : new Date().getDay();

      const activityIndex =
        completionDay === 0 ? 6 : completionDay - 1;

      const weeklyActivity = [0, 0, 0, 0, 0, 0, 0];

      weeklyActivity[activityIndex] =
        answers.length > 0
          ? Math.round(
              (totalCorrectAnswers / answers.length) * 100
            )
          : 0;

      const generatedDashboardData = {
        name: assessment.name || "Learner",
        completedChallenges: totalCorrectAnswers,
        totalChallenges: answers.length,
        xp: totalCorrectAnswers * 100,
        streak: totalCorrectAnswers > 0 ? 1 : 0,
        weeklyActivity,
        skills: {
          digitalLogic: digitalLogicScore,
          verilog: verilogScore,
          rtlDesign: rtlDesignScore,
        },
      };

      setDashboardData(generatedDashboardData);
      setHasAssessment(true);
    } catch (error) {
      console.error("Unable to process assessment:", error);
    }

    setIsLoaded(true);
  }, []);

  const overallProgress =
    dashboardData.totalChallenges > 0
      ? Math.round(
          (dashboardData.completedChallenges /
            dashboardData.totalChallenges) *
            100
        )
      : 0;

  const averageSkill = Math.round(
    (dashboardData.skills.digitalLogic +
      dashboardData.skills.verilog +
      dashboardData.skills.rtlDesign) /
      3
  );

  const currentLevel = useMemo(() => {
    if (averageSkill >= 85) return "RTL Pro";
    if (averageSkill >= 65) return "RTL Builder";
    if (averageSkill >= 35) return "RTL Explorer";

    return "Logic Beginner";
  }, [averageSkill]);

  const currentLevelDescription = useMemo(() => {
    if (averageSkill >= 85) {
      return "You have a strong foundation and can begin advanced RTL challenges.";
    }

    if (averageSkill >= 65) {
      return "You understand the core concepts and should practise implementation.";
    }

    if (averageSkill >= 35) {
      return "You have started building your digital design and Verilog foundation.";
    }

    return "Begin with digital logic and basic HDL concepts.";
  }, [averageSkill]);

  const weakestSkill = useMemo(() => {
    const skillList = [
      {
        name: "Digital Logic",
        key: "digitalLogic",
        value: dashboardData.skills.digitalLogic,
      },
      {
        name: "Verilog",
        key: "verilog",
        value: dashboardData.skills.verilog,
      },
      {
        name: "RTL Design",
        key: "rtlDesign",
        value: dashboardData.skills.rtlDesign,
      },
    ];

    return skillList.reduce((lowest, skill) =>
      skill.value < lowest.value ? skill : lowest
    );
  }, [dashboardData.skills]);

  const mission = useMemo(() => {
    if (weakestSkill.key === "digitalLogic") {
      return {
        title: "Strengthen Digital Logic",
        description:
          "Practise gates, truth tables, Boolean algebra and number systems.",
        skill: "Digital Logic",
        difficulty:
          dashboardData.skills.digitalLogic >= 60
            ? "Intermediate"
            : "Beginner",
        time: "12 minutes",
        reward: 80,
        href: "/quiz",
      };
    }

    if (weakestSkill.key === "verilog") {
      return {
        title: "Practise Verilog Fundamentals",
        description:
          "Review modules, ports, assignments and basic Verilog syntax.",
        skill: "Verilog",
        difficulty:
          dashboardData.skills.verilog >= 60
            ? "Intermediate"
            : "Beginner",
        time: "15 minutes",
        reward: 100,
        href: "/quiz",
      };
    }

    return {
      title: "Improve RTL Design",
      description:
        "Practise multiplexers, registers, combinational logic and sequential circuits.",
      skill: "RTL Design",
      difficulty:
        dashboardData.skills.rtlDesign >= 60
          ? "Intermediate"
          : "Beginner",
      time: "15 minutes",
      reward: 100,
      href: "/quiz",
    };
  }, [weakestSkill, dashboardData.skills]);

  const roadmap = useMemo(() => {
    const digitalLogicCompleted =
      dashboardData.skills.digitalLogic >= 60;

    const verilogCompleted =
      dashboardData.skills.verilog >= 60;

    const rtlCompleted =
      dashboardData.skills.rtlDesign >= 60;

    return [
      {
        title: "Digital Logic Foundations",
        description:
          "Understand gates, Boolean algebra and number systems.",
        status: digitalLogicCompleted
          ? "Completed"
          : "In Progress",
      },
      {
        title: "Verilog Fundamentals",
        description:
          "Learn modules, inputs, outputs and assignments.",
        status: !digitalLogicCompleted
          ? "Locked"
          : verilogCompleted
            ? "Completed"
            : "In Progress",
      },
      {
        title: "Combinational RTL",
        description:
          "Build multiplexers, decoders, adders and ALUs.",
        status: !verilogCompleted
          ? "Locked"
          : rtlCompleted
            ? "Completed"
            : "In Progress",
      },
      {
        title: "Sequential Logic",
        description:
          "Explore flip-flops, counters, registers and clocks.",
        status: rtlCompleted ? "In Progress" : "Locked",
      },
    ];
  }, [dashboardData.skills]);

  const skills = [
    {
      name: "Digital Logic",
      value: dashboardData.skills.digitalLogic,
    },
    {
      name: "Verilog",
      value: dashboardData.skills.verilog,
    },
    {
      name: "RTL Design",
      value: dashboardData.skills.rtlDesign,
    },
  ];

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050914] text-white">
        <p className="text-gray-400">
          Analysing your assessment...
        </p>
      </main>
    );
  }

  if (!hasAssessment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050914] px-6 text-white">
        <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Assessment required
          </p>

          <h1 className="mt-4 text-3xl font-bold">
            Complete your assessment first
          </h1>

          <p className="mt-4 leading-7 text-gray-400">
            Your dashboard will be generated from your answers,
            including your skill percentages, current level,
            roadmap and recommended next step.
          </p>

          <Link
            href="/quiz"
            className="mt-7 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Start Assessment →
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050914] text-white">
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070b14]/80 px-6 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            ChipVerse
          </Link>

          <div className="flex items-center gap-5">
            <Link
              href="/quiz"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Retake Assessment
            </Link>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 font-semibold text-cyan-300">
              {dashboardData.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Personalised Learner Dashboard
            </p>

            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Welcome back, {dashboardData.name}.
            </h1>

            <p className="mt-4 max-w-2xl text-gray-400">
              This dashboard is generated from your latest VLSI
              assessment.
            </p>
          </div>

          <Link
            href={mission.href}
            className="rounded-xl bg-cyan-500 px-6 py-4 text-center font-semibold text-black transition hover:bg-cyan-400"
          >
            Improve {weakestSkill.name} →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-gray-400">
              Current Level
            </p>

            <p className="mt-2 text-2xl font-bold text-cyan-300">
              {currentLevel}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              {currentLevelDescription}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-gray-400">
              Assessment Score
            </p>

            <p className="mt-2 text-2xl font-bold">
              {overallProgress}%
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-gray-400">
              Correct Answers
            </p>

            <p className="mt-2 text-2xl font-bold">
              {dashboardData.completedChallenges}/
              {dashboardData.totalChallenges}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Your XP is calculated from correct assessment answers.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  Recommended Next Step
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {mission.title}
                </h2>
              </div>

              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm text-amber-300">
                {mission.difficulty}
              </span>
            </div>

            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              {mission.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Skill
                </p>

                <p className="mt-2 font-medium">
                  {mission.skill}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Estimated time
                </p>

                <p className="mt-2 font-medium">
                  {mission.time}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Potential reward
                </p>

                <p className="mt-2 font-medium">
                  {mission.reward} XP
                </p>
              </div>
            </div>

            <Link
              href={mission.href}
              className="mt-7 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              Practise This Skill →
            </Link>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Assessment Activity
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Latest result
            </h2>

            <div className="mt-7 flex items-end justify-between gap-3">
              {dashboardData.weeklyActivity.map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center gap-3"
                  >
                    <div className="flex h-32 w-full items-end rounded-lg bg-white/[0.03]">
                      <div
                        className="w-full rounded-lg bg-cyan-400/70 transition-all duration-500"
                        style={{ height: `${height}%` }}
                      />
                    </div>

                    <span className="text-xs text-gray-500">
                      {
                        ["M", "T", "W", "T", "F", "S", "S"][
                          index
                        ]
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </section>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h2 className="text-2xl font-bold">
              Your Learning Roadmap
            </h2>

            <div className="mt-6 space-y-4">
              {roadmap.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 font-semibold text-cyan-300">
                    {index + 1}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <span
                        className={`text-sm ${
                          item.status === "Completed"
                            ? "text-emerald-300"
                            : item.status === "In Progress"
                              ? "text-cyan-300"
                              : "text-gray-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h2 className="text-2xl font-bold">
              Skill Progress
            </h2>

            <div className="mt-7 space-y-7">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-3 flex justify-between">
                    <span className="text-gray-300">
                      {skill.name}
                    </span>

                    <span className="font-semibold text-cyan-300">
                      {skill.value}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-5">
              <p className="font-semibold text-cyan-200">
                Priority skill
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Your lowest assessment score is in{" "}
                <span className="font-semibold text-white">
                  {weakestSkill.name}
                </span>
                . ChipVerse recommends focusing here next.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm text-gray-400">
                Assessment XP
              </p>

              <p className="mt-2 text-2xl font-bold text-cyan-300">
                {dashboardData.xp} XP
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}