"use client";

import { Button } from "@/app/_components/ui/button";
import { CardFooter } from "@/app/_components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/_components/ui/input-otp";
import { Label } from "@/app/_components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const codeFormSchema = z.object({
  code: z.string().min(6, {
    message: "The code must be at least 6 characters long",
  }),
});

type CodeFormProps = {
  newPassword: string;
};
type CodeFormSchema = z.infer<typeof codeFormSchema>;

export function CodeForm({ newPassword }: CodeFormProps) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const codeForm = useForm<CodeFormSchema>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmitCodeForm = codeForm.handleSubmit(
    async (data: CodeFormSchema) => {
      if (!isLoaded) return null;

      try {
        const resetPasswordAttempt = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: data.code,
          password: newPassword,
        });

        if (resetPasswordAttempt.status === "complete") {
          setActive({ session: resetPasswordAttempt.createdSessionId });
        } else {
          console.log(resetPasswordAttempt);
        }
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

  return (
    <Form {...codeForm}>
      <form onSubmit={handleSubmitCodeForm} className="space-y-4">
        <FormField
          control={codeForm.control}
          name="code"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                <InputOTPGroup className="">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FormMessage />
            </FormItem>
          )}
        />
        <CardFooter className="flex flex-col items-center space-y-4 pt-4">
          <Button type="submit" className="w-full">
            Check code
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
