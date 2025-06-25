"use client";

import { FaUser } from "react-icons/fa";
import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/hooks/useAuth";

export default function UserMenu() {
  const { isLoggedIn, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 300);
  };

  const redirectWithMemory = (path: string) => {
    localStorage.setItem("redirectAfterLogin", pathname);
    router.push(path);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer"
    >
      {isLoggedIn ? (
        <FaUser className="w-6 h-6 text-white" />
      ) : (
        <span className="font-medium text-white">Sign up / in</span>
      )}

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
            >
              Sign out
            </button>
          ) : (
            ["login", "signup"].map((p) => (
              <button
                key={p}
                onClick={() => redirectWithMemory(`/${p}`)}
                className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                {p === "login" ? "Sign in" : "Sign up"}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}