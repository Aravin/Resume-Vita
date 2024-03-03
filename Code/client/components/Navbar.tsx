"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

let navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Login", href: "/api/auth/login" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const path = usePathname();

  if (user) {
    navigation = [
      { name: "⚙️ Account & Settings", href: "/account" },
      { name: "🔓 Sign out", href: "/api/auth/logout" },
    ];
  }

  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navigation.map((nav, i) => {
              return (
                <li key={i}>
                  <a
                    href={nav.href}
                    key={i}
                    className={classNames(path === nav.href ? "active" : "")}
                  >
                    {nav.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" href="/" key="logo">
          <Image
            src="/logo_white.png"
            width="180"
            height="35"
            alt="ResumeVita.com Logo"
          ></Image>
        </Link>
      </div>
      {/* <div className="navbar-center hidden lg:flex">
        
      </div> */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user ? (
            <li>
              <Link
                href="/resume"
                className={classNames(path === "/resume" ? "active" : "")}
              >
                📄 Your Resume
              </Link>
            </li>
          ) : (
            navigation.map((nav, i) => {
              return (
                <li key={i}>
                  <a
                    href={nav.href}
                    key={i}
                    className={classNames(path === nav.href ? "active" : "")}
                  >
                    {nav.name}
                  </a>
                </li>
              );
            })
          )}
        </ul>
        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.picture + ""} alt="profile image" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
            >
              {navigation.map((nav, i) => {
                return (
                  <li key={i}>
                    <a
                      href={nav.href}
                      key={i}
                      className={classNames(path === nav.href ? "active" : "")}
                    >
                      {nav.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
