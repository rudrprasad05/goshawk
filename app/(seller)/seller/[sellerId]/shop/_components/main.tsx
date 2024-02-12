"use client";
import Header from "@/components/Admin/Header";
import { Store } from "lucide-react";
import React from "react";

const Main = () => {
  return (
    <div>
      <Header name="Web Admin">
        <Store />
      </Header>
    </div>
  );
};

export default Main;
