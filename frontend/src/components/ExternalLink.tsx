// components/ExternalLink.tsx
import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";

export default function ExternalLink({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-700"
      {...props}
    >
      {children}
    </Link>
  );
}
