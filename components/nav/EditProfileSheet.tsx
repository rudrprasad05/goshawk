"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@prisma/client";

import React, { useContext } from "react";
import { signOut } from "next-auth/react";
import { CartContext } from "@/context/CartContext";
import ThemeSwitcher from "@/theme/ThemeSwitcher";
import { Button } from "../ui/button";

interface props {
  children?: React.ReactNode;
  user?: any;
}

const EditProfileSheet: React.FC<props> = ({ children, user }) => {
  const { clearCart } = useContext(CartContext);
  const handleClick = () => {
    clearCart();
    signOut();
  };
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Welcome back {user && user.name.split(" ")[0]}
          </SheetTitle>
          <SheetDescription className="relative h-full"></SheetDescription>
        </SheetHeader>
        <SheetFooter className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex justify-between w-full">
            <ThemeSwitcher />
            <Button onClick={() => handleClick()}>Signout</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfileSheet;
