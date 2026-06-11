"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getWalletSession } from "../lib/walletSession";

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = getWalletSession();

    if (!session.connected) {
      router.replace("/connect-wallet");
      return;
    }

    if (session.onboarded) {
      router.replace("/dashboard");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) return null;

  return <>{children}</>;
}
