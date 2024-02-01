"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface props {
  fallback: string;
  src: string | null | undefined;
  className?: string;
}

const AvatarComponent: React.FC<props> = ({ fallback, src, className }) => {
  return (
    <Avatar className={cn("rounded-full border border-primary", className)}>
      <AvatarImage src={src || ""} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
