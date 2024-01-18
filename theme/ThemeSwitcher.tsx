"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLaptopMac, MdLightMode } from "react-icons/md";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid rehydration errors
  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border">
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <MdLightMode className="h-3 w-3  md:h-[1.2rem] md:w-[1.2rem]" />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MdDarkMode className="h-3 w-3  md:h-[1.2rem] md:w-[1.2rem]" />
        </TabsTrigger>
        <TabsTrigger
          className=""
          value="system"
          onClick={() => setTheme("system")}
        >
          <MdLaptopMac className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ThemeSwitcher;
