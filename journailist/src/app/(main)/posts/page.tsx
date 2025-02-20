"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const postsData = [
  {
    id: 1,
    title: "Post One",
    image:
      "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0",
    votes: { fake: 0, true: 1 },
  },
  {
    id: 2,
    title: "Post Two",
    image:
      "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0",
    votes: { fake: 3, true: 2 },
  },
  {
    id: 3,
    title: "Post Three",
    image:
      "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0",
    votes: { fake: 1, true: 2 },
  },
  {
    id: 4,
    title: "Post Four",
    image:
      "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0",
    votes: { fake: 0, true: 0 },
  },
  {
    id: 5,
    title: "Post Four",
    image:
      "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0",
    votes: { fake: 0, true: 0 },
  },
];

const Page = () => {
  const [posts] = useState(postsData);
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => {
          const tag = post.votes.fake > post.votes.true ? "Fake" : "True";

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
                src={post.image}
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
                    Fake ({post.votes.fake})
                  </button>

                  <button className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded hover:bg-green-200">
                    True ({post.votes.true})
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
