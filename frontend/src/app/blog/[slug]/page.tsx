import { getBlogPostBySlug } from "@/app/lib/api";
import { notFound } from "next/navigation";
import BlogPostHeader from "@/components/BlogPostHeader";
import BlogPostContent from "@/components/BlogPostContent";
import BackButton from "@/components/BackButton";
import LikeButton from "@/components/LikeButton";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="flex flex-col items-center mt-5 p-4 text-center space-y-4">
      <BlogPostHeader title={post.title} date={post.date} />
      <BlogPostContent content={post.content} />
      <LikeButton slug={slug} />
      <BackButton href="/blog" label="Back to Blog" />
    </main>
  );
}
