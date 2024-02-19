import { GetWebPages } from "@/actions/queries";
import RedirectPage from "@/components/Admin/products/RedirectPage";
import React from "react";
import Main from "./_components/main";
import { NewWebPageButton } from "./_components/NewWebPageButton";
import DisplayWebpages from "./_components/DisplayWebpages";

const page = async ({ params }: { params: { websiteId: string } }) => {
  const website = await GetWebPages(params.websiteId);
  console.log(website);

  return (
    <div>
      <Main />
      <div className="px-6 py-6 flex justify-between">
        <p className="text-xl">Your WebPages</p>
        {website?.webpages.length == 0 && (
          <NewWebPageButton website={website} />
        )}
      </div>
      <DisplayWebpages websites={website} />
    </div>
  );
};

export default page;
