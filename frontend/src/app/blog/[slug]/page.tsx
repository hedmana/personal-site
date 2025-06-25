import { getBlogPostBySlug } from "@/app/lib/api";
import { notFound } from "next/navigation";
import BlogPostHeader from "@/components/BlogPostHeader";
import BlogPostContent from "@/components/BlogPostContent";
import BackButton from "@/components/BackButton";

type Props = { params: { slug: string } };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="flex flex-col items-center mt-5 p-4 text-center space-y-4">
      <BlogPostHeader title={post.title} date={post.date} />
      <BlogPostContent content={post.content} />
      <BackButton href="/blog" label="Back to Blog" />
    </main>
  );
}
