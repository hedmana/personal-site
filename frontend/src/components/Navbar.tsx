"use client";

import { FaVirus, FaLongArrowAltLeft } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";
import UserMenu from "./UserMenu";
import GameLink from "./GameLink";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full px-6 py-4 bg-blue-500 flex justify-between items-center select-none">
      <GameLink />

      <div className="flex items-center space-x-6">
        <div className="flex space-x-4">
          {navLinks.map(({ href, label }) => (
            <NavItem
              key={href}
              href={href}
              label={label}
              current={pathname === href || pathname.startsWith(href + "/")}
            />
          ))}
        </div>

        <UserMenu />
      </div>
    </nav>
  );
}
