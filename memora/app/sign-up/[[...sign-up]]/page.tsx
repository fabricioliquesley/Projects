// app/sign-up/[[...sign-up]]/page.tsx

"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSignUpFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "An error occurred during sign up");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerifyFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (verifying) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Verify your email</h2>
            <p className="mt-2 text-zinc-400">
              We sent a verification code to {email}
            </p>
          </div>

          <form onSubmit={handleVerifyFormSubmit} className="space-y-4">
            <input
              type="text"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder:text-zinc-400 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting || !isLoaded}
              className="w-full rounded-lg bg-white p-3 text-center font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-zinc-400">
            Enter your email below to create your account
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
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </main>
  );
}
