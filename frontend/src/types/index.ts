export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  like_count: number;
};

export type User = {
  id: number;
  username: string;
  role: string;
};
