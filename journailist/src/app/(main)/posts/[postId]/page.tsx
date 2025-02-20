"use client";

import { Button, TextInput, Textarea } from "flowbite-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface VoteCount {
  fake: number;
  true: number;
}

interface Post {
  id: number;
  title: string;
  image: string;
  votes: VoteCount;
}

const postsData: Post[] = [
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

const PostDetails: React.FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<{ link: string; comment: string }>({
    link: "",
    comment: "",
  });
  const [userVote, setUserVote] = useState<"fake" | "true" | null>(null);

  useEffect(() => {
    const foundPost = postsData.find((p) => p.id === Number(postId)) || null;
    setPost(foundPost);
  }, [postId]);

  
  if (!post) return <p className="text-center mt-10">Loading...</p>;

  const handleVote = (type: "fake" | "true") => {
    // If user already voted for this type, do nothing
    if (userVote === type) return;

    // Calculate vote changes
    const voteChanges = {
      fake: 0,
      true: 0
    };

    // If switching votes, decrement previous vote
    if (userVote) {
      voteChanges[userVote] = -1;
    }

    // Increment new vote
    voteChanges[type] = 1;

    // Update post votes
    setPost((prevPost) => {
      if (!prevPost) return null;
      return {
        ...prevPost,
        votes: {
          fake: prevPost.votes.fake + voteChanges.fake,
          true: prevPost.votes.true + voteChanges.true
        }
      };
    });

    // Update user's vote
    setUserVote(type);
  };

  


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted link: ${formData.link} \nComment: ${formData.comment}`);
    setFormData({ link: "", comment: "" });
  };

  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      {/* Left: Scrollable Column */}
      <div className="w-full h-full overflow-y-auto border-r p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
        <Image
          src={post.image}
          alt={post.title}
          width={0}
          height={0}
          className="w-full h-auto object-cover rounded-t-lg"
          unoptimized
          sizes="100%"
        />
        {/* Add more scrollable content here if needed */}
        <div className="h-96 bg-gray-100 rounded p-4 mb-4">
          Additional content can go here to demonstrate scrolling
        </div>
        <div className="h-96 bg-gray-100 rounded p-4 mb-4">
          More content to show scrolling behavior
        </div>
      </div>

      {/* Right: Sticky Form Section */}
      <div className="w-4/12 p-6 flex flex-col gap-4 sticky top-0 h-screen overflow-y-auto">
        {/* Vote Buttons (Highlight active vote) */}
        <div className="flex gap-4">
          <Button
          size="sm"
            color={userVote === "fake" ? "failure" : "light"}
            onClick={() => handleVote("fake")}
            className={userVote === "fake" ? "border-2 border-red-700" : ""}
          >
            Fake ({post.votes.fake})
          </Button>
          <Button
          size="sm"
            color={userVote === "true" ? "success" : "light"}
            onClick={() => handleVote("true")}
            className={userVote === "true" ? "border-2 border-green-700" : ""}
          >
            True ({post.votes.true})
          </Button>
        </div>

        {/* Form for Submitting Links */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            type="url"
            placeholder="Enter supporting link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            required
          />
          <Textarea
            placeholder="Add a comment..."
            rows={4}
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;