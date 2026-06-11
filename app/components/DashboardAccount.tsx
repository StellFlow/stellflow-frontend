"use client";

import { Bell, LogOut, WalletCards } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getWalletSession,
  logoutWallet,
  shortenAddress,
  type WalletSession,
} from "../lib/walletSession";

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = getWalletSession();

    if (!session.connected) {
      router.replace("/connect-wallet");
      return;
    }

    if (!session.onboarded) {
      router.replace("/onboarding");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) return null;

  return <>{children}</>;
}

export function DashboardAccount() {
  const router = useRouter();
  const [session, setSession] = useState<WalletSession>({
    connected: false,
    onboarded: false,
    address: null,
  });

  useEffect(() => {
    setSession(getWalletSession());
  }, []);

  return (
    <div className="flex items-center gap-sm">
      <Link
        href="/dashboard/notifications"
        className="rounded-full p-md text-text-secondary transition hover:bg-surface-container-low hover:text-primary"
        aria-label="Open notifications"
      >
        <Bell size={20} />
      </Link>
      <div className="inline-flex h-11 items-center gap-sm rounded-lg border border-border bg-card-bg px-md font-semibold text-text-primary shadow-sm">
        <WalletCards size={18} className="text-primary" />
        <span>{shortenAddress(session.address)}</span>
      </div>
      <button
        type="button"
        onClick={() => {
          logoutWallet();
          router.push("/");
        }}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card-bg text-text-secondary transition hover:bg-surface-container-low hover:text-primary"
        aria-label="Log out"
        title="Log out"
      >
        <LogOut size={19} />
      </button>
    </div>
  );
}
