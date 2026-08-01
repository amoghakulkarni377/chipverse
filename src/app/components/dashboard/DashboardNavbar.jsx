import Link from "next/link";

export default function DashboardNavbar({ learnerName }) {
  const firstLetter =
    learnerName?.trim()?.charAt(0)?.toUpperCase() || "L";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070b14]/90 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight sm:text-xl"
        >
          ChipVerse
        </Link>

        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <Link
            href="/quiz"
            className="truncate text-xs text-gray-400 transition hover:text-white sm:text-sm"
          >
            Retake Assessment
          </Link>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-300 sm:h-10 sm:w-10">
            {firstLetter}
          </div>
        </div>
      </div>
    </nav>
  );
}