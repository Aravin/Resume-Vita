"use client";

import dynamic from "next/dynamic";
import ClientProviders from "./ClientProviders";

// Dynamically import ClientProviders to prevent SSR execution of Auth0Provider
const DynamicClientProviders = dynamic(() => Promise.resolve(ClientProviders), {
  ssr: false,
});

export default function ClientProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <DynamicClientProviders>{children}</DynamicClientProviders>;
}






