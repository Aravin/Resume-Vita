"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const themes = [
  { name: "emerald", label: "Light", icon: FaSun },
  { name: "dark", label: "Dark", icon: FaMoon },
];

export default function ThemeToggle() {
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

  const currentThemeData = themes.find(theme => theme.name === currentTheme) || themes[0];
  const CurrentIcon = currentThemeData.icon;

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle text-white hover:bg-white/20 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CurrentIcon className="w-5 h-5" />
      </div>
      
      <ul
        tabIndex={0}
        className={`dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-40 z-[1] transform transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <li key={theme.name}>
              <button
                onClick={() => changeTheme(theme.name)}
                className={`flex items-center space-x-2 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg ${
                  currentTheme === theme.name ? "bg-primary text-white" : ""
                }`}
              >
                <Icon className="w-4 h-4" />
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
