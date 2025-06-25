// SocialLink.tsx
import type { ReactNode } from "react";

export interface SocialLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
}

export default function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </a>
  );
}
