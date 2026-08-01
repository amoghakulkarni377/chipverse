export default function SkillProgress({
  skills,
  weakestSkill,
  xp,
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-8">
      <h2 className="text-2xl font-bold">
        Skill Progress
      </h2>

      <div className="mt-7 space-y-7">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-3 flex justify-between">
              <span
                className={`${
                  weakestSkill.name === skill.name
                    ? "font-semibold text-amber-300"
                    : "text-gray-300"
                }`}
              >
                {skill.name}
              </span>

              <span className="font-semibold text-cyan-300">
                {skill.value}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                style={{
                  width: `${skill.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
        <p className="font-semibold text-amber-300">
          Focus Area
        </p>

        <p className="mt-2 text-sm leading-6 text-gray-400">
          Your weakest skill is{" "}
          <span className="font-semibold text-white">
            {weakestSkill.name}
          </span>
          . Improving this area will increase your overall
          readiness the fastest.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
        <p className="text-sm text-gray-400">
          Total XP
        </p>

        <p className="mt-2 text-2xl font-bold text-cyan-300">
          {xp} XP
        </p>
      </div>
    </section>
  );
}