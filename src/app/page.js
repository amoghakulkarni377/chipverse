import Link from "next/link";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      {/* Navigation */}
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white transition hover:text-cyan-300"
        >
          ChipVerse
        </Link>

        <Link
          href="/login"
          className="text-sm font-medium text-slate-400 transition hover:text-cyan-300"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex min-h-[78vh] w-full max-w-6xl flex-col items-center justify-center px-6 pb-20 text-center">
        {/* Tagline */}
        <div className="mb-7 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-2 backdrop-blur-md">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-300 sm:text-sm">
            The Playground for{" "}
            <span className="text-cyan-400">
              Future Silicon Minds
            </span>
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="max-w-5xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl md:leading-[1.18]">
          Design the Next Era
          <br />
          <span className="text-cyan-400">
            of Computing.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          Assess your fundamentals and receive a personalised roadmap to begin
          your journey into chip design.
        </p>

        {/* Main Buttons */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-5 sm:w-auto sm:flex-row">
          <Link
            href="/login"
            className="w-full rounded-2xl bg-cyan-400 px-8 py-4 text-center text-base font-bold text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.4)] transition-all duration-300 hover:scale-105 hover:bg-cyan-300 hover:shadow-[0_0_60px_rgba(34,211,238,0.65)] active:scale-95 sm:w-auto"
          >
            Begin Assessment →
          </Link>

          <Link
            href="#vision"
            className="w-full rounded-2xl border border-cyan-400/40 bg-slate-950/40 px-8 py-4 text-center text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_35px_rgba(34,211,238,0.2)] active:scale-95 sm:w-auto"
          >
            Watch the Vision →
          </Link>
        </div>
      </section>

      {/* Vision Section */}
      <section
        id="vision"
        className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 pb-24"
      >
        <div className="rounded-3xl border border-cyan-400/20 bg-slate-950/50 p-8 text-center shadow-[0_0_60px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            The Vision
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A space built for the next generation of silicon minds.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            ChipVerse is designed to make the world of chip design more
            accessible, interactive and career-focused—starting from your
            current level and guiding you towards what comes next.
          </p>
        </div>
      </section>
    </main>
  );
}