import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BillboardType } from "@/types";
import { Presentation } from "lucide-react";
import React from "react";

const BillboardCards = ({ billboards }: { billboards: BillboardType[] }) => {
  return (
    <div className="grid grid-cols-4 pb-6 gap-6">
      {billboards.map((card) => (
        <Card
          key={card.id}
          className="duration-100 border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer"
        >
          <CardHeader>
            <CardTitle>
              <div className="text-primary">{card.location}</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">{card.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BillboardCards;
