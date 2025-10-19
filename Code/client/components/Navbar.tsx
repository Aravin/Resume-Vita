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
  { name: (<><FaHome className="inline-block mr-2" /> Home</>), href: "/" },
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

  const navItems = useMemo(() => {
    // During loading, show default navigation to prevent hydration mismatch
    if (isLoading) {
      return defaultNavigation;
    }
    return user ? authenticatedNavigation : defaultNavigation;
  }, [user, isLoading]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar bg-primary shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Menu Button */}
        <div className="dropdown lg:hidden">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle text-white hover:bg-white/20 transition-all duration-300"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </div>
          
          {/* Mobile Menu Dropdown */}
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-64 transform transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            {navItems.map((nav, i) => (
              <li key={nav.href}>
                {nav.isLogout ? (
                  <a
                    href={nav.href}
                    className={`link transition-all duration-300 hover:bg-primary hover:text-white rounded-lg ${
                      path === nav.href ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {nav.name}
                  </a>
                ) : (
                  <Link
                    href={nav.href}
                    className={`link transition-all duration-300 hover:bg-primary hover:text-white rounded-lg ${
                      path === nav.href ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {nav.name}
                  </Link>
                )}
              </li>
            ))}
            {/* Mobile Theme Toggle */}
            <li className="divider my-2"></li>
            <li>
              <div className="px-2">
                <ThemeToggle />
              </div>
            </li>
          </ul>
        </div>
        
        {/* Logo */}
        <Link href="/" aria-label="Home" className="btn btn-ghost hover:bg-white/10 transition-all duration-300">
          <Image
            src="/logo_white.png"
            width={180}
            height={35}
            alt="ResumeVita.com Logo"
            priority
            className="hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((nav, i) => (
            <li key={nav.href}>
              {nav.isLogout ? (
                <a
                  href={nav.href}
                  className={`btn btn-ghost text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-lg ${
                    path === nav.href ? "bg-white/20 scale-105" : ""
                  }`}
                >
                  {nav.name}
                </a>
              ) : (
                <Link
                  href={nav.href}
                  className={`btn btn-ghost text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-lg ${
                    path === nav.href ? "bg-white/20 scale-105" : ""
                  }`}
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
  );
}
