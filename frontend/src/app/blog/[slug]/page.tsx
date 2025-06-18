import { getBlogPostBySlug } from "@/app/lib/api";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center mt-5 p-4 text-center space-y-4 text-gray-700">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div className="prose prose-lg">
        <p>{post.content}</p>
      </div>
      <div className="mt-8">
        <a
          href="/blog"
          className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          Back to Blog
        </a>
      </div>
    </div>
  );
}
