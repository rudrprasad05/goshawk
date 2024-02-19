import Header from "@/components/Admin/Header";
import { Pencil } from "lucide-react";
import React from "react";
import DisplayWebpages from "./DisplayWebpages";

const Main = () => {
  return (
    <div>
      <Header name="Edit">
        <Pencil />
      </Header>
    </div>
  );
};

export default Main;
