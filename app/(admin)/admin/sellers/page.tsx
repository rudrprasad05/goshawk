import { GetAllMerchants } from "@/actions/seller";
import Header from "@/components/Admin/Header";
import UnverifiedMerchant from "@/components/superadmin/UnverifiedMerchant";
import VerifiedMerchants from "@/components/superadmin/VerifiedMerchants";
import { Store } from "lucide-react";
import React from "react";

const page = async () => {
  const allMerchants = await GetAllMerchants();
  const verified = allMerchants.filter((i) => i.isVerified);
  const unverified = allMerchants.filter((i) => !i.isVerified);

  return (
    <div>
      <Header name="Seller Verification">
        <Store />
      </Header>
      <VerifiedMerchants merchant={verified} />
      <UnverifiedMerchant merchant={unverified} />
    </div>
  );
};

export default page;
