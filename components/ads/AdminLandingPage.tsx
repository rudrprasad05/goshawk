"use client";

import { Megaphone, Shield } from "lucide-react";
import React from "react";

import Header from "../Admin/Header";
import { AdType, AdsEndPoint } from "@/types";
import NewAdButton from "./NewAdButton";
import AwaitVerification from "../Admin/AwaitVerification";

const AdminLandingPage = ({ data }: { data: AdsEndPoint }) => {
  if (!data.seller.isVerified) {
    return <AwaitVerification />;
  }
  return (
    <>
      <div>
        <Header name="Your Ads">
          <Megaphone />
        </Header>
      </div>
      <div>
        <h1>Your Advertisements</h1>
        <YourAds ad={data.seller.ad} />
      </div>
      <div>
        <h1>Quick Actions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NewAdButton user={data.seller} />
        </div>
      </div>
    </>
  );
};

const YourAds = ({ ad }: { ad: AdType }) => {
  console.log(ad);
  if (!ad) return <div>You dont have any ads. Create one now</div>;
  return (
    <>
      <div>{ad.location}</div>
    </>
  );
};

export default AdminLandingPage;
