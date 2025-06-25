// components/NavItem.tsx
import Link from "next/link";
import cn from "classnames";

interface NavItemProps {
  href: string;
  label: string;
  current: boolean;
}

export function NavItem({ href, label, current }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "font-medium px-3 py-1 rounded transition-all duration-500",
        current
          ? "bg-white text-blue-600"
          : "text-white hover:bg-blue-300 hover:text-blue-600"
      )}
    >
      {label}
    </Link>
  );
}
