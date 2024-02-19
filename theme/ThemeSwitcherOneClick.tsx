"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeSwitcherOneClick = ({ seeName }: { seeName: boolean }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (theme == "light")
    return (
      <button
        className={cn(
          "w-full hover:bg-background/60 transition rounded-md",
          seeName && "flex gap-3 items-center"
        )}
        onClick={() => setTheme("dark")}
      >
        <div className="flex items-center p-3">
          <Sun className="mx-auto stroke-primary h-6 w-6" />
        </div>
        <div>{seeName && "Light"}</div>
      </button>
    );
  if (theme == "dark")
    return (
      <button
        className={cn(
          "w-full hover:bg-background/60 transition rounded-md",
          seeName && "flex gap-3 items-center"
        )}
        onClick={() => setTheme("light")}
      >
        <div className="p-3 flex items-center">
          <Moon className="mx-auto stroke-primary h-6 w-6" />
        </div>
        <div>{seeName && "Dark"}</div>
      </button>
    );
};

export default ThemeSwitcherOneClick;
