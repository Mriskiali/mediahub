"use client";

import { useState, useTransition } from "react";
import { signIn } from "@/lib/actions/auth";

export default function AdminLoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const result = await signIn(email, password);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fde047] dark:bg-zinc-950 px-4 py-12 relative overflow-hidden transition-colors">
      {/* Brutalist Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-20 pointer-events-none text-black dark:text-white"
        style={{
          backgroundImage: "radial-gradient(currentColor 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-white dark:bg-black brutal-border brutal-shadow rotate-3 transition-colors">
            <span className="text-black dark:text-white font-black text-3xl leading-none" aria-hidden="true">⚡</span>
          </div>
          <h1 className="text-4xl font-black text-black dark:text-white uppercase tracking-tighter transition-colors">
            Media
            <span className="bg-white dark:bg-black px-2 py-1 mx-1 brutal-border inline-block -rotate-2 brutal-shadow text-black dark:text-white transition-colors">
              Hub
            </span>
          </h1>
          <p className="mt-4 text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest bg-white dark:bg-black inline-block px-3 py-1 brutal-border transition-colors">
            Portal Admin
          </p>
        </div>

        {/* Form Card */}
        <div className="border-4 border-black dark:border-white bg-white dark:bg-black p-8 brutal-shadow relative transition-colors">
          <div className="absolute -top-4 -right-4 bg-[#f472b6] text-black text-xs font-black uppercase tracking-widest px-3 py-1 brutal-border brutal-shadow rotate-12 transition-colors">
            Safe Area
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 bg-[#f87171] px-4 py-3 text-sm font-bold text-black brutal-border brutal-shadow transition-colors">
                <span className="font-mono text-base font-black leading-none flex-shrink-0">[!]</span>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="login-email"
                className="text-sm font-black text-black dark:text-white uppercase tracking-widest transition-colors"
              >
                Email
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@example.com"
                className="h-12 w-full brutal-border bg-white dark:bg-zinc-900 px-4 text-sm font-bold text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="text-sm font-black text-black dark:text-white uppercase tracking-widest transition-colors"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="h-12 w-full brutal-border bg-white dark:bg-zinc-900 px-4 pr-12 text-sm font-bold text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-black dark:text-white hover:text-[#60a5fa] dark:hover:text-[#60a5fa] transition-colors p-2 font-mono font-bold leading-none"
                  aria-label="Alihkan visibilitas kata sandi"
                >
                  {showPassword ? "[-]" : "[O]"}
                </button>
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={isPending}
              className="flex h-12 w-full items-center justify-center bg-[#4ade80] text-sm font-black text-black uppercase tracking-widest brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#22c55e] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none active:translate-y-1 active:shadow-none mt-4"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="font-mono animate-pulse">[*]</span>
                  Mengautentikasi...
                </span>
              ) : (
                "Masuk ke Sistem"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
