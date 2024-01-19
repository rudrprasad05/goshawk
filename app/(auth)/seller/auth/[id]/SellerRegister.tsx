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
    name: "Personal",
    price: "$20",
    icon: User,
    attr: [
      "Unlimited ad-free movies",
      "Watch on 1 phone or tablet at a time",
      "Watch in Full HD",
    ],
  },
  {
    name: "Company",
    price: "$20",
    icon: Building2,
    attr: [
      "Unlimited ad-free movies",
      "Watch on 4 supported devices at a time",
      "Watch in Ultra HD",
      "Download on 6 supported devices at a time",
    ],
  },
  { name: "Diamond", price: "$20", icon: Gem },
];

type SelectedPlanType = "Personal" | "Company" | "Diamond";

const SellerRegister = ({ userId }: { userId: string }) => {
  const session = useSession();
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanType>();
  let additionalData: SellerRegisterType;

  return (
    <div className="px-20 py-10">
      <Header />
      <Step1 onclick={setSelectedPlan} state={selectedPlan} />
      <Step2 additionalData={{ plan: selectedPlan as string }} user={userId} />
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
        Select the plan that&#146;s right for you
      </h1>
      <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((plan) => (
          <Card
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
            <CardContent className="text-sm grow">
              <ul>
                {plan.attr?.map((i) => (
                  <li className="flex gap-1">
                    <div>
                      <Check className="stroke-green-700 w-4 h-4" />
                    </div>
                    <p>{i}</p>
                  </li>
                ))}
              </ul>
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
