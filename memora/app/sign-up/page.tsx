"use client";

import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  function handleSignUpFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    console.log({ email, password });
    setVerifying(true);
  }

  function handleVerifyFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    console.log({ code });
  }

  if (verifying) {
    return (
      <main className="flex h-full items-center justify-center">
        <form onSubmit={handleVerifyFormSubmit} className="space-y-4 p-4">
          <input
            type="text"
            onChange={(e) => setCode(e.target.value)}
            placeholder="code"
            className="w-full rounded-md border border-zinc-500 bg-transparent p-2 text-zinc-100"
          />
          <button className="w-full rounded-md bg-white p-2 text-center font-bold text-black duration-100 hover:opacity-90">
            Check code
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="flex h-full items-center justify-center">
      <form onSubmit={handleSignUpFormSubmit} className="space-y-6 p-4">
        <div className="flex flex-col gap-4">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="email@example.com"
            className="w-[300px] rounded-md border border-zinc-500 bg-transparent p-2 text-zinc-100"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="w-[300px] rounded-md border border-zinc-500 bg-transparent p-2 text-zinc-100"
          />
        </div>
        <button className="w-full rounded-md bg-white p-2 text-center font-bold text-black duration-100 hover:opacity-90">
          Create Account
        </button>
      </form>
    </main>
  );
}
