"use client";

import { Button } from "@/app/_components/ui/button";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";

export function SocialConnections() {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  async function handleSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null;

    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === "transferable" &&
      signUp.verifications.externalAccount.error?.code ===
        "external_account_exists";

    if (userExistsButNeedsToSignIn) {
      const { status, createdSessionId } = await signIn.create({
        transfer: true,
      });

      if (status === "complete") {
        setActive({
          session: createdSessionId,
        });
      }
    }

    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      const { status, createdSessionId } = await signUp.create({
        transfer: true,
      });

      if (status === "complete") {
        setActive({
          session: createdSessionId,
        });
      }
    } else {
      signInWith(strategy);
    }
  }

  return (
    <div>
      <Button type="button" onClick={() => handleSignIn("oauth_google")}>
        Google
      </Button>
    </div>
  );
}
