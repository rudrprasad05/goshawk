import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";
import React from "react";

import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button, buttonVariants } from "../ui/button";

const LandingHeader = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl">
            Your marketplace for high-quality
            <span className="text-blue-600"> Everyday Products</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to GoShawk Shop. Every product on our platform is verified
            by our team to ensure our highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/products"
              className={buttonVariants({ variant: "default" })}
            >
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default LandingHeader;
