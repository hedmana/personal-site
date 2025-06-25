import Link from "next/link";
import { getBlogPosts, BlogPost } from "@/app/lib/api";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="p-4 text-gray-700">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <p className="mb-4">Create an account to like and comment on posts :)</p>
      <div>
        {posts.length > 0 ? (
          posts.map((post: BlogPost) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div className="border-b py-4 hover:text-blue-500 transition">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">Blog posts could not be loaded.</p>
        )}
      </div>
    </main>
  );
}
