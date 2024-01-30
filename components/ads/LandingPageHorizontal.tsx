import { GetAdBasedOnLocation } from "@/actions/ad";
import React from "react";

import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

// pixel size is 1280 * 320
const LandingPageHorizontal = async ({ location }: { location: string }) => {
  const billboard = await GetAdBasedOnLocation(location);
  if (!billboard?.ad)
    return (
      <Card className="w-full aspect-[4/1] border border-dashed ">
        <CardHeader>
          <CardTitle>
            Ad space for rent. Place your here. Location: {location}
          </CardTitle>
        </CardHeader>
      </Card>
    );
  return (
    <Card className="w-full overflow-hidden aspect-[4/1] border border-dashed ">
      <Image
        src={billboard.ad?.imageUrl}
        alt={billboard.ad.id}
        height={320}
        width={1280}
        className="object-contain aspect-[4/1] w-full h-full"
      />
    </Card>
  );
};

export default LandingPageHorizontal;
