import Header from "@/components/Admin/Header";
import { Presentation } from "lucide-react";
import React from "react";
import NewBillboard from "./NewBillboard";
import { GetAllBillboardsAdmin, GetAllBillboardsNewAd } from "@/actions/ad";
import BillboardCards from "./BillboardCards";
import LandingPageHorizontal from "../LandingPageHorizontal";
import AdControls, { DeleteAdButton, VerifyAdButton } from "../AdControls";
import { AdType, BillboardType } from "@/types";

type LocalProps = BillboardType & {
  ad: AdType;
};

export const VerifyAdsPanel = ({
  billboards,
}: {
  billboards: LocalProps[];
}) => {
  return (
    <div className="py-6">
      <div className="pb-6">
        <Header showProfile={false} name="Awaiting Verification">
          <Presentation />
        </Header>
      </div>
      <div className="flex flex-col gap-3">
        {billboards.map((billboard) => {
          if (billboard.ad != null && !billboard.ad.isVerified) {
            return (
              <div className="relative" key={billboard.id}>
                <LandingPageHorizontal src={billboard.ad} />
                <div className="absolute top-0 right-0">
                  <VerifyAdButton ad={billboard.ad} />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
