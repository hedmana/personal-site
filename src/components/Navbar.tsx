"use client";

import { useState } from "react";
import Link from "next/link";
import { FaVirus, FaLongArrowAltLeft } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [gameOpen, setGameOpen] = useState(false);

  const handleIconClick = () => {
    setGameOpen(!gameOpen);
  };

  return (
    <nav className="w-full px-6 py-4 bg-blue-500 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white flex items-center">
        <Link href="/NKCellGame" className="text-3xl mr-4 virus-flip">
          <FaVirus />
        </Link>
        <FaLongArrowAltLeft className="text-xl mr-2" />
        <span className="text-xs italic select-none">click me</span>
      </h1>
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
              ? "bg-white text-blue-500"
              : "text-white hover:bg-blue-300 hover:text-blue-600"
          }`}
        >
          Projects
        </Link>
      </div>
    </nav>
  );
}
