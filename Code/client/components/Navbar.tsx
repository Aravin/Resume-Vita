"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { FaKey, FaSignOutAlt, FaFileAlt, FaCog, FaBlog, FaHome, FaLayerGroup, FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

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

const authenticatedNavigation: NavigationItem[] = [
  { name: (<><FaFileAlt className="inline-block mr-2" /> Your Resume</>), href: "/resume" },
  { name: (<><FaCog className="inline-block mr-2" /> Account & Settings</>), href: "/account" },
  { name: (<><FaBlog className="inline-block mr-2" /> Blog</>), href: "/blog" },
  { name: (<><FaSignOutAlt className="inline-block mr-2" /> Sign out</>), href: "/api/auth/logout?returnTo=/", isLogout: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = useMemo(() => {
    // During loading, show default navigation to prevent hydration mismatch
    if (isLoading) {
      return defaultNavigation;
    }
    return user ? authenticatedNavigation : defaultNavigation;
  }, [user, isLoading]);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    window.location.href = "/api/auth/logout?returnTo=/";
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };


  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar bg-primary shadow-lg sticky top-0 z-50">
        <div className="navbar-start">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              className="btn btn-ghost btn-circle text-white hover:bg-white/20 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>
          
          {/* Logo */}
          <Link href="/" aria-label="Home" className="btn btn-ghost hover:bg-white/10 transition-all duration-300">
            <Image
              src="/logo_white.png"
              width={180}
              height={35}
              alt="ResumeVita.com Logo"
              priority
              className="hover:scale-105 transition-transform duration-300 w-32 sm:w-40 md:w-48 lg:w-52 h-auto"
            />
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((nav, i) => (
              <li key={nav.href}>
                {nav.isLogout ? (
                  <button
                    onClick={handleLogoutClick}
                    className={`btn btn-ghost text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-lg ${
                      path === nav.href ? "bg-white/20 scale-105" : ""
                    }`}
                  >
                    {nav.name}
                  </button>
                ) : (
                  <Link
                    href={nav.href}
                    className={`btn btn-ghost text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-lg ${
                      path === nav.href ? "bg-white/20 scale-105" : ""
                    }`}
                    prefetch={nav.href.includes('/api/auth/') ? false : undefined}
                  >
                    {nav.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99999] lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed left-0 top-0 h-full w-80 bg-base-100 shadow-2xl overflow-y-auto">
            <div className="p-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-base-300">
                <Image
                  src="/logo_white.png"
                  width={120}
                  height={25}
                  alt="ResumeVita.com Logo"
                  className="w-24 h-auto"
                />
                <button 
                  className="btn btn-ghost btn-circle hover:bg-base-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-4">Navigation</h3>
                {navItems.map((nav, i) => (
                  <div key={nav.href} className="mb-2">
                    {nav.isLogout ? (
                      <button
                        onClick={(e) => {
                          handleLogoutClick(e);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition-all duration-300 hover:bg-primary hover:text-white ${
                          path === nav.href ? "bg-primary text-white shadow-md" : "hover:shadow-sm"
                        }`}
                      >
                        <span className="flex items-center space-x-3">
                          {nav.name}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={nav.href}
                        className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition-all duration-300 hover:bg-primary hover:text-white ${
                          path === nav.href ? "bg-primary text-white shadow-md" : "hover:shadow-sm"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="flex items-center space-x-3">
                          {nav.name}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Theme Toggle Section */}
              <div className="mt-8 pt-6 border-t border-base-300">
                <h3 className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-4">Settings</h3>
                <div className="bg-base-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-base-content">Theme</span>
                    <ThemeToggle isMobile={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleLogoutCancel}
          />
          
          {/* Modal */}
          <div className="relative bg-base-100 rounded-lg shadow-2xl p-6 m-4 max-w-md w-full">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-warning/20 mb-4">
                <FaSignOutAlt className="h-6 w-6 text-warning" />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-base-content mb-2">
                Confirm Sign Out
              </h3>
              
              {/* Message */}
              <p className="text-sm text-base-content/70 mb-6">
                Are you sure you want to sign out? You&apos;ll need to log in again to access your resume.
              </p>
              
              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleLogoutCancel}
                  className="btn btn-outline btn-sm px-6"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="btn btn-warning btn-sm px-6"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
