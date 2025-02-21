"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ratingList?: string[]; // Optional for safety
  reviewList?: string[];
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/all`
        );

        console.log("API Response:", data); // Debugging

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Unexpected API response format", data);
          setPosts([]); // Ensure posts is always an array
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Prevents undefined state
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => {
            // Count "Fake" and "True" votes properly
            const fakeCount =
              post.ratingList?.filter((r) => Number(r) >= 5.0).length || 0;
            const trueCount =
              post.ratingList?.filter((r) => Number(r) <= 5.0).length || 0;

            // Check for invalid values
            const invalidCount =
              post.ratingList?.filter((r) => r !== "0" && r !== "1").length ||
              0;

            let tag = "Unverified";
            if (fakeCount > trueCount) {
              tag = "Fake";
            } else if (trueCount > fakeCount) {
              tag = "True";
            }

            return (
              <div
                key={post.id}
                className="relative bg-white border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                onClick={() => router.push(`/posts/${post.id}`)}
              >
                {/* Fake/True Tag */}
                <span
                  className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold uppercase rounded ${
                    tag === "Fake"
                      ? "bg-red-500 text-white"
                      : tag === "True"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {tag}
                </span>

                {/* Image */}
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-t-lg"
                  unoptimized
                />

                {/* Title */}
                <div className="p-3">
                  <h3 className="text-lg font-bold text-brand">{post.title}</h3>

                  {/* Vote Buttons */}
                  <div className="flex justify-between mt-2">
                    <button className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded hover:bg-red-200">
                      Fake ({fakeCount})
                    </button>

                    <button className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded hover:bg-green-200">
                      True ({trueCount})
                    </button>
                  </div>

                  {/* Show invalid votes if any */}
                  {invalidCount > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      ⚠️ {invalidCount} unverified votes detected
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Page;
