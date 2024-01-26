import Header from "@/components/Admin/Header";
import { Presentation } from "lucide-react";
import React from "react";
import NewBillboard from "./NewBillboard";
import { GetAllBillboardsAdmin } from "@/actions/ad";
import BillboardCards from "./BillboardCards";

const BillBoardPanel = async () => {
  const billboard = await GetAllBillboardsAdmin();
  return (
    <div className="py-6">
      <div className="pb-6">
        <Header showProfile={false} name="Billboards">
          <Presentation />
        </Header>
      </div>

      <div>
        <BillboardCards billboards={billboard} />
      </div>
      <div className="grid grid-cols-4">
        <NewBillboard />
      </div>
    </div>
  );
};

export default BillBoardPanel;
