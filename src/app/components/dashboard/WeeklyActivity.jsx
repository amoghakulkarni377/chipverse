export default function WeeklyActivity({ weeklyActivity }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
        Weekly Activity
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        Learning Consistency
      </h2>

      <div className="mt-7 flex items-end justify-between gap-2 sm:gap-3">
        {weeklyActivity.map((height, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center gap-3"
          >
            <div className="flex h-32 w-full items-end rounded-lg bg-white/[0.03]">
              <div
                className="w-full rounded-lg bg-cyan-400 transition-all duration-700"
                style={{
                  height: `${Math.max(height, 5)}%`,
                }}
              />
            </div>

            <span className="text-xs text-gray-500">
              {days[index]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}