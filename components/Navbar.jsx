"use client";

import logo from "@/assets/images/logo-white.png";
import profileDefault from "@/assets/images/profile.png";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import UnreadMessageCount from "./UnreadMessageCount";

function Navbar() {
  const { data: session, status } = useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  const mobileMenuRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const profileMenuRef = useRef(null);

  const pathName = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();

    const handleClickOutside = (event) => {
      // Close mobile menu if clicking outside (but not on the button itself)
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }

      // Close profile menu if clicking outside
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    // Add event listener when either menu is open
    if (isMobileMenuOpen || isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, isProfileMenuOpen]);

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 lg:px-8 sm:px-6">
        <div className="h-20 relative flex justify-between items-center">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex justify-center items-center p-2 text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white hover:text-white hover:bg-gray-700"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
              ref={mobileButtonRef}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6 block"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 justify-center items-center md:justify-start md:items-stretch">
            {/* <!-- Logo --> */}
            <Link className="flex-shrink-0 flex items-center" href="/">
              <Image className="w-auto h-10" src={logo} alt="PropertyPulse" />

              <span className="hidden ml-2 text-2xl font-bold text-white md:block">
                PropertyPulse
              </span>
            </Link>
            {/* s Desktop Menu Hidden below md screens --> */}

            <div className="hidden md:block md:ml-6">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className={`${
                    pathName === "/" ? "bg-black" : ""
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`${
                    pathName === "/properties" ? "bg-black" : ""
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Properties
                </Link>
                {session && (
                  <Link
                    href="/properties/add"
                    className={`${
                      pathName === "/properties/add" ? "bg-black" : ""
                    } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!session && status !== "loading" && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <button
                      key={index}
                      onClick={()=> signIn(provider.id)}
                      className="flex items-center px-3 py-2 text-white bg-gray-700 rounded-md hover:text-white hover:bg-gray-900"
                    >
                      <FaGoogle className="mr-2 text-white" />
                      <span>Login or Register</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
          {/* <!-- Right Side Menu (Logged In) --> */}
          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:pr-0 md:ml-6">
              <Link href="/messages" className="relative group">
                <button
                  type="button"
                  className="relative p-1 text-gray-400 bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:text-white"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
               <UnreadMessageCount />
              </Link>
              {/* <!-- Profile dropdown button --> */}
              <div className="relative ml-3" ref={profileMenuRef}>
                <div>
                  <button
                    type="button"
                    className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() =>
                      setIsProfileMenuOpen((prevState) => !prevState)
                    }
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="w-8 h-8 rounded-full"
                      src={session?.user?.image || profileDefault}
                      width={40}
                      height={40}
                      alt="User Profile"
                    />
                  </button> 
                </div>

                {/* <!-- Profile dropdown --> */}
                {isProfileMenuOpen && (
                  <div
                    id="user-menu"
                    className="ring-opacity-5 w-48 absolute right-0 z-10 py-1 mt-2 bg-white rounded-md ring-1 ring-black shadow-lg origin-top-right focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/properties/saved"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => setIsProfileMenuOpen(false)}

                    >
                      Saved Properties
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" ref={mobileMenuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`${
                pathName === "/" ? "bg-black" : ""
              } text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Home
            </Link>

            <Link
              href="/properties"
              className={`${
                pathName === "/properties" ? "bg-black" : ""
              } text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Properties
            </Link>
            {session && (
              <Link
                href="/properties/add"
                className={`${
                  pathName === "/properties/add" ? "bg-black" : ""
                } text-white block rounded-md px-3 py-2 text-base font-medium`}
              >
                Add Property
              </Link>
            )}
            {!session && status !== "loading" && providers && (
              Object.values(providers).map((provider, index) => (
                <button
                  key={index}
                  onClick={() => signIn(provider.id)}
                  className="flex items-center px-3 py-2 my-5 text-white bg-gray-700 rounded-md hover:text-white hover:bg-gray-900"
                >
                  <FaGoogle className="mr-2" />
                  <span>Login or Register</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;