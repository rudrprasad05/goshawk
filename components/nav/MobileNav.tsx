"use client";

import {
  GetAllParentCategories,
  GetPetsWithSubCategories,
} from "@/actions/category";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import { CategoryType, SubcategoryType, UserType } from "@/types";
import { ChevronsUpDown, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const MobileNav = ({ user }: { user: UserType }) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [pets, setPets] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    const GetData = async () => {
      const res = await GetAllParentCategories();
      const res2 = await GetPetsWithSubCategories();
      setCategories(res);
      setPets(res2);
    };

    GetData();

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));

  const checkRole = () => {
    return user?.role == "SELLER" || user?.role == "ADMIN";
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Welcome back {user ? user?.name.split(" ")[0] : "User"}
          </SheetTitle>
          <SheetDescription className="relative h-full"></SheetDescription>
        </SheetHeader>
        <SheetDescription>
          <div className={cn(" gap-4 h-full")} ref={navRef}>
            {/* dashboard */}
            <div className="flex items-center">
              {checkRole() && (
                <Link
                  href={`/seller/${user?.seller.id}/dashboard`}
                  className={`${buttonVariants({ variant: "ghost" })}text-sm`}
                >
                  Dashboard
                </Link>
              )}
            </div>

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

            <CollapseCont arr={categories} name="Categories" />
            <CollapseCont arr={pets.subcategories} name="Pets" />
          </div>
        </SheetDescription>
        <SheetFooter className="absolute bottom-0 left-0 p-8 w-full">
          {user && (
            <Button
              onClick={() => {
                signOut();
              }}
            >
              Signout
            </Button>
          )}
          {!user && (
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              Signin
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const CollapseCont = ({ arr, name }: { arr: any[]; name: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4 text-md">
        <h4 className="grow text-sm ">{name}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {/* pets.subcategories */}
      <CollapsibleContent className="space-y-2">
        {arr.map((i: SubcategoryType) => (
          <div
            key={i.id}
            className="flex items-center pl-6 text-sm text-muted-foreground"
          >
            <Link href={`/shop/products?search=${i.name}`}>{i.name}</Link>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileNav;
