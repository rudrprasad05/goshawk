"use client";

import { EditorBtns } from "@/lib/constants";
import { Box } from "lucide-react";

const SingleProductPlaceholder = () => {
  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, "product");
      }}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Box size={40} className="text-muted-foreground" />
    </div>
  );
};

export default SingleProductPlaceholder;
