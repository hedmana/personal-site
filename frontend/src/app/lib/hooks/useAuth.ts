"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // track route changes

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]); // update when route changes

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    logout,
  };
}
