import EditorProvider from "@/providers/editor/editor-provider";
import { notFound } from "next/navigation";
import React from "react";
import prisma from "@/lib/prismadb";
import { getDomainContent } from "@/actions/queries";
import FunnelEditor from "@/app/(seller)/seller/[sellerId]/shop/[websiteId]/editor/[webpageId]/_components/funnel-editor";

const Page = async ({ params }: { params: { companyName: string } }) => {
  const domainData = await getDomainContent(params.companyName);
  if (!domainData) return notFound();

  const pageData = domainData.webpages.find((page) => !page.pathName);

  if (!pageData) return notFound();

  await prisma.webPages.update({
    where: {
      id: pageData.id,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });

  return (
    <EditorProvider
      subaccountId={domainData.subAccountId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor funnelPageId={pageData.id} liveMode={true} />
    </EditorProvider>
  );
};

export default Page;
