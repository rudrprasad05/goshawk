import { GetSuperAdminProducts } from "@/actions/products";
import AdCaroSection from "@/components/landing/AdCaroSection";
import LandingHeader from "@/components/landing/LandingHeader";
import SuperAdminProducts from "@/components/landing/SuperAdminProducts";

export default async function Home() {
  const AdminProducts = await GetSuperAdminProducts();
  return (
    <>
      <LandingHeader />
      <SuperAdminProducts products={AdminProducts} />
      <AdCaroSection />
    </>
  );
}
