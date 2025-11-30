"use client";

import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { SafeUserContext } from "../hooks/useSafeUser";
import React, { useEffect } from "react";

const SafeUserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, error, isLoading } = useUser();
  
  // Update the context when user data changes
  // This component only renders in the browser (ssr: false)
  return (
    <SafeUserContext.Provider value={{ user, error, isLoading }}>
      {children}
    </SafeUserContext.Provider>
  );
};

export default function Auth0Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <SafeUserProvider>
        {children}
      </SafeUserProvider>
    </UserProvider>
  );
}

