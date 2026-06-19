"use client";

import { AuthGuard } from "./AuthGuard";

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  return <AuthGuard mode="connect">{children}</AuthGuard>;
}
