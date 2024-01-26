"use client";

import { Megaphone, MessageSquarePlus, Shield } from "lucide-react";
import React from "react";

import Header from "../Admin/Header";
import { AdType, AdsEndPoint, BillboardType } from "@/types";
import NewAdButton from "./NewAdButton";
import AwaitVerification from "../Admin/AwaitVerification";

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
  if (!ads) return <div>You dont have any ads. Create one now</div>;
  return (
    <>
      <div>
        {ads?.map((i) => (
          <>{i.id}</>
        ))}
      </div>
    </>
  );
};

export default AdLandingPage;
