"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const themes = [
  { name: "emerald", label: "Light", icon: FaSun },
  { name: "dark", label: "Dark", icon: FaMoon },
];

export default function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const [currentTheme, setCurrentTheme] = useState("emerald");

  const syncTheme = (themeName: string) => {
    const isDark = themeName === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "emerald");
  };

  useEffect(() => {
    // Get theme from localStorage or default to emerald
    const savedTheme = localStorage.getItem("theme") || "emerald";
    setCurrentTheme(savedTheme);
    syncTheme(savedTheme);
  }, []);

  const changeTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    syncTheme(themeName);
    localStorage.setItem("theme", themeName);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === "emerald" ? "dark" : "emerald";
    changeTheme(newTheme);
  };

  const currentThemeData = themes.find(theme => theme.name === currentTheme) || themes[0];
  const CurrentIcon = currentThemeData.icon;

  const commonClasses = cn(
    "transition-colors duration-200",
    isMobile
      ? "w-full justify-start rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
      : "border-border/80 bg-background/75 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground dark:bg-background/40 dark:text-foreground"
  );

  return (
    <Button
      type="button"
      variant={isMobile ? "ghost" : "outline"}
      size={isMobile ? "sm" : "icon-sm"}
      onClick={toggleTheme}
      className={commonClasses}
      aria-label={`Switch to ${currentTheme === "emerald" ? "dark" : "light"} mode`}
    >
      <CurrentIcon className="size-4" />
      {isMobile && <span>{currentThemeData.label}</span>}
    </Button>
  );
}
