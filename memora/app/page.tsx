"use client";

import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "./_component/signOutButton";

export default function Home() {
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <h1>Hello {user.fullName}, this is Memora</h1>
      <SignOutButton />
    </div>
  );
}
