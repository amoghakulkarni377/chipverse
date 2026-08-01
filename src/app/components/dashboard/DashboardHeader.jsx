import Link from "next/link";

export default function DashboardHeader({
  learnerName,
  weakestSkill,
  missionHref,
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 sm:text-sm">
          Personalised Learner Dashboard
        </p>

        <h1 className="mt-3 break-words text-3xl font-bold leading-tight sm:text-5xl">
          Welcome back, {learnerName}.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
          This dashboard is generated from your latest VLSI assessment.
        </p>
      </div>

      <Link
        href={missionHref}
        className="w-full rounded-xl bg-cyan-500 px-5 py-4 text-center text-sm font-semibold text-black transition hover:bg-cyan-400 sm:w-auto sm:px-6 sm:text-base"
      >
        Improve {weakestSkill} →
      </Link>
    </div>
  );
}