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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/_components/ui/input-otp";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ONE_SECOND = 1000;

const verifyingCodeFormSchema = z.object({
  code: z.string().min(6, {
    message: "The code must be six characters long",
  }),
});

type VerifyingCodeFormSchema = z.infer<typeof verifyingCodeFormSchema>;

export function VerifyingCodeForm() {
  const verifyingCodeForm = useForm<VerifyingCodeFormSchema>({
    resolver: zodResolver(verifyingCodeFormSchema),
    defaultValues: {
      code: "",
    },
  });
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReadyToResend, setIsReadyToResend] = useState(false);
  const [totalTime, setTotalTime] = useState(60);

  async function handleVerifyingCode(data: VerifyingCodeFormSchema) {
    if (!isLoaded) return;

    try {
      setIsSubmitting(true);

      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        throw new Error("failed");
      }
    } catch (error) {
      setIsSubmitting(false);

      if (isClerkAPIResponseError(error)) {
        for (const err of error.errors) {
          toast.error(err.message);
        }
      } else {
        toast.error("something went wrong, try again!");
        console.error("Error:", JSON.stringify(error, null, 2));
      }
    }
  }

  async function resendCode() {
    try {
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.message("The new code has been sent to your email address");

      setTotalTime(60);
      setIsReadyToResend(false);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        for (const err of error.errors) {
          toast.error(err.message);
        }
      } else {
        toast.error("something went wrong, try again!");
        console.error(JSON.stringify(error, null, 2));
      }
    }
  }

  useEffect(() => {
    if (totalTime == 0) {
      setIsReadyToResend(true);
      return;
    }

    const decrementTimer = setTimeout(() => {
      console.log("decrement");
      setTotalTime((prev) => prev - 1);
    }, ONE_SECOND);

    return () => clearTimeout(decrementTimer);
  }, [totalTime]);

  return (
    <Form {...verifyingCodeForm}>
      <form onSubmit={verifyingCodeForm.handleSubmit(handleVerifyingCode)}>
        <div className="space-y-4">
          <FormField
            control={verifyingCodeForm.control}
            name="code"
            render={({ field }) => (
              <FormItem className="mx-auto">
                <InputOTP maxLength={6} {...field}>
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
        </div>
        <CardFooter className="flex justify-end pt-4">
          <Button
            variant={"ghost"}
            type="button"
            disabled={!isReadyToResend}
            onClick={resendCode}
          >
            {isReadyToResend
              ? "Resend code"
              : `Resend code in ${totalTime.toString().padStart(2, "0")}`}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loading /> : "Check code"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
