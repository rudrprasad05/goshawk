import React from "react";
import MpaisaButton from "./_components/MpaisaButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetSellerWithSubBySellerId } from "@/actions/seller";

const page = async () => {
  const data = await GetSellerWithSubBySellerId();
  return (
    <div className="mx-auto h-[100vh] max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <Card className="w-[300px] m-auto">
        <CardHeader className="text-white text-lg">
          <CardTitle className="text-center">Pay with Mpaisa</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <MpaisaButton data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
