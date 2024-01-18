"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeSwitcherOneClick = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (theme == "light")
    return (
      <button
        className="p-2 w-min hover:bg-accent hover:text-accent-foreground transition rounded-md"
        onClick={() => setTheme("dark")}
      >
        <Sun />
      </button>
    );
  if (theme == "dark")
    return (
      <button
        className="p-2 w-min hover:bg-accent hover:text-accent-foreground transition rounded-md"
        onClick={() => setTheme("light")}
      >
        <Moon />
      </button>
    );
};

export default ThemeSwitcherOneClick;
