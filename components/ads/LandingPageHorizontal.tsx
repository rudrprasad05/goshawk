import { GetAdBasedOnLocation } from "@/actions/ad";
import React from "react";

import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { AdType } from "@/types";

// pixel size is 1280 * 320
const LandingPageHorizontal = async ({
  location,
  src = null,
}: {
  location?: string;
  src?: AdType | null;
}) => {
  if (src == null) {
    return <HandleServerAd location={location} />;
  }
  return (
    <Card className="w-full overflow-hidden aspect-[4/1] border border-dashed ">
      <Image
        src={src.imageUrl}
        alt={src.id}
        height={180}
        width={720}
        className="object-contain aspect-[4/1] w-full h-full"
      />
    </Card>
  );
};

const HandleServerAd = async ({ location }: { location?: string }) => {
  const billboard = await GetAdBasedOnLocation(location as string);
  if (!billboard?.ad)
    return (
      <Card className="w-11/12 aspect-[4/1] border border-dashed ">
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
        height={180}
        width={720}
        className="object-contain aspect-[4/1] w-full h-full"
      />
    </Card>
  );
};

export default LandingPageHorizontal;
