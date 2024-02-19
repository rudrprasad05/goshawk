import { GetAllParentWithChildCategories } from "@/actions/category";
import {
  GetAllProductsPagination,
  GetLandingCaroProducts,
  GetSuperAdminProducts,
} from "@/actions/products";
import { GetMostRecentProduct } from "@/actions/queries";
import LandingPageHorizontal from "@/components/ads/LandingPageHorizontal";
import AdCaroSection from "@/components/landing/AdCaroSection";
import CategorySideNav from "@/components/landing/CategorySideNav";
import LandingHeader from "@/components/landing/LandingHeader";
import Perks from "@/components/landing/Perks";
import SuperAdminProducts from "@/components/landing/SuperAdminProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {
  const AdminProducts = await GetSuperAdminProducts();
  const products = await GetLandingCaroProducts();
  const cats = await GetAllParentWithChildCategories();

  return (
    <>
      <LandingHeader />
      <div className="grid gap-6 grid-cols-3 lg:grid-cols-4 px-20 relative">
        <div className="hidden md:hidden lg:block py-6 col-span-1 relative">
          <CategorySideNavCont cats={cats} />
        </div>
        <div className="col-span-3">
          <SuperAdminProducts products={AdminProducts} />
          <AdCaroSection products={products} />
        </div>
      </div>

      <Perks />
      <div className="px-20">
        <Link href={"/gifts"}>
          <LandingPageHorizontal location="a3" />
        </Link>
      </div>
    </>
  );
}

const CategorySideNavCont = ({ cats }: { cats: any[] }) => {
  return (
    <Card className="overflow-auto bg-black pt-6">
      <CardContent>
        {cats.map((cat) => (
          <CategorySideNav key={cat.id} category={cat} />
        ))}
      </CardContent>
    </Card>
  );
};
