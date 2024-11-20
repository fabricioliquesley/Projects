"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <h1>Hello, {user.firstName}</h1>
      <UserButton />
    </div>
  );
}
