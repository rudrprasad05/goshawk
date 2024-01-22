"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RedirectToSellerAuth = () => {
  const router = useRouter();
  const user = useSession();
  useEffect(() => {
    router.push(`/seller/auth/${user.data?.user.id}`);
  }, []);
  return <div>Invalid Seller Account...Redirecting</div>;
};

export default RedirectToSellerAuth;
