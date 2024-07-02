"use client";

import Header from "@/components/Admin/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ShieldAlert } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <Header showProfile name="User Panel">
        <ShieldAlert />
      </Header>
    </div>
  );
};

export default page;
