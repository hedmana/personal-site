import React from "react";

export interface BlogPostHeaderProps {
  title: string;
  date: string;
}

export default function BlogPostHeader({ title, date }: BlogPostHeaderProps) {
  return (
    <header className="flex flex-col items-center space-y-2">
      <h1 className="text-4xl font-bold text-gray-700">{title}</h1>
      <time className="text-sm text-gray-500">
        {new Date(date).toLocaleDateString()}
      </time>
    </header>
  );
}
