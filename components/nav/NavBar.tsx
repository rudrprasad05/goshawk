"use client";

import Link from "next/link";

import Image from "next/image";
import Cart from "../Cart";
import MaxWidthWrapper from "../MaxWidthWrapper";
import MobileNav from "./MobileNav";
import NavBarLogin from "./NavBarLogin";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <div className="bg-card sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-card">
        <MaxWidthWrapper>
          <div className="border-b">
            <div className="h-16 lg:hidden flex justify-between items-center px-12">
              <div className="flex lg:ml-0">
                <Link href="/">
                  <Image
                    src={"/logo-temp.png"}
                    alt="lgo"
                    height={40}
                    width={40}
                  />
                </Link>
              </div>
              <div className="flex gap-3">
                <Cart />
                <MobileNav />
              </div>
            </div>
            <div className="h-16 items-center lg:flex hidden">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  {/* <Icons.logo className="h-10 w-10" /> */}
                  <Image
                    src={"/logo-temp.png"}
                    alt="lgo"
                    height={25}
                    width={25}
                  />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <NavBarLogin />
                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
