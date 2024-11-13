"use client";

import { useClerk } from "@clerk/nextjs";

export function SignOutButton() {
  const { signOut } = useClerk();
  return (
    <button
      onClick={() => signOut({ redirectUrl: "/sign-in" })}
      className="ml-4 rounded-md bg-white p-1 px-2 text-black"
    >
      sair
    </button>
  );
}
