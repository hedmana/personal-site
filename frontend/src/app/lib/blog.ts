const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
};

export async function getAllPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) {
      console.error("Non-OK response:", res.status);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(`${API_URL}/posts/${slug}`);
  if (!res.ok) return null;
  return await res.json();
}
