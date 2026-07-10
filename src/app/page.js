export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold mb-4">ChipVerse</h1>

      <p className="text-xl text-gray-300 text-center max-w-2xl">
        The AI-powered platform helping students become internship-ready in VLSI,
        Digital Design, Verification and Semiconductor Engineering.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700">
          Join Waitlist
        </button>

        <button className="border border-gray-600 px-6 py-3 rounded-xl hover:bg-white hover:text-black">
          Learn More
        </button>
      </div>

      <div className="mt-20 text-gray-500">
        🚀 Building the future of semiconductor education.
      </div>
    </main>
  );
}