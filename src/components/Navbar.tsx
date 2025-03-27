"use client";

import Link from "next/link";
import { FaSkiing  } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="w-full px-6 py-4 bg-blue-500 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">
        <FaSkiing  className="text-3xl" />
      </h1>
      <div className="space-x-4">
        <Link
          href="/"
          className={`font-medium px-3 py-1 rounded transition-all duration-500 ${
            pathname === "/"
              ? "bg-white text-blue-600"
              : "text-white hover:bg-blue-500"
          }`}      
        >
          Home
        </Link>
        <Link 
          href="/projects" 
          className={`font-medium px-3 py-1 rounded transition-all duration-500 ${
            pathname === "/projects"
              ? "bg-white text-blue-600"
              : "text-white hover:bg-blue-500"
          }`}       
        >
          Projects
        </Link>
      </div>
    </nav>
  );
}
