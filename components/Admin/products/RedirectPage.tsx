"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RedirectPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
  return <div>Invalid Url...Redirecting</div>;
};

export default RedirectPage;
