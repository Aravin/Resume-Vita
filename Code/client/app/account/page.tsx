"use client";

// Prevent static generation for pages that require authentication
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import React from "react";
import { useSafeUser } from "../../hooks/useSafeUser";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FaEnvelope, FaPhoneAlt, FaShieldAlt, FaUserCircle } from "react-icons/fa";
import Loader from "../../components/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type AccountUser = {
  name?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  preferred_username?: string | null;
  nickname?: string | null;
  email?: string | null;
  email_verified?: boolean | null;
  phone_number?: string | null;
  phone_number_verified?: boolean | null;
  sub?: string | null;
};

// Helper function to get authentication provider name
function getAuthProvider(sub?: string): string {
  if (!sub) return "-";
  
  const provider = sub.split("|")[0];
  
  // Map Auth0 provider identifiers to user-friendly names
  const providerMap: Record<string, string> = {
    "auth0": "Email",
    "google-oauth2": "Google",
    "linkedin": "LinkedIn",
    "facebook": "Facebook",
    "apple": "Apple",
    "github": "GitHub",
    "twitter": "Twitter",
    "windowslive": "Microsoft",
    "linkedin-oauth2": "LinkedIn",
  };
  
  return providerMap[provider] || provider;
}

function getDisplayName(user: AccountUser | null | undefined): string {
  const combinedName = [user?.given_name, user?.family_name].filter(Boolean).join(" ").trim();

  return (
    user?.name?.trim() ||
    combinedName ||
    user?.nickname?.trim() ||
    user?.preferred_username?.trim() ||
    user?.email?.split("@")[0] ||
    "Resume Vita User"
  );
}

function getDisplayUsername(user: AccountUser | null | undefined): string | null {
  return (
    user?.preferred_username?.trim() ||
    user?.nickname?.trim() ||
    user?.email?.split("@")[0] ||
    null
  );
}

export default function Page() {
  const { user, error, isLoading } = useSafeUser();

  // Set document title
  React.useEffect(() => {
    document.title = "Account & Settings - ResumeVita.com";
  }, []);

  const fullName = getDisplayName(user);
  const username = getDisplayUsername(user);
  const email = user?.email?.trim() || null;
  const phoneNumber = user?.phone_number?.trim() || null;
  const authProvider = getAuthProvider(user?.sub);
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "RV";

  const accountDetails = [
    { label: "Full name", value: fullName },
    { label: "Username", value: username || "Not available" },
    { label: "Email", value: email || "Not available", verified: Boolean(email) ? Boolean(user?.email_verified) : undefined },
    { label: "Authentication Provider", value: authProvider },
    { label: "Phone number", value: phoneNumber || "Not added", verified: phoneNumber ? Boolean(user?.phone_number_verified) : undefined },
  ];

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Card>
          <CardContent className="p-6 text-sm text-destructive">{error.message}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Account
          </p>
          <h1 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
            Account & Settings
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
            Review your profile details, verification status, and the sign-in provider connected to your Resume Vita account.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="bg-card/90 shadow-sm">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/12 text-xl font-bold text-primary">
                  {initials}
                </div>
                <div>
                  <CardTitle className="text-2xl">{fullName}</CardTitle>
                  <CardDescription className="mt-1">
                    {username ? `@${username}` : authProvider}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email verification</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {!email
                        ? "This provider did not supply an email address for the account."
                        : user?.email_verified
                        ? "Your email is verified and ready for account recovery and sign-in checks."
                        : "Your email is not verified yet."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <FaShieldAlt className="mt-1 h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Authentication provider</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Signed in with <span className="font-medium text-foreground">{authProvider}</span>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <FaPhoneAlt className="mt-1 h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone status</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {phoneNumber
                        ? user?.phone_number_verified
                          ? "Phone number is present and verified."
                          : "Phone number is present but not verified."
                        : "No phone number has been added to this account yet."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/90 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FaUserCircle className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Personal Details</CardTitle>
                  <CardDescription>
                    Core profile fields currently associated with your account.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accountDetails.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <div className="grid gap-2 md:grid-cols-[180px_1fr] md:gap-6">
                      <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-foreground">
                        <span>{item.value}</span>
                        {typeof item.verified === "boolean" && (
                          item.verified ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                              <AiOutlineCheckCircle className="h-4 w-4" aria-hidden="true" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/12 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                              <AiOutlineCloseCircle className="h-4 w-4" aria-hidden="true" />
                              Not verified
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    {index < accountDetails.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
