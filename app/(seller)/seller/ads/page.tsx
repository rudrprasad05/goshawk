import { GetAdForEachMerchant, GetAllBillboardsNewAd } from "@/actions/ad";
import AdLandingPage from "@/components/ads/AdminLandingPage";
import React from "react";

const page = async () => {
  const user = await GetAdForEachMerchant();
  const billboards = await GetAllBillboardsNewAd();
  return <AdLandingPage billboards={billboards} data={user} />;
};

export default page;
