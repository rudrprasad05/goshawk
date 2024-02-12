import { GetAdBasedOnLocation } from "@/actions/ad";
import { AdType } from "@/types";
import Image from "next/image";
import React from "react";
import { z } from "zod";

import { Card, CardHeader, CardTitle } from "../ui/card";

// pixel size is 1280 * 320
const LandingPageHorizontal = async ({
  location,
  src = null,
}: {
  location?: string;
  src?: AdType | null;
}) => {
  if (src == null && location != null) {
    return <HandleServerAd location={location} />;
  }

  return (
    <Card className="w-full overflow-hidden aspect-[4/1] border border-dashed ">
      <Image
        src={src?.imageUrl || ""}
        alt={src?.id || "image"}
        height={360}
        width={1440}
        className="object-contain aspect-[4/1] w-full h-full"
      />
    </Card>
  );
};

const HandleServerAd = async ({ location }: { location?: string | null }) => {
  const billboard = await GetAdBasedOnLocation(location as string);

  if (billboard?.ad == null) return null;

  return (
    <Card className="w-full overflow-hidden aspect-[4/1] border border-dashed ">
      <Image
        src={billboard?.ad?.imageUrl}
        alt={billboard?.ad?.id}
        height={180}
        width={720}
        className="object-contain aspect-[4/1] w-full h-full"
      />
    </Card>
  );
};

export default LandingPageHorizontal;
