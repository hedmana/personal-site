import { BlogPost, User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Create new user account
export async function signup(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
}

// Login user and store token
export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  localStorage.setItem("token", data.token); // Store token
  return data;
}

// Get all blog posts
export async function getBlogPosts() {
  try {
    const res = await fetch(`${API_URL}/api/posts`);
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

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const res = await fetch(`${API_URL}/api/posts/${slug}`);
  if (!res.ok) return null;
  return await res.json();
}

// Create new blog post (admin only)
export async function createBlogPost(input: {
  title: string;
  date: string;
  content: string;
}): Promise<BlogPost> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create post");
  }
  return data;
}

// Get current logged in user
export async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }
  return res.json();
}
