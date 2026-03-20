"use client";

import { useEffect } from "react";
import { ErrorScreen } from "../components/errors/ErrorScreen";
import "../styles/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" data-theme="emerald">
      <body className="min-h-screen antialiased">
        <ErrorScreen
          title="Something went wrong"
          description="A critical error occurred. Please try again. If it keeps happening, use the links below to get help."
          digest={error.digest}
          code="Critical error"
          onTryAgain={reset}
        />
      </body>
    </html>
  );
}
