import Link from "next/link";
import React from "react";

export interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <div className="mt-8">
      <Link
        href={href}
        className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
      >
        {label}
      </Link>
    </div>
  );
}
