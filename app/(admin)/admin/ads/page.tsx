import { GetAllMerchants } from "@/actions/seller";
import Header from "@/components/Admin/Header";
import BillBoardPanel from "@/components/ads/superadmin/BillBoardPanel";
import UnverifiedMerchant from "@/components/superadmin/UnverifiedMerchant";
import VerifiedMerchants from "@/components/superadmin/VerifiedMerchants";
import { Store } from "lucide-react";
import React from "react";

const page = async () => {
  return (
    <div>
      <Header name="Advertisements">
        <Store />
      </Header>
      <BillBoardPanel />
    </div>
  );
};

export default page;
