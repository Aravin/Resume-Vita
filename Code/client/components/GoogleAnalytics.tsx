"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "../utils/gtag";

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrlRef = useRef<string | null>(null);
  const isInitialMountRef = useRef<boolean>(true);

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      // Construct full URL with search params
      const searchString = searchParams?.toString() || "";
      const url = pathname + (searchString ? `?${searchString}` : "");
      
      // On initial mount, initialize the ref with current URL to prevent duplicate tracking
      // (the initial page view is already tracked by the inline script in layout.tsx)
      if (isInitialMountRef.current) {
        previousUrlRef.current = url;
        isInitialMountRef.current = false;
        return;
      }
      
      // Only track if URL has actually changed
      if (url !== previousUrlRef.current) {
        previousUrlRef.current = url;
        trackPageView(url);
      }
    }
  }, [pathname, searchParams]);

  return null;
}

