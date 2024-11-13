// app/sign-up/[[...sign-up]]/page.tsx

"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSignUpFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "An error occurred during sign in");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-base-400 text-3xl font-bold">Welcome</h1>
          <p className="mt-2 text-zinc-400">
            Enter your email below to access your account
          </p>
        </div>

        <form onSubmit={handleSignUpFormSubmit} className="space-y-4">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="Email address"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder:text-zinc-400 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder:text-zinc-400 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting || !isLoaded}
            className="w-full rounded-lg bg-white p-3 text-center font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Accessing account..." : "Access account"}
          </button>
        </form>
      </div>
    </main>
  );
}
