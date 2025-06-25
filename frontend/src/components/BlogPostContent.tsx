import React from "react";

export interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <article className="prose prose-lg text-gray-700">
      <p>{content}</p>
    </article>
  );
}
