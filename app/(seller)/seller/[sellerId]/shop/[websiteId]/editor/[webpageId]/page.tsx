import EditorProvider from "@/providers/editor/editor-provider";
import { redirect } from "next/navigation";
import React from "react";
import FunnelEditorNavigation from "./_components/funnel-editor-navigation";
import FunnelEditorSidebar from "./_components/funnel-editor-sidebar";
import FunnelEditor from "./_components/funnel-editor";
import prisma from "@/lib/prismadb";

type Props = {
  params: {
    subaccountId: string;
    websiteId: string;
    webpageId: string;
  };
};

const Page = async ({ params }: Props) => {
  const funnelPageDetails = await prisma.webPages.findFirst({
    where: {
      id: params.webpageId,
    },
  });
  if (!funnelPageDetails) {
    return redirect(
      `/subaccount/${params.subaccountId}/funnels/${params.websiteId}`
    );
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider
        subaccountId={params.subaccountId}
        funnelId={params.websiteId}
        pageDetails={funnelPageDetails}
      >
        <FunnelEditorNavigation
          funnelId={params.websiteId}
          funnelPageDetails={funnelPageDetails}
          subaccountId={params.subaccountId}
        />
        <div className="h-full flex justify-center">
          <FunnelEditor funnelPageId={params.webpageId} />
        </div>

        <FunnelEditorSidebar subaccountId={params.subaccountId} />
      </EditorProvider>
    </div>
  );
};

export default Page;
