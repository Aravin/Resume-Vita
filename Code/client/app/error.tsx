"use client";

import { useEffect } from "react";
import { ErrorScreen } from "../components/errors/ErrorScreen";

export default function ErrorBoundaryPage({
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
    <ErrorScreen
      title="Something went wrong"
      description="An unexpected error occurred while loading this page. You can try again, report on GitHub, or send us a quick note below."
      digest={error.digest}
      code="App error"
      onTryAgain={reset}
    />
  );
}
