import { GetSellerByName } from "@/actions/seller";
import React from "react";

const page = async ({ params }: { params: { companyName: string } }) => {
  const { companyName } = params;
  const seller = await GetSellerByName(companyName);

  return <div>{seller?.products.map((i) => i.name)}</div>;
};

export default page;
