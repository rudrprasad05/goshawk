import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";
import React from "react";

import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import CategorySideNav from "./CategorySideNav";

const LandingHeader = ({ cats }: { cats: any[] }) => {
  return (
    <MaxWidthWrapper>
      <div className="flex gap-8 w-full h-full">
        <div className="hidden md:hidden lg:block py-6 col-span-1 relative">
          <CategorySideNavCont cats={cats} />
        </div>
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
      </div>
    </MaxWidthWrapper>
  );
};

const CategorySideNavCont = ({ cats }: { cats: any[] }) => {
  return (
    <Card className="overflow-auto pt-6 h-full">
      <CardContent>
        {cats.map((cat) => (
          <CategorySideNav key={cat.id} category={cat} />
        ))}
      </CardContent>
    </Card>
  );
};

export default LandingHeader;
