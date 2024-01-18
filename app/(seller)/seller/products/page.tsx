"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.back();
  }, []);
  return <div>Invalid Url...Redirecting</div>;
};

export default page;
