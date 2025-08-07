"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/app/lib/api";
import type { User } from "@/types";

export default function AdminAddPostButton() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((user: User) => {
        if (user.role === "admin") setIsAdmin(true);
      })
      .catch(() => {
        // not logged in / not admin: stay hidden
      });
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="mb-6">
      <Link
        href="/blog/new"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Post
      </Link>
    </div>
  );
}
