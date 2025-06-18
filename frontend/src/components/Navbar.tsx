"use client";

import Link from "next/link";
import { FaVirus, FaLongArrowAltLeft, FaUser } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // cancel any pending close
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setDropdownOpen(false), 300); // slight delay
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleRedirectWithMemory = (path: string) => {
    localStorage.setItem("redirectAfterLogin", pathname);
    router.push(path);
  };

  return (
    <nav className="w-full px-6 py-4 bg-blue-500 flex justify-between items-center select-none">
      <h1 className="text-xl font-bold text-white flex items-center">
        <Link href="/NKCellGame" className="text-3xl mr-4 virus-flip">
          <FaVirus />
        </Link>
        <FaLongArrowAltLeft className="text-xl mr-2" />
        <span className="text-xs italic select-none">click me</span>
      </h1>

      <div className="flex items-center space-x-6 relative">
        <div className="space-x-4">
          <Link
            href="/"
            className={`font-medium px-3 py-1 rounded transition-all duration-500 ${
              pathname === "/"
                ? "bg-white text-blue-600"
                : "text-white hover:bg-blue-300 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`font-medium px-3 py-1 rounded transition-all duration-500 ${
              pathname === "/projects"
                ? "bg-white text-blue-600"
                : "text-white hover:bg-blue-300 hover:text-blue-600"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className={`font-medium px-3 py-1 rounded transition-all duration-500 ${
              pathname.startsWith("/blog")
                ? "bg-white text-blue-600"
                : "text-white hover:bg-blue-300 hover:text-blue-600"
            }`}
          >
            Blog
          </Link>
        </div>

        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative cursor-pointer text-white"
        >
          {isLoggedIn ? (
            <FaUser className="w-6 h-6" />
          ) : (
            <span className="font-medium">Sign up / in</span>
          )}

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleRedirectWithMemory("/login")}
                    className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                  > 
                    Sign in
                  </button>
                  <button
                    onClick={() => handleRedirectWithMemory("/signup")}
                    className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
