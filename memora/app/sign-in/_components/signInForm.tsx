"use client";

import { Button } from "@/app/_components/ui/button";
import { CardFooter } from "@/app/_components/ui/card";
import { Form, FormField, FormItem } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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

  const handleSubmit = signInForm.handleSubmit(
    async (data: SignInFormSchema) => {
      if (!isLoaded) return;

      try {
        const signInAttempt = await signIn.create({
          identifier: data.email,
          password: data.password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.push("/");
        } else {
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } catch (error) {
        console.error(JSON.stringify(error, null, 2));
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
                <Input id="email" type="email" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...field} />
              </div>
            )}
          />
        </div>
        <CardFooter className="flex flex-col items-center space-y-4 pt-4">
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <div className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </div>
        </CardFooter>
      </form>
    </Form>
  );
}
