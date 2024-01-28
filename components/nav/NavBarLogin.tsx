"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../ui/button";
import { useSession } from "next-auth/react";
import EditProfileSheet from "./EditProfileSheet";
import AvatarComponent from "./AvatarComponent";
import { UserType } from "@/types";
import { Loader2 } from "lucide-react";

const NavBarLogin = ({ user }: { user?: UserType }) => {
  const [domLoaded, setdomLoaded] = useState(false);
  const [navKey, setNavKey] = useState(0);
  useEffect(() => {
    setdomLoaded(true);
    setNavKey((prev) => prev + 1);
  }, [user]);

  if (domLoaded)
    return (
      <div key={navKey} className="flex items-center">
        <SignIn user={user} />
        <Seperator user={user} />
        <CreateAccount user={user} />
        <Seperator user={user} />
      </div>
    );
  else
    return (
      <>
        <Loader2 className={"animate-spin mr-3"} />
      </>
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
  return <span className="h-6 w-px bg-muted" aria-hidden="true" />;
};

export default NavBarLogin;
