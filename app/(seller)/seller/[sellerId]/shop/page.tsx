import { GetSellerWithWebsite, getFunnels } from "@/actions/queries";
import React from "react";
import { Plus } from "lucide-react";
import FunnelForm from "@/components/forms/funnel-form";
import Main from "./_components/main";
import { NewWebsiteButton } from "./_components/NewWebsiteButton";
import DisplayWebsites from "./_components/DisplayWebsites";

const Funnels = async ({ params }: { params: { sellerId: string } }) => {
  const funnels = await GetSellerWithWebsite(params.sellerId);
  if (!funnels) return null;
  console.log(funnels);

  return (
    <div>
      <Main />
      <div className="px-6 py-6 flex justify-between">
        <p className="text-xl">Your websites</p>
        <NewWebsiteButton seller={funnels} />
      </div>
      <DisplayWebsites websites={funnels.Funnels} />
    </div>
  );
};

export default Funnels;
