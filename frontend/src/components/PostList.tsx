import type { BlogPost } from "@/app/lib/api";
import PostCard from "./PostCard";

interface PostListProps {
  posts: BlogPost[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-gray-500">Blog posts could not be loaded.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
