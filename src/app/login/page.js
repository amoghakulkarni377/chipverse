"use client";

import { supabase } from "../lib/supabase";

export default function LoginPage() {
  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/quiz`,
      },
    });

    if (error) {
      alert(error.message);
    }
  }

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold text-center">
          Welcome to ChipVerse
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Continue with your Google account
        </p>

        <button
          onClick={signInWithGoogle}
          className="mt-8 w-full rounded-xl bg-cyan-500 px-5 py-4 font-semibold text-black hover:bg-cyan-400 transition"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}