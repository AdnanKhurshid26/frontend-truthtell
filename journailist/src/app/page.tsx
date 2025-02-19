"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/video");
  }, []);

  return <div className="w-screen h-screen  bg-white"></div>;
};

export default Page;
