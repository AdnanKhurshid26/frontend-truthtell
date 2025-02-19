"use client";

import { Button, Card, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-6 items-center justify-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Image src={"/logo.png"} width={60} height={60} alt="logo" />
        <Link
          href={"/"}
          className="text-brand hover:text-brand-dark font-medium text-3xl"
        >
          JournAiList
        </Link>
      </div>
      <Card className="flex flex-col w-3/12">
        <div>
          <div className="mb-2 block">
            <Label value="Your email" />
          </div>
          <TextInput
            color="primary"
            type="email"
            placeholder="john@doe.com"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Your Full Name" />
          </div>
          <TextInput
            color="primary"
            type="text"
            placeholder="John Doe"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Your Password" />
          </div>
          <TextInput
            color="primary"
            type="password"
            placeholder=""
            required
            shadow
          />
        </div>
        <Button color="primary" className="w-full">
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Page;
