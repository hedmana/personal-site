export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Welcome to My Blog",
    slug: "welcome",
    date: "2025-06-12",
    content: "This is my first blog post. Stay tuned for more!",
  },
  {
    title: "Why I Built This Site",
    slug: "why-this-site",
    date: "2025-06-10",
    content:
      "I wanted to showcase my skills and learn modern full-stack development.",
  },
];

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
