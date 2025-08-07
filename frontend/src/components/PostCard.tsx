import Link from "next/link";
import type { BlogPost } from "@/types";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} key={post.slug}>
      <article className="border-b py-4 hover:text-blue-500 transition">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <time className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </time>
          </div>
          <p className="text-sm text-gray-600 whitespace-nowrap mt-10">
            {post.like_count} {post.like_count === 1 ? "like" : "likes"}
          </p>
        </div>
      </article>
    </Link>
  );
}
