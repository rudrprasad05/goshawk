import { NavbarUser, getCurrentUser } from "@/actions/user";
import { cookies } from "next/headers";
import Link from "next/link";

import Cart from "../Cart";
import { Icons } from "../Icons";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import NavBarLogin from "./NavBarLogin";
import NavItems from "./NavItems";
import Image from "next/image";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const user = await NavbarUser();

  return (
    <div className="bg-card sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-card">
        <MaxWidthWrapper>
          <div className="border-b">
            <div className="h-16 lg:hidden flex justify-between items-center px-12">
              <div className="flex lg:ml-0">
                <Link href="/">
                  {/* <Icons.logo className="h-10 w-10" /> */}
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
                <MobileNav user={user} />
              </div>
            </div>

            <div></div>
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
                <NavItems user={user} />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <NavBarLogin user={user} />
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
  if (user) return "<UserAccountNav user={user} />";
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

export default Navbar;
