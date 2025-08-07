// frontend/src/app/blog/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/app/lib/api";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const post = await createBlogPost({ title, date, content });
      // Redirect to the new post’s page
      router.push(`/blog/${post.slug}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-2xl mx-auto text-gray-700">
      <h1 className="text-3xl font-bold mb-6">New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="w-full border p-2 rounded resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting…" : "Create Post"}
        </button>
      </form>
    </main>
  );
}
