import Link from "next/link";
import type { BlogPost } from "@/app/lib/api";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} key={post.slug}>
      <article className="border-b py-4 hover:text-blue-500 transition">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <time className="text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString()}
        </time>
      </article>
    </Link>
  );
}
