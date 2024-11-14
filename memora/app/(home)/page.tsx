"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (!isSignedIn) {
    // You could also add a redirect to the sign-in page here
    redirect("/sign-up");
  }

  return (
    <div className="flex h-full items-center justify-center">
      <h1>Hello, {user.firstName}</h1>
    </div>
  );
}
