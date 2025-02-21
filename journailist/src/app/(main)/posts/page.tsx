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
  ratingList: string[]; // Assuming ratings are stored as strings
  reviewList: string[];
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/all`
      );

      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.length > 0 &&
          posts.map((post) => {
            const tag =
              post.ratingList.filter((rating) => rating === "0").length >
              post.ratingList.filter((rating) => rating === "1").length
                ? "Fake"
                : "True";

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
                      : "bg-green-500 text-white"
                  }`}
                >
                  {tag}
                </span>

                {/* Image */}
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={0}
                  height={0}
                  className="w-full h-40 object-cover rounded-t-lg"
                  unoptimized
                  sizes="100%"
                />

                {/* Title */}
                <div className="p-3">
                  <h3 className="text-lg font-bold text-brand">{post.title}</h3>

                  {/* Vote Buttons */}
                  <div className="flex justify-between mt-2">
                    <button className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded hover:bg-red-200">
                      Fake (
                      {
                        post.ratingList.filter((rating) => rating === "0")
                          .length
                      }
                      )
                    </button>

                    <button className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded hover:bg-green-200">
                      True (
                      {
                        post.ratingList.filter((rating) => rating === "1")
                          .length
                      }
                      )
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
