"use client";

import React from "react";
import { Card } from "../ui/card";
import { IconNode, LucideIcon, Shield } from "lucide-react";
import { useSession } from "next-auth/react";
import AvatarComponent from "../nav/AvatarComponent";
import EditProfileSheet from "../nav/EditProfileSheet";

interface props {
  name: string;
  children: React.ReactNode;
  showProfile?: boolean;
}

const Header: React.FC<props> = ({ name, children, showProfile = true }) => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <Card className="w-full flex flex-row px-6 py-3 bg-border">
      <div className="flex gap-3 items-center text-xl">
        {children}
        {name}
      </div>
      {showProfile && (
        <div className="flex gap-3 ml-auto">
          <div className="text-right">
            <p className="font-bold text-lg">{user?.name}</p>
            <p className="text-sm text-primary">Merchant</p>
          </div>
          <EditProfileSheet user={user}>
            <AvatarComponent
              fallback={user?.name?.slice(0, 2).toUpperCase() || "AD"}
              src={user?.image}
            />
          </EditProfileSheet>
        </div>
      )}
    </Card>
  );
};

export default Header;
