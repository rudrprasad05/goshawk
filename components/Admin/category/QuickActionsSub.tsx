import React from "react";
import NewSubCategoryButton from "./NewSubCategoryButton";

const QuickActionsSub = ({ parent }: { parent: string }) => {
  return (
    <div className="grid grid-cols-4 py-6 gap-6">
      <NewSubCategoryButton parent={parent} />
    </div>
  );
};

export default QuickActionsSub;
