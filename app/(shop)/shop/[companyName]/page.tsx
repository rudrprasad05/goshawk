import { getDomainContent } from "@/actions/queries";
import { GetSellerByName } from "@/actions/seller";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";
import Main from "./_components/main";

const Page = async ({ params }: { params: { companyName: string } }) => {
  const companyData = await GetSellerByName(params.companyName);
  console.log(companyData);

  if (!companyData) return notFound();

  return (
    <div className="px-20 py-6">
      <Main seller={companyData} />
    </div>
  );
};

export default Page;
