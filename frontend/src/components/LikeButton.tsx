"use client";

import { useEffect, useState } from "react";

type LikeButtonProps = {
  slug: string;
};

export default function LikeButton({ slug }: LikeButtonProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const [count, setCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        if (token) {
          // User is logged in - fetch full like data including their like status
          const res = await fetch(`${baseUrl}/api/posts/${slug}/likes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setCount(data.count);
            setLiked(data.liked); // This should come from your backend
          } else if (res.status === 401) {
            // Token invalid, clear it and fetch public data
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            await fetchPublicLikeCount();
          } else {
            // Other error, fall back to public data
            await fetchPublicLikeCount();
          }
        } else {
          // User not logged in - only fetch like count
          await fetchPublicLikeCount();
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
        await fetchPublicLikeCount();
      } finally {
        setLoading(false);
      }
    };

    const fetchPublicLikeCount = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/posts/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setCount(data.like_count || 0);
          setLiked(false); // Not logged in, so can't be liked by user
        }
      } catch (error) {
        console.error("Error fetching public like count:", error);
        setCount(0);
        setLiked(false);
      }
    };

    fetchLikes();
  }, [slug, baseUrl]);

  const toggleLike = async () => {
    if (!isLoggedIn) {
      alert("Please log in to like posts!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/api/posts/${slug}/likes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setLiked(data.liked);
        setCount(data.count);
      } else if (res.status === 401) {
        alert("Please log in to like posts!");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } else {
        alert("Could not toggle like. Please try again.");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-400">Loading likes…</p>;
  }

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        onClick={toggleLike}
        className={`px-4 py-2 rounded text-sm font-medium transition ${
          liked
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        } ${!isLoggedIn ? "opacity-75" : ""}`}
      >
        {liked ? "♥ Unlike" : "♡ Like"}
      </button>
      <span className="text-sm text-gray-600">
        {count} {count === 1 ? "like" : "likes"}
      </span>
      {!isLoggedIn && (
        <span className="text-xs text-gray-500 ml-2">(Login to like)</span>
      )}
    </div>
  );
}
