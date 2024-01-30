import Header from "@/components/Admin/Header";
import ChildCategories from "@/components/Admin/category/ChildCategories";
import ParentCategories from "@/components/Admin/category/ParentCategories";
import QuickActions from "@/components/Admin/category/QuickActions";
import QuickActionsSub from "@/components/Admin/category/QuickActionsSub";

import { Tag } from "lucide-react";

type Params = {
  // params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async (props: Params) => {
  const searchParamsType = String(props?.searchParams?.parent);
  return (
    <div>
      <Header name="Categories">
        <Tag />
      </Header>
      <QuickActions />

      <Header name="Parent Categories" showProfile={false}>
        <Tag />
      </Header>

      <ParentCategories selected={searchParamsType} />

      <Header name="Child Categories" showProfile={false}>
        <Tag />
      </Header>
      <QuickActionsSub parent={searchParamsType} />
      <ChildCategories parent={searchParamsType} />
    </div>
  );
};

export default page;
