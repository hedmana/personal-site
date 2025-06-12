import Link from "next/link";
import { getAllPosts } from "@/app/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="p-4 text-gray-700">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <div className="">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <div className="border-b py-4 hover:text-blue-500 transition">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}