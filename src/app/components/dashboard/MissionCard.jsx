import Link from "next/link";

export default function MissionCard({ mission }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 sm:text-sm">
            Recommended Next Step
          </p>

          <h2 className="mt-2 text-2xl font-bold leading-tight">
            {mission.title}
          </h2>
        </div>

        <span className="w-fit rounded-full bg-amber-400/10 px-3 py-1 text-sm text-amber-300">
          {mission.difficulty}
        </span>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
        {mission.description}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
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
        className="mt-7 block w-full rounded-xl bg-cyan-500 px-6 py-3 text-center font-semibold text-black transition hover:bg-cyan-400 sm:inline-block sm:w-auto"
      >
        Practise This Skill →
      </Link>
    </section>
  );
}