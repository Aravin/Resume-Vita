"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { createContext, useContext } from "react";

// Create a context that will be provided by ClientProviders
const SafeUserContext = createContext<{
  user: any;
  error: any;
  isLoading: boolean;
}>({ user: null, error: null, isLoading: false });

// Hook that uses our safe context
export function useSafeUser() {
  return useContext(SafeUserContext);
}

// Export the context for use in ClientProviders
export { SafeUserContext };
