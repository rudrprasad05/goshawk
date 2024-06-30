"use client";

import { Lock } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";

const VerifyEmailFirst = () => {
  const router = useRouter();

  const reload = () => {
    location.reload();
  };
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col items-center">
        <Lock className="w-16 h-16 text-primary" />
        <h1 className="text-2xl ">Verify email first</h1>
        <h3 className="my-2">Already Verified?</h3>
        <span>
          <Button onClick={reload} variant="link">
            Reload
          </Button>
        </span>
      </div>
    </div>
  );
};

export default VerifyEmailFirst;
