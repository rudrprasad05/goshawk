import { GetAdForEachMerchant, GetAllBillboardsNewAd } from "@/actions/ad";
import AdLandingPage from "@/components/ads/AdminLandingPage";
import React from "react";

const page = async () => {
  const ads = await GetAdForEachMerchant();
  const billboards = await GetAllBillboardsNewAd();
  return <AdLandingPage billboards={billboards} data={ads} />;
};

export default page;
