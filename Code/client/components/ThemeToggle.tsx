"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const themes = [
  { name: "emerald", label: "Light", icon: FaSun },
  { name: "dark", label: "Dark", icon: FaMoon },
];

export default function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const [currentTheme, setCurrentTheme] = useState("emerald");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get theme from localStorage or default to emerald
    const savedTheme = localStorage.getItem("theme") || "emerald";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
    setIsOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === "emerald" ? "dark" : "emerald";
    changeTheme(newTheme);
  };

  const currentThemeData = themes.find(theme => theme.name === currentTheme) || themes[0];
  const CurrentIcon = currentThemeData.icon;

  // Mobile simple toggle button
  if (isMobile) {
    return (
      <button
        onClick={toggleTheme}
        className="btn btn-ghost btn-sm text-base-content hover:bg-primary hover:text-white transition-all duration-300 flex items-center space-x-2"
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="text-sm">{currentThemeData.label}</span>
      </button>
    );
  }

  // Desktop dropdown
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle text-white hover:bg-white/20 transition-all duration-300 w-10 h-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CurrentIcon className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      
      <ul
        tabIndex={0}
        className={`dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-36 md:w-40 z-[1] transform transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <li key={theme.name}>
              <button
                onClick={() => changeTheme(theme.name)}
                className={`flex items-center space-x-2 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg px-3 py-2 text-sm md:text-base ${
                  currentTheme === theme.name ? "bg-primary text-white" : ""
                }`}
              >
                <Icon className="w-3 h-3 md:w-4 md:h-4" />
                <span>{theme.label}</span>
                {currentTheme === theme.name && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
