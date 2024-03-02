"use client";

import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { motion, useDragControls } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

const DraggableImage = ({ img, id }: { img: string; id: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const controls = useDragControls();
  //   const [isDragging, setIsDragging] = useState(false);
  //   controls.start(event, { snapToCursor: true });

  return (
    <motion.div
      drag="x"
      dragControls={controls}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      key={img}
      className={cn(
        "relative aspect-square h-[50px] z-0",
        isDragging && "z-50"
      )}
    >
      <Image
        className="rounded-md h-full object-cover"
        src={img}
        alt="image"
        width={50}
        height={50}
      />
      {/* <button
        onClick={() =>
          setImageUrl((prev) => {
            return prev.filter((i) => i != img);
          })
        }
        className="p-[4px] absolute top-[-10px] right-[-10px] bg-rose-500 rounded-full"
      >
        <X className="w-3 h-3" />
      </button> */}
    </motion.div>
  );
};

export default DraggableImage;
