import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "./_components/forgotPasswordForm";

export default async function ForgotPasswordPage() {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Recover Password</CardTitle>
          <CardDescription>
            Enter your credentials and type your new password{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
