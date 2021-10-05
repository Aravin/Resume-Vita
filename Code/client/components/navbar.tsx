/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Image from 'next/image';

let navigation = [{ name: '🔐 Login', href: '/api/auth/login', current: true }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const { user, error, isLoading } = useUser();

  if (user) {
    // navigation = [{ name: '📃 Edit Resume', href: '/resume/create', current: true }];
    navigation = [];
  } else {
    [{ name: '🔐 Login', href: '/api/auth/login', current: true }]
  }

  return (
    <Disclosure as="nav" className="bg-primary">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex sm:items-stretch sm:justify-start md:items-center md:justify-between">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-lg font-bold hidden sm:block h-8 w-auto">
                    <Link href="/" key="logo">📃 ResumeTree</Link>
                  </span>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-800 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {user &&
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="btn btn-ghost text-md font-bold capitalize">
                    👋🏻 Welcome, {user.nickname || user.name}!
                  </div>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-primary flex text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-neutral focus:ring-primary">
                        <span className="sr-only">Open user menu</span>
                        <div className="avatar">
                          <div className="rounded-full w-12 h-12 m-1">
                            <img src={user?.picture + ""} alt="ResumeTree Logged User Profile Picture" />
                          </div>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              <Link href="/resume/create" key="resume">📄 Your Resume</Link>
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              <Link href="/account/index" key="account">⚙️ Account & Settings</Link>
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              <Link href="/api/auth/logout" key="logout">🔓 Sign out</Link>
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              }
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
