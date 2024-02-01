"use client";

import { Megaphone, MessageSquarePlus, Shield } from "lucide-react";
import React from "react";

import Header from "../Admin/Header";
import { AdType, AdsEndPoint, BillboardType } from "@/types";
import NewAdButton from "./NewAdButton";
import AwaitVerification from "../Admin/AwaitVerification";
import LandingPageHorizontal from "./LandingPageHorizontal";
import AdControls from "./AdControls";

const AdLandingPage = ({
  data,
  billboards,
}: {
  data: AdsEndPoint;
  billboards: BillboardType[];
}) => {
  if (!data.isVerified) {
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
        <YourAds ads={data.ads} />
      </div>
      <div>
        <Header showProfile={false} name="Quick Actions">
          <MessageSquarePlus />
        </Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
          <NewAdButton billboards={billboards} user={data} />
        </div>
      </div>
    </>
  );
};

const YourAds = ({ ads }: { ads: AdType[] }) => {
  if (!ads || ads.length == 0)
    return <div className="py-6">You dont have any ads. Create one now</div>;
  return (
    <>
      {ads?.map((i) => (
        <div key={i.id} className="my-6 relative">
          <LandingPageHorizontal src={i} />
          <AdControls ad={i} />
        </div>
      ))}
    </>
  );
};

export default AdLandingPage;
