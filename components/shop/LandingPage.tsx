import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl">
          Welcome to our Marketplace.
          <span className="text-blue-600"> A promise of quality</span>
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to [company name]. Every product on our platform is verified
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
  );
};

export default LandingPage;
