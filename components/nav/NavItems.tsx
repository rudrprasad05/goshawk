"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { UserType } from "@/types";
import { cn } from "@/lib/utils";

const NavItems = ({ classname }: { classname?: string }) => {
  const { data } = useSession();
  const user = data?.user;
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  const checkRole = () => {
    if (user?.role == "SELLER")
      <div className="flex items-center">
        <Link
          href={`/seller`}
          className={`${buttonVariants({ variant: "ghost" })}text-sm`}
        >
          Dashboard
        </Link>
      </div>;
    else if (user?.role == "USER")
      return (
        <div className="flex items-center">
          <Link
            href={`/account/${user?.id}/mydash`}
            className={`${buttonVariants({ variant: "ghost" })}text-sm`}
          >
            Dashboard
          </Link>
        </div>
      );
    else if (user?.role == "ADMIN")
      return (
        <div className="flex items-center">
          <Link
            href={`/seller/`}
            className={`${buttonVariants({ variant: "ghost" })}text-sm`}
          >
            Dashboard
          </Link>
        </div>
      );
    else return;
  };

  return (
    <div
      className={cn("grid grid-cols-4 gap-4 h-full", classname)}
      ref={navRef}
    >
      <div className="flex items-center">
        <Link
          href={"/"}
          className={`${buttonVariants({ variant: "ghost" })}text-sm`}
        >
          Home
        </Link>
      </div>
      {/* dashboard */}
      {checkRole()}

      {/* adminm panel */}
      {user?.role == "ADMIN" && (
        <div className="flex items-center">
          <Link
            href={"/admin/dashboard"}
            className={`${buttonVariants({ variant: "ghost" })}text-sm`}
          >
            Admin Panel
          </Link>
        </div>
      )}

      {/* shops */}
      <div className="flex items-center">
        <Link
          href={"/shop"}
          className={`${buttonVariants({ variant: "ghost" })}text-sm`}
        >
          Shops
        </Link>
      </div>

      {/* products */}
      <div className="flex items-center">
        <Link
          href={"/shop/products"}
          className={`${buttonVariants({ variant: "ghost" })}text-sm`}
        >
          Products
        </Link>
      </div>

      {/* suprises */}
      <div className="flex items-center">
        <Link
          href={"/gifts"}
          className={`${buttonVariants({ variant: "ghost" })}text-sm`}
        >
          Gifts
        </Link>
      </div>

      {/* repairs */}
      <div className="flex items-center">
        <Link
          href={"/repairs"}
          className={`${buttonVariants({ variant: "ghost" })}text-sm`}
        >
          Repairs
        </Link>
      </div>

      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const close = () => setActiveIndex(null);

        const isOpen = i === activeIndex;

        return (
          <NavItem
            category={category}
            close={close}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
