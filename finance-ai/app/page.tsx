"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      redirect("/login");
    }
  }, [userId]);

  return (
    <div className="flex h-full items-center justify-center">
      <UserButton showName />
    </div>
  );
};

export default Home;
