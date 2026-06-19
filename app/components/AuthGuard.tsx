"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getWalletSession } from "../lib/walletSession";

type AuthGuardMode = "connect" | "onboarded";

type AuthGuardProps = {
  mode: AuthGuardMode;
  children: React.ReactNode;
};

export function AuthGuard({ mode, children }: AuthGuardProps) {
  const router = useRouter();
  const session = getWalletSession();

  const needsRedirect =
    !session.connected ||
    (mode === "onboarded" && !session.onboarded) ||
    (mode === "connect" && session.onboarded);

  useEffect(() => {
    if (!session.connected) {
      router.replace("/connect-wallet");
    } else if (mode === "onboarded" && !session.onboarded) {
      router.replace("/onboarding");
    } else if (mode === "connect" && session.onboarded) {
      router.replace("/dashboard");
    }
  }, [router, mode, session.connected, session.onboarded]);

  if (needsRedirect) return null;

  return <>{children}</>;
}
