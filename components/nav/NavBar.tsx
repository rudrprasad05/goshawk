import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import NavItems from "./NavItems";
import { buttonVariants } from "../ui/button";
import { cookies } from "next/headers";
import { Icons } from "../Icons";
import Cart from "../Cart";
import NavBarLogin from "./NavBarLogin";
import { getCurrentUser } from "@/actions/user";

const Navbar = async () => {
  const nextCookies = cookies();
  const user = await getCurrentUser();

  return (
    <div className="bg-card sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-card">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* <MobileNav /> */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
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
