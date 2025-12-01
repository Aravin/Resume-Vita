// Force dynamic rendering for not-found page to prevent build-time Auth0 context errors
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



