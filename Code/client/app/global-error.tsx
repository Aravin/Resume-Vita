'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { logError, formatErrorMessage, getGitHubIssueUrl, DISCORD_URL } from '../utils/errorTracking';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error
    logError(error, {
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
  }, [error]);

  const errorMessage = formatErrorMessage(error);
  const githubIssueUrl = getGitHubIssueUrl(error, {
    path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  });

  return (
    <html lang="en" data-theme="emerald">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-error mb-4">500</h1>
              <h2 className="text-3xl font-semibold text-base-content mb-4">
                Critical Error
              </h2>
              <p className="text-lg text-base-content/70 mb-6">
                {errorMessage}
              </p>
              {error.digest && (
                <p className="text-sm text-base-content/50 mb-4">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="card bg-base-200 shadow-xl mb-6">
              <div className="card-body">
                <h3 className="card-title justify-center mb-4">Need Help?</h3>
                <div className="flex flex-col gap-4">
                  <a
                    href={githubIssueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-outline"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Report Issue on GitHub
                  </a>
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-outline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Get Help on Discord
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="btn btn-primary"
              >
                Try Again
              </button>
              <Link href="/" className="btn btn-outline">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

