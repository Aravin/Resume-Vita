"use client";

import Link from "next/link";
import { useState } from "react";

const GITHUB_REPO = "https://github.com/Aravin/Resume-Vita";
const DISCORD =
  "https://discord.com/channels/1444920496499200143/1444920497581326338";

function contactEmail() {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "aravin.it@gmail.com";
}

export type ErrorScreenProps = {
  title: string;
  description: string;
  /** Next.js error digest when available */
  digest?: string;
  /** Shown in mail subject / context, e.g. "500" or "Error" */
  code?: string;
  onTryAgain?: () => void;
};

export function ErrorScreen({
  title,
  description,
  digest,
  code = "Error",
  onTryAgain,
}: ErrorScreenProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subj = encodeURIComponent(`[Resume Vita] ${code} — help`);
    const body = encodeURIComponent(
      `What happened?\n${message}\n\n---\nReply-to: ${email || "(not provided)"}\nURL: ${typeof window !== "undefined" ? window.location.href : ""}\n${digest ? `Reference: ${digest}\n` : ""}`
    );
    window.location.href = `mailto:${contactEmail()}?subject=${subj}&body=${body}`;
  };

  const githubIssueUrl = `${GITHUB_REPO}/issues/new?title=${encodeURIComponent(
    "Issue on resumevita.com"
  )}&labels=bug&body=${encodeURIComponent(
    `## What happened\n\n## Page / URL\n${typeof window !== "undefined" ? window.location.href : ""}\n\n${digest ? `## Reference\n${digest}\n` : ""}`
  )}`;

  return (
    <div className="min-h-[65vh] flex items-center justify-center bg-base-100 px-4 py-10">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-error mb-3">{title}</h1>
          <p className="text-base-content/80 leading-relaxed">{description}</p>
          {digest ? (
            <p className="text-sm text-base-content/50 mt-3 font-mono break-all">
              Reference: {digest}
            </p>
          ) : null}
        </div>

        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body gap-5">
            <div>
              <h2 className="font-semibold text-base-content mb-2">Need help?</h2>
              <div className="flex flex-wrap gap-2">
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-sm gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                </a>
                <a
                  href={githubIssueUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Report issue
                </a>
                <a
                  href={DISCORD}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Discord
                </a>
              </div>
            </div>

            <div className="divider my-0 text-sm text-base-content/60">Contact</div>

            <form onSubmit={handleContactSubmit} className="flex flex-col gap-3">
              <label className="form-control w-full">
                <span className="label-text">Your email (optional)</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="input input-bordered w-full bg-base-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Message</span>
                <textarea
                  name="message"
                  className="textarea textarea-bordered w-full min-h-[108px] bg-base-100"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What were you trying to do?"
                  required
                />
              </label>
              <button type="submit" className="btn btn-primary">
                Open email to send
              </button>
              <p className="text-xs text-base-content/50">
                Opens your mail app with this message addressed to support. No data is stored on our
                servers from this form.
              </p>
            </form>

            <div className="flex flex-wrap gap-2 justify-center pt-1">
              {onTryAgain ? (
                <button type="button" className="btn btn-ghost" onClick={onTryAgain}>
                  Try again
                </button>
              ) : null}
              <Link href="/" className="btn btn-ghost">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
