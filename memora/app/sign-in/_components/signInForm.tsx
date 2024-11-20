"use client";

import { Loading } from "@/app/_components/loading";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInFormSchema = z.object({
  email: z.string().email({
    message: "This is an invalid email address",
  }),
  password: z.string().min(8, {
    message: "The password must be at least 8 characters",
  }),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export function SignInForm() {
  const signInForm = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = signInForm.handleSubmit(
    async (data: SignInFormSchema) => {
      if (!isLoaded) return;

      try {
        setIsSubmitting(true);

        const signInAttempt = await signIn.create({
          identifier: data.email,
          password: data.password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.push("/");
        } else {
          throw new Error("failed");
        }
      } catch (error) {
        setIsSubmitting(false);

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

  return (
    <Form {...signInForm}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormField
            control={signInForm.control}
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
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <CardFooter className="flex flex-col items-center space-y-4 pt-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loading /> : "Sign In"}
          </Button>
          <div className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            <Link
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              forgot your password?
            </Link>
          </div>
        </CardFooter>
      </form>
    </Form>
  );
}
