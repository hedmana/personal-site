import AdminAddPostButton from "@/components/AdminAddPostButton";
import { getBlogPosts } from "@/app/lib/api";
import PostList from "@/components/PostList";

export default async function BlogPage() {
  const posts = await getBlogPosts();

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
