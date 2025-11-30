"use client";

// import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { SafeUserContext } from "../hooks/useSafeUser";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  // Temporarily disable UserProvider to prevent SSR errors
  return (
    <SafeUserContext.Provider value={{ user: null, error: null, isLoading: false }}>
      {children}
      <ProgressBar />
    </SafeUserContext.Provider>
  );
}
