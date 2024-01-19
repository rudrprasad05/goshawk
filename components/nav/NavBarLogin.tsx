"use client";

import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { useSession } from "next-auth/react";
import EditProfileSheet from "./EditProfileSheet";
import AvatarComponent from "./AvatarComponent";
import { UserType } from "@/types";

const NavBarLogin = ({ user }: { user?: UserType }) => {
  return (
    <div className="flex items-center">
      <SignIn user={user} />
      <Seperator user={user} />
      <CreateAccount user={user} />
      <Seperator user={user} />
    </div>
  );
};

const SignIn = ({ user }: { user: any }) => {
  if (user) return null;
  return (
    <Link
      href="/login"
      className={buttonVariants({
        variant: "ghost",
      })}
    >
      Login
    </Link>
  );
};

const CreateAccount = ({ user }: { user: any }) => {
  if (user)
    return (
      <EditProfileSheet user={user}>
        <AvatarComponent
          fallback={user.name?.slice(0, 2).toUpperCase() || "AD"}
          src={user?.image}
        />
      </EditProfileSheet>
    );
  return (
    <Link
      href="/register"
      className={buttonVariants({
        variant: "ghost",
      })}
    >
      Create account
    </Link>
  );
};

const Seperator = ({ user }: { user: any }) => {
  if (user) return null;
  return <span className="h-6 w-px bg-gray-200" aria-hidden="true" />;
};

export default NavBarLogin;
