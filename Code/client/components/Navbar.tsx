"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaKey, FaSignOutAlt, FaFileAlt, FaCog, FaBlog } from "react-icons/fa";

const defaultNavigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: (<><FaBlog className="inline-block mr-1" /> Blog</>), href: "/blog" },
  { name: (<><FaKey className="inline-block mr-1" /> Login</>), href: "/api/auth/login" },
];

const authenticatedNavigation = [
  { name: (<><FaFileAlt className="inline-block mr-1" /> Your Resume</>), href: "/resume" },
  { name: (<><FaCog className="inline-block mr-1" /> Account & Settings</>), href: "/account" },
  { name: (<><FaBlog className="inline-block mr-1" /> Blog</>), href: "/blog" },
  { name: (<><FaSignOutAlt className="inline-block mr-1" /> Sign out</>), href: "/api/auth/logout" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const path = usePathname();

  const navigation = useMemo(() => {
    return user ? authenticatedNavigation : defaultNavigation;
  }, [user]);

  if (isLoading) {
    return <nav className="navbar bg-primary animate-pulse"></nav>;
  }

  return (
    <nav className="navbar bg-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navigation.map((nav, i) => (
              <li key={nav.href}>
                <Link
                  href={nav.href}
                  className={classNames(path === nav.href ? "active" : "")}
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" aria-label="Home">
          <Image
            src="/logo_white.png"
            width={180}
            height={35}
            alt="ResumeVita.com Logo"
            priority
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          {navigation.map((nav, i) => (
            <li key={nav.href}>
              <Link
                href={nav.href}
                className={classNames(path === nav.href ? "active" : "")}
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
