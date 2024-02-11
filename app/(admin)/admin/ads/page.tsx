import { GetAllBillboardsNewAd } from "@/actions/ad";
import { GetAllMerchants } from "@/actions/seller";
import Header from "@/components/Admin/Header";
import BillBoardPanel from "@/components/ads/superadmin/BillBoardPanel";
import { CurrentAdsPanel } from "@/components/ads/superadmin/CurrentAdsPanel";
import { VerifyAdsPanel } from "@/components/ads/superadmin/VerifyAdsPanel";

import UnverifiedMerchant from "@/components/superadmin/UnverifiedMerchant";
import VerifiedMerchants from "@/components/superadmin/VerifiedMerchants";
import { Store } from "lucide-react";
import React from "react";

const page = async () => {
  const billboard = await GetAllBillboardsNewAd();
  if (!billboard) return null;
  return (
    <div>
      <Header name="Advertisements">
        <Store />
      </Header>
      <BillBoardPanel billboards={billboard} />
      <CurrentAdsPanel billboards={billboard} />
      <VerifyAdsPanel billboards={billboard} />
    </div>
  );
};

export default page;
