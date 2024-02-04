import { GetAllParentWithChildCategories } from "@/actions/category";
import {
  GetAllProductsPagination,
  GetLandingCaroProducts,
  GetSuperAdminProducts,
} from "@/actions/products";
import AdCaroSection from "@/components/landing/AdCaroSection";
import CategorySideNav from "@/components/landing/CategorySideNav";
import LandingHeader from "@/components/landing/LandingHeader";
import Perks from "@/components/landing/Perks";
import SuperAdminProducts from "@/components/landing/SuperAdminProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const AdminProducts = await GetSuperAdminProducts();
  const products = await GetLandingCaroProducts();
  const cats = await GetAllParentWithChildCategories();

  return (
    <>
      <LandingHeader />
      <div className="grid gap-6 grid-cols-4 px-20 relative">
        <div className="py-6 col-span-1 relative">
          <CategorySideNavCont cats={cats} />
        </div>
        <div className="col-span-3">
          <SuperAdminProducts products={AdminProducts} />
          <AdCaroSection products={products} />
        </div>
      </div>

      <Perks />
    </>
  );
}

const CategorySideNavCont = ({ cats }: { cats: any[] }) => {
  return (
    <Card className="overflow-auto bg-black">
      <CardHeader>
        <CardTitle>Browse by Category</CardTitle>
      </CardHeader>
      <CardContent>
        {cats.map((cat) => (
          <CategorySideNav key={cat.id} category={cat} />
        ))}
      </CardContent>
    </Card>
  );
};
