export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
};

export async function getAllPosts() {
  const res = await fetch("http://localhost:5000/api/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(`http://localhost:5000/api/posts/${slug}`);
  if (!res.ok) return null;
  return await res.json();
}
