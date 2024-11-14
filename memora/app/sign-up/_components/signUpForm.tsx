"use client";

import { Button } from "@/app/_components/ui/button";
import { CardFooter } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";

const signUpFormSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "The name must be at least 2 characters long.",
    })
    .max(80, {
      message: "The name must be at most 80 characters long.",
    }),
  email: z.string().email({
    message: "Enter a valid email address",
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

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const signUpForm = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  async function handleSignUp(data: SignUpFormSchema) {
    // const fullName = data.fullName.split(" ");
    // const firstName = fullName[0];
    // const lastName = fullName.at(-1) as string;

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      router.push("/sign-up/verifying-code");
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(handleSignUp)}>
        <div className="space-y-4">
          <FormField
            control={signUpForm.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="text" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <CardFooter className="flex justify-end pt-4">
          <Button type="submit">Register</Button>
        </CardFooter>
      </form>
    </Form>
  );
}
// gyH529#th
