export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  like_count: number;
};

export type Project = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
};

export type User = {
  id: number;
  username: string;
  role: string;
};
