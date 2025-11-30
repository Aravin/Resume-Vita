"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

// Safe wrapper that handles SSR by checking if component is mounted
export function useSafeUser() {
  const [mounted, setMounted] = useState(false);
  // Call useUser unconditionally (required by React hooks rules)
  // Auth0Provider should handle SSR, but we'll add extra safety
  const auth0User = useUser();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // During SSR or before mount, return safe defaults
  // This prevents hydration mismatches and SSR errors
  if (!mounted) {
    return { user: null, error: null, isLoading: true };
  }
  
  return auth0User;
}

