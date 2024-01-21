import { AdsEndPoint, getCurrentUser } from "@/actions/user";
import AdminLandingPage from "@/components/ads/AdminLandingPage";
import React from "react";

const page = async () => {
  const data = await AdsEndPoint();
  if (!data) return null;
  return (
    <div>
      <AdminLandingPage data={data} />
    </div>
  );
};

export default page;
