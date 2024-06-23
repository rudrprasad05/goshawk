"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SellerRegisterType } from "@/schemas/auth";
import { ArrowRight, Building2, Check, Gem, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Step2 } from "./SellerForm";

const plans = [
  {
    name: "FREE",
    price: "$0",
    icon: User,
    attr: [
      "Unlimited ad-free movies",
      "Watch on 1 phone or tablet at a time",
      "Watch in Full HD",
    ],
  },
  {
    name: "Gold",
    price: "$20",
    icon: User,
    attr: [
      "Unlimited ad-free movies",
      "Watch on 1 phone or tablet at a time",
      "Watch in Full HD",
    ],
  },
  {
    name: "Diamond",
    price: "$25",
    icon: Building2,
    attr: [
      "Unlimited ad-free movies",
      "Watch on 4 supported devices at a time",
      "Watch in Ultra HD",
      "Download on 6 supported devices at a time",
    ],
  },
  {
    name: "Platinum",
    price: "$50",
    icon: Building2,
    attr: [
      "Unlimited ad-free movies",
      "Watch on 4 supported devices at a time",
      "Watch in Ultra HD",
      "Download on 6 supported devices at a time",
    ],
  },
];

type SelectedPlanType = "Free" | "Gold" | "Diamond" | "Platinum" | null;

const SellerRegister = ({ userId }: { userId: string }) => {
  const session = useSession();
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanType>(null);
  let additionalData: SellerRegisterType;

  return (
    <div className=" py-10">
      <Header />
      <Step1 onclick={setSelectedPlan} state={selectedPlan} />
      {selectedPlan != null && (
        <Step2
          additionalData={{ plan: selectedPlan as string }}
          user={userId}
        />
      )}
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex flex-col items-center space-y-2 text-center">
      <Icons.logo className="h-20 w-20" />
      <h1 className="text-2xl font-semibold tracking-tight">
        Create Your Shop
      </h1>

      <Link
        className={buttonVariants({
          variant: "link",
          className: "gap-1.5",
        })}
        href="/login"
      >
        Already have an account? Sign-in
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

const Step1 = ({ state, onclick }: { state: any; onclick: any }) => {
  const selected = (plan: any) => {
    return state == plan.name;
  };
  return (
    <div className="py-16">
      <h1 className=" text-center text-xl font-semibold tracking-tight">
        Select the plan that&#39;s right for you
      </h1>
      <div className="pt-8 grid grid-cols-1 md:grid-cols-4 gap-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "flex flex-col",
              selected(plan) && "border-primary shadow-lg shadow-primary/50"
            )}
          >
            <CardHeader>
              <div className="w-min mx-auto my-3">
                <plan.icon className="h-12 stroke-1 w-12" />
              </div>
              <CardTitle className="text-center">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm grow flex flex-col">
              <ul className="mb-4">
                {plan.attr?.map((i) => (
                  <li className="flex gap-1" key={i.slice(0, 5)}>
                    <div>
                      <Check className="stroke-green-700 w-4 h-4" />
                    </div>
                    <p>{i}</p>
                  </li>
                ))}
              </ul>
              <p className="center mt-auto text-xl text-gray-400">
                {plan.price} <span className="text-sm">&nbsp;/ per month</span>
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => onclick(plan.name)} className="w-full">
                {selected(plan) ? <Check /> : "Select"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SellerRegister;
