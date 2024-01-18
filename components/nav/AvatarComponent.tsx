import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface props {
  fallback: string;
  src: string | null | undefined;
}

const AvatarComponent: React.FC<props> = ({ fallback, src }) => {
  return (
    <Avatar className="rounded-full">
      <AvatarImage src={src || ""} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
