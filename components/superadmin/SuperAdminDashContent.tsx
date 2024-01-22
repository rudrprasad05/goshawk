import React from "react";
import Header from "../Admin/Header";
import { Shield, ShieldAlert } from "lucide-react";

const SuperAdminDashContent = () => {
  return (
    <div>
      <Header name="Super Admin Panel">
        <ShieldAlert />
      </Header>
    </div>
  );
};

export default SuperAdminDashContent;
