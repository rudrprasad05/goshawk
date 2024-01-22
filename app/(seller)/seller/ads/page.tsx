import { AdsEndPoint, getCurrentUser } from "@/actions/user";
import AdminLandingPage from "@/components/ads/AdminLandingPage";
import React from "react";

const page = async () => {
  const data = await AdsEndPoint();
  if (!data) return null;
  return <AdminLandingPage data={data} />;
};

export default page;
