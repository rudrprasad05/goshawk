import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  return redirect("admin/dashboard");
};

export default page;
