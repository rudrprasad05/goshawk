import { Lock } from "lucide-react";
import React from "react";

const VerifyEmailFirst = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col items-center">
        <Lock className="w-16 h-16 text-primary" />
        <h1 className="text-2xl ">Verify email first</h1>
      </div>
    </div>
  );
};

export default VerifyEmailFirst;
