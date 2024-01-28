"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const NavItems = () => {
  const session = useSession();
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
    return (
      session.data?.user.role == "seller" || session.data?.user.role == "admin"
    );
  };

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      <div className="flex items-center">
        {checkRole() && (
          <Link
            href={"/seller/dashboard"}
            className={`${buttonVariants({ variant: "ghost" })}text-sm`}
          >
            Dashboard
          </Link>
        )}
      </div>

      {session.data?.user.role == "admin" && (
        <div className="flex items-center">
          <Link
            href={"/admin/dashboard"}
            className={`${buttonVariants({ variant: "ghost" })}text-sm`}
          >
            Admin Panel
          </Link>
        </div>
      )}

      <div className="flex items-center">
        <Link
          href={"/shop"}
          className={`${buttonVariants({ variant: "ghost" })}text-sm`}
        >
          Shops
        </Link>
      </div>

      <div className="flex items-center">
        <Link
          href={"/shop/products"}
          className={`${buttonVariants({ variant: "ghost" })}text-sm`}
        >
          Products
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
