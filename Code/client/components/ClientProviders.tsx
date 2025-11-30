"use client";

import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { SafeUserContext } from "../hooks/useSafeUser";
import React from "react";

const SafeUserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, error, isLoading } = useUser();
  
  return (
    <SafeUserContext.Provider value={{ user, error, isLoading }}>
      {children}
    </SafeUserContext.Provider>
  );
};

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <SafeUserProvider>
        {children}
        {/* <ProgressBar /> */}
      </SafeUserProvider>
    </UserProvider>
  );
}
