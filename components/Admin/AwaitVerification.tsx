"use client";
import React from "react";
import { Lock } from "lucide-react";

const AwaitVerification = () => {
  return (
    <div className="w-full place-items-center h-full grid">
      <div className="flex flex-col items-center">
        <div className="">
          <Lock className="w-24 h-24 stroke-2" />
        </div>
        <h1 className="text-5xl py-3">Await Verification</h1>
        <h2 className="text-sm text-muted-foreground px-48 text-center">
          The verification process can take between 2 - 3 business days. Contact
          us for any questions regarding this process. Please note this step is
          conducted to protect our customers
        </h2>
      </div>
    </div>
  );
};

export default AwaitVerification;
