export default function StatsCards({
  currentLevel,
  levelDescription,
  overallProgress,
  completedChallenges,
  totalChallenges,
}) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <p className="text-sm text-gray-400">
          Current Level
        </p>

        <h2 className="mt-2 text-2xl font-bold text-cyan-300">
          {currentLevel}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {levelDescription}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <p className="text-sm text-gray-400">
          Assessment Score
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {overallProgress}%
        </h2>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-500"
            style={{
              width: `${overallProgress}%`,
            }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <p className="text-sm text-gray-400">
          Correct Answers
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {completedChallenges}/{totalChallenges}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          XP and recommendations are generated from your latest assessment.
        </p>
      </div>

    </div>
  );
}