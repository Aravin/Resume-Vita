// Force dynamic rendering to prevent build-time issues with Auth0
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



