"use client";

import { Button } from "@/app/_components/ui/button";
import { CardFooter } from "@/app/_components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CodeForm } from "./codeForm";

const forgotPasswordFormSchema = z.object({
  email: z.string().email({
    message: "please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "The password must be at least 8 characters long",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
});

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;

export function ForgotPasswordForm() {
  const { isLoaded, signIn } = useSignIn();

  const forgotPasswordForm = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleSubmitForgotPasswordForm = forgotPasswordForm.handleSubmit(
    async (data: ForgotPasswordFormSchema) => {
      if (!isLoaded) return null;

      try {
        await signIn.create({
          strategy: "reset_password_email_code",
          identifier: data.email,
        });

        forgotPasswordForm.reset();
        setNewPassword(data.password);
        setSuccessfulCreation(true);
      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          for (const erro of error.errors) {
            toast.error(erro.message);
          }
        } else {
          toast.error("something went wrong, try again!");
          console.error(JSON.stringify(error, null, 2));
        }
      }
    },
  );

  if (successfulCreation) {
    return <CodeForm newPassword={newPassword} />;
  }

  return (
    <Form {...forgotPasswordForm}>
      <form onSubmit={handleSubmitForgotPasswordForm} className="space-y-4">
        <FormField
          control={forgotPasswordForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...field} autoFocus />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={forgotPasswordForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="text" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <CardFooter className="flex flex-col items-center space-y-4 pt-4">
          <Button type="submit" className="w-full">
            Confirm
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
