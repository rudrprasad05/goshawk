import Header from "@/components/Admin/Header";
import { Presentation } from "lucide-react";
import React from "react";
import NewBillboard from "./NewBillboard";
import { GetAllBillboardsAdmin, GetAllBillboardsNewAd } from "@/actions/ad";
import BillboardCards from "./BillboardCards";
import { BillboardType, AdType } from "@/types";

type LocalProps = BillboardType & {
  ad: AdType;
};

const BillBoardPanel = ({ billboards }: { billboards: LocalProps[] }) => {
  return (
    <div className="py-6">
      <div className="pb-6">
        <Header showProfile={false} name="Billboards">
          <Presentation />
        </Header>
      </div>

      <div>
        <BillboardCards billboards={billboards} />
      </div>
      <div className="grid grid-cols-4">
        <NewBillboard />
      </div>
    </div>
  );
};

export default BillBoardPanel;
