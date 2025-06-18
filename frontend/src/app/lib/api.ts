const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
};

export async function signup(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  localStorage.setItem("token", data.token); // Store token
  return data;
}

export async function getBlogPosts() {
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

export async function getBlogPostBySlug(slug: string) {
  const res = await fetch(`${API_URL}/posts/${slug}`);
  if (!res.ok) return null;
  return await res.json();
}
