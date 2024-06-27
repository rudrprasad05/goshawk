import Link from "next/link";
import Image from "next/image";
import Cart from "../Cart";
import MaxWidthWrapper from "../MaxWidthWrapper";
import MobileNav from "./MobileNav";
import NavBarLogin from "./NavBarLogin";
import NavItems from "./NavItems";
import { Input } from "../ui/input";
import SearchBar from "./SearchBar";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const NavBar2 = () => {
  return (
    <div className="bg-card">
      <header className="relative bg-card">
        <MaxWidthWrapper>
          <div className="border-b">
            {/* mobile */}
            <div className=" lg:hidden flex justify-between items-center px-12">
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

            <div className=" items-center lg:flex hidden py-6">
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
              <div className="w-full px-12 flex flex-col gap-6">
                <SearchBar />
                <div className="hidden z-50  lg:block lg:self-stretch">
                  <Suspense
                    fallback={<Loader2 className={"animate-spin mr-3"} />}
                  >
                    <NavItems />
                  </Suspense>
                </div>
              </div>
              {/* Login */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Suspense
                    fallback={<Loader2 className={"animate-spin mr-3"} />}
                  >
                    <NavBarLogin />
                  </Suspense>
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

export default NavBar2;
