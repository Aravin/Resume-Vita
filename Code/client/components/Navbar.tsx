"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { FaKey, FaSignOutAlt, FaFileAlt, FaCog, FaBlog, FaHome, FaLayerGroup, FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { useSafeUser } from "../hooks/useSafeUser";
import { trackLogin, trackLogout } from "../utils/gtag";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: React.ReactElement;
  href: string;
  isLogout?: boolean;
}

const defaultNavigation: NavigationItem[] = [
  { name: (<><FaLayerGroup className="inline-block mr-2" /> Features</>), href: "/features" },
  { name: (<><FaBlog className="inline-block mr-2" /> Blog</>), href: "/blog" },
  { name: (<><FaKey className="inline-block mr-2" /> Login</>), href: "/api/auth/login?returnTo=/resume" },
];

// Base logout URL - will be updated with full URL in component
const getAuthenticatedNavigation = (): NavigationItem[] => [
  { name: (<><FaFileAlt className="inline-block mr-2" /> Your Resume</>), href: "/resume" },
  { name: (<><FaCog className="inline-block mr-2" /> Account & Settings</>), href: "/account" },
  { name: (<><FaBlog className="inline-block mr-2" /> Blog</>), href: "/blog" },
  { name: (<><FaSignOutAlt className="inline-block mr-2" /> Sign out</>), href: "/api/auth/logout", isLogout: true },
];

export default function Navbar() {
  // Use safe user hook to prevent SSR issues
  // During SSR, this will return safe defaults
  const { user, error, isLoading } = useSafeUser();
  
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Move useMemo to the top to follow Rules of Hooks
  const navItems = useMemo(() => {
    // During loading, show default navigation to prevent hydration mismatch
    if (isLoading) {
      return defaultNavigation;
    }
    return user ? getAuthenticatedNavigation() : defaultNavigation;
  }, [user, isLoading]);

  const handleLoginClick = () => {
    trackLogin('google'); // Track login attempt
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    trackLogout(); // Track logout event
    const returnTo = encodeURIComponent(window.location.origin);
    window.location.href = `/api/auth/logout?returnTo=${returnTo}`;
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const desktopLinkClassName = (href: string) =>
    cn(
      buttonVariants({ variant: "ghost", size: "sm" }),
      "rounded-full border border-transparent px-4 text-white hover:bg-white/14 hover:text-white",
      path === href && "bg-white/18 text-white"
    );

  const mobileLinkClassName = (href: string) =>
    cn(
      "flex items-center rounded-xl px-4 py-3 text-sm font-medium text-white transition-colors",
      path === href
        ? "bg-white/18 text-white shadow-sm"
        : "hover:bg-white/12 hover:text-white"
    );

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-emerald-700/70 bg-emerald-600 text-white shadow-[0_12px_32px_rgba(5,150,105,0.26)] backdrop-blur supports-[backdrop-filter]:bg-emerald-600/95 dark:border-emerald-500/40 dark:bg-emerald-700/92 dark:shadow-[0_14px_36px_rgba(4,120,87,0.38)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                aria-label="Open navigation menu"
              >
                <FaBars className="size-4" />
              </Button>
            </div>

            <Link
              href="/"
              aria-label="Home"
              className="rounded-xl px-1 py-1 transition-opacity hover:opacity-95"
            >
              <Image
                src="/logo_white.png"
                width={180}
                height={35}
                alt="ResumeVita.com Logo"
                priority
                className="h-auto w-36 sm:w-44 md:w-48"
              />
            </Link>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((nav) =>
              nav.isLogout ? (
                <Button
                  key={nav.href}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleLogoutClick}
                  className="rounded-full px-4 text-white hover:bg-white/14 hover:text-white"
                >
                  {nav.name}
                </Button>
              ) : (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className={desktopLinkClassName(nav.href)}
                  prefetch={nav.href.includes('/api/auth/') ? false : undefined}
                  onClick={nav.href.includes('/api/auth/login') ? handleLoginClick : undefined}
                >
                  {nav.name}
                </Link>
              )
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent
          side="left"
          className="w-[20rem] border-r border-emerald-700/60 bg-emerald-700 text-white"
        >
          <SheetHeader className="space-y-3 pb-0 pr-12">
            <div className="flex items-center gap-3">
              <Image
                src="/logo_white.png"
                width={120}
                height={25}
                alt="ResumeVita.com Logo"
                className="h-auto w-28"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="ml-auto text-white hover:bg-white/10 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <FaTimes className="size-4" />
              </Button>
            </div>
            <div>
              <SheetTitle className="text-white">Navigation</SheetTitle>
              <SheetDescription className="text-white/75">
                Access your resume, account settings, and public pages.
              </SheetDescription>
            </div>
          </SheetHeader>

          <div className="space-y-2 px-4 pb-4">
            {navItems.map((nav) =>
              nav.isLogout ? (
                <Button
                  key={nav.href}
                  type="button"
                  variant="ghost"
                  className="w-full justify-start rounded-xl px-4 py-3 text-sm"
                  onClick={(event) => {
                    handleLogoutClick(event);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {nav.name}
                </Button>
              ) : (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className={mobileLinkClassName(nav.href)}
                  onClick={() => {
                    if (nav.href.includes('/api/auth/login')) {
                      handleLoginClick();
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {nav.name}
                </Link>
              )
            )}

            <Separator className="my-4 bg-white/15" />

            <div className="rounded-xl bg-white/10 p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Settings
              </p>
              <ThemeToggle isMobile={true} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="max-w-md" showCloseButton={false}>
          <DialogHeader className="space-y-3 pr-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <FaSignOutAlt className="size-5" />
            </div>
            <DialogTitle>Confirm Sign Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out? You&apos;ll need to log in again to access your resume.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button type="button" variant="outline" onClick={handleLogoutCancel}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleLogoutConfirm}>
              <FaSignOutAlt className="mr-2 size-4" />
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
