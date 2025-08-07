"use client";

import { useEffect, useState } from "react";
import AdminAddPostButton from "@/components/AdminAddPostButton";
import { getBlogPosts } from "@/app/lib/api";
import PostList from "@/components/PostList";
import type { BlogPost } from "@/types";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getBlogPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Refetch posts when the page becomes visible (user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        getBlogPosts().then(setPosts);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (loading) {
    return (
      <main className="p-4 text-gray-700">
        <header className="mb-6">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="mt-2">Loading posts...</p>
        </header>
      </main>
    );
  }

  return (
    <main className="p-4 text-gray-700">
      <header className="mb-6">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-2">Create an account to like posts :)</p>
      </header>
      <AdminAddPostButton />
      <PostList posts={posts} />
    </main>
  );
}
