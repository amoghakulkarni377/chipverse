import Link from "next/link";

const roadmap = [
  {
    title: "Digital Logic Foundations",
    description: "Understand gates, Boolean algebra, and number systems.",
    status: "Completed",
  },
  {
    title: "Verilog Fundamentals",
    description: "Learn modules, inputs, outputs, and assignments.",
    status: "In Progress",
  },
  {
    title: "Combinational RTL",
    description: "Build multiplexers, decoders, adders, and ALUs.",
    status: "Locked",
  },
  {
    title: "Sequential Logic",
    description: "Explore flip-flops, counters, registers, and clocks.",
    status: "Locked",
  },
];

const skills = [
  { name: "Digital Logic", value: 72 },
  { name: "Verilog", value: 45 },
  { name: "RTL Design", value: 24 },
];

export default function DashboardPage() {
  return (
    <main className="relative z-10 min-h-screen text-white">
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070b14]/80 px-6 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
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
              A
            </div>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Learner Dashboard
            </p>

            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Welcome back, Amogh.
            </h1>

            <p className="mt-4 max-w-2xl text-gray-400">
              Continue building your skills
            </p>
          </div>

          <Link
            href="/challenges"
            className="rounded-xl bg-cyan-500 px-6 py-4 text-center font-semibold text-black transition hover:bg-cyan-400"
          >
            Continue Learning →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-gray-400">Current Level</p>
            <p className="mt-2 text-2xl font-bold text-cyan-300">
              RTL Explorer
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Building core Verilog and digital-design skills.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-gray-400">Overall Progress</p>
            <p className="mt-2 text-2xl font-bold">42%</p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[42%] rounded-full bg-cyan-400" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-gray-400">Challenges Completed</p>
            <p className="mt-2 text-2xl font-bold">6</p>
            <p className="mt-3 text-sm text-gray-500">
              Next milestone: complete 10 challenges.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  Today&apos;s Mission
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Build a 2:1 Multiplexer
                </h2>
              </div>

              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm text-amber-300">
                Beginner
              </span>
            </div>

            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              Write a Verilog module that selects between two inputs using one
              select signal.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Skill
                </p>
                <p className="mt-2 font-medium">Combinational RTL</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Estimated time
                </p>
                <p className="mt-2 font-medium">15 minutes</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Reward
                </p>
                <p className="mt-2 font-medium">100 XP</p>
              </div>
            </div>

            <Link
              href="/challenges/multiplexer"
              className="mt-7 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              Start Challenge →
            </Link>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Weekly Activity
            </p>

            <h2 className="mt-2 text-2xl font-bold">3-day streak</h2>

            <div className="mt-7 flex items-end justify-between gap-3">
              {[35, 60, 40, 80, 55, 90, 65].map((height, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-3"
                >
                  <div className="flex h-32 w-full items-end rounded-lg bg-white/[0.03]">
                    <div
                      className="w-full rounded-lg bg-cyan-400/70"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Your Learning Roadmap</h2>

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
                      <h3 className="font-semibold">{item.title}</h3>

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
            <h2 className="text-2xl font-bold">Skill Progress</h2>

            <div className="mt-7 space-y-7">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-3 flex justify-between">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="font-semibold text-cyan-300">
                      {skill.value}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-5">
              <p className="font-semibold text-cyan-200">
                Next recommended skill
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Practice combinational circuits before moving into clocks and
                sequential logic.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}