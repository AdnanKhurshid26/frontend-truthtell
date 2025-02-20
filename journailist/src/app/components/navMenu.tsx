"use client";

import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMenu = () => {
  const pathname = usePathname();

  const currentPath = pathname.split("/")[1];

  return (
    <div className="w-full p-6 px-24 flex justify-between items-center">
      <div className="flex gap-4 justify-center items-center">
        <Image src={"/logo.png"} width={40} height={40} alt="logo" />
        <Link
          href={"/"}
          className="text-brand hover:text-brand-dark font-medium text-xl"
        >
          JournAiLlist
        </Link>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Button
          size="sm"
          className="w-24"
          color={currentPath == "video" ? "primary" : "secondary"}
        >
          <Link href={"/video"}>Video</Link>
        </Button>
        <Button
          className="w-24"
          size="sm"
          color={currentPath == "posts" ? "primary" : "secondary"}
        >
          <Link href={"/posts"}>Posts</Link>
        </Button>
      </div>
    </div>
  );
};

export default NavMenu;
