"use client";

import axios from "axios";
import { Button, Textarea } from "flowbite-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ratingList: string[]; // Assuming ratings are stored as strings
  reviewList: string[];
}

const PostDetails: React.FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  const [vote, setVote] = useState("");
  const [comment, setComment] = useState("");

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`
    );

    setPost(data);
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  const handleSubmit = async () => {
    if (vote === "") return;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/addRatingAndReview/${postId}`,
        {
          rating: vote,
          review: comment,
        }
      );

      fetchPost();
      setComment("");
      setVote("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      <div className="w-full h-full overflow-y-auto border-r p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mt-4 text-brand">{post.title}</h1>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={0}
          height={0}
          className="w-full h-auto object-cover rounded-t-lg"
          unoptimized
          sizes="100%"
        />
        <div>{post.description}</div>
      </div>

      <div className="w-4/12 p-6 flex flex-col gap-4 sticky top-0 h-screen overflow-y-auto">
        <div className="text-xl font-semibold text-brand">
          Give your vote:&nbsp;
        </div>
        <div className="flex gap-4">
          <Button
            size="sm"
            color={vote === "0" ? "failure" : "light"}
            onClick={() => setVote("0")}
            className={vote === "0" ? "border-2 border-red-700" : ""}
          >
            {`Fake (
  ${
    post.ratingList.filter((rating) => rating === "0").length +
    (vote === "0" ? 1 : 0)
  }
)`}
          </Button>
          <Button
            size="sm"
            color={vote === "1" ? "success" : "light"}
            onClick={() => setVote("1")}
            className={vote === "1" ? "border-2 border-green-700" : ""}
          >
            {`True (
  ${
    post.ratingList.filter((rating) => rating === "1").length +
    (vote === "1" ? 1 : 0)
  }
)`}
          </Button>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Add a comment..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleSubmit} color="primary" type="submit">
            Submit
          </Button>
        </div>

        <div className="text-lg font-medium text-brand">Votes:&nbsp;</div>

        <div className="w-full flex flex-col gap-4">
          {post.reviewList
            .filter((review) => review !== "")
            .map((review, index) => (
              <div
                key={index}
                className="w-full flex flex-col gap-2 relative p-2 border rounded"
              >
                <span
                  className={`w-12 text-center px-2 py-1 text-xs font-bold uppercase rounded ${
                    post.ratingList[index] === "0"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {post.ratingList[index] === "0" ? "Fake" : "True"}
                </span>
                <div>{review}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
