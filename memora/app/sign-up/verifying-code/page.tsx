import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/_components/ui/card";
import { VerifyingCodeForm } from "../_components/verifyingCodeForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { sessionId } = await auth();

  if (sessionId) redirect("/");
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Your E-mail</CardTitle>
          <CardDescription>
            Enter the verification code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyingCodeForm />
        </CardContent>
      </Card>
    </div>
  );
}
