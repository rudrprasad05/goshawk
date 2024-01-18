import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import SellerRegister from "./SellerRegister";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <MaxWidthWrapper>
      <SellerRegister userId={id} />
    </MaxWidthWrapper>
  );
};

export default page;
