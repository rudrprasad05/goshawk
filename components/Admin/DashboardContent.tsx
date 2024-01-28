"use server";

import { UserType } from "@/types";
import { Presentation, Shield } from "lucide-react";
import React from "react";
import { HiSpeakerphone } from "react-icons/hi";
import Header from "./Header";
import NewProductButton from "./NewProductButton";
import OrderCount from "./OrderCount";
import ProductCount from "./ProductCount";
import AwaitVerification from "./AwaitVerification";
import { MdHeadset } from "react-icons/md";
import Link from "next/link";

const DashboardContent = ({ user }: { user: UserType }) => {
  if (!user.seller.isVerified) {
    return <AwaitVerification />;
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <Header name="Dashboard">
          <Shield />
        </Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NewProductButton user={user} />
          <NewAdButton />
          <NewProductButton user={user} />
          <NewProductButton user={user} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <OrderCount />
          <ProductCount user={user} />
        </div>
      </div>
    </>
  );
};

const NewAdButton = () => {
  return (
    <Link href={"/seller/ads"}>
      <div className="bg-border duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
        <div className="font-light text-2xl text-primary">Advertisment</div>
        <div className="absolute bottom-5 right-5">
          <HiSpeakerphone className="group-hover:h-28 group-hover:w-28 group-hover:fill-muted-foreground/20 duration-200  w-16 h-16 stroke fill-muted-foreground" />
        </div>
        <div className=" text-muted-foreground">New</div>
      </div>
    </Link>
  );
};

export default DashboardContent;
