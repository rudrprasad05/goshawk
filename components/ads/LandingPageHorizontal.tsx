import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { GetAdBasedOnLocation } from "@/actions/ad";

const LandingPageHorizontal = async ({ location }: { location: string }) => {
  const ad = await GetAdBasedOnLocation(location);
  if (!ad)
    return (
      <Card className="w-full h-[250px] border border-dashed ">
        <CardHeader>
          <CardTitle>
            Ad space for rent. Place your here. Location: {location}
          </CardTitle>
        </CardHeader>
      </Card>
    );
  return (
    <Card className="w-full h-[250px] border border-dashed ">
      <CardHeader>
        <CardTitle>{ad?.seller.companyName}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default LandingPageHorizontal;
