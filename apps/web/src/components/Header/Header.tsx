"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Settings, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/globe.svg"
            alt="Logo"
            width={32}
            height={32}
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>GachaDamn Wiki</span>
        </div>

        <div className={styles.settings} ref={menuRef}>
          <button
            className={styles.settingsButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>

          {isMenuOpen && (
            <div className={styles.menu}>
              <div className={styles.menuHeader}>Theme</div>
              <button
                className={`${styles.menuItem} ${theme === "light" ? styles.active : ""}`}
                onClick={() => handleThemeChange("light")}
              >
                <Sun size={18} />
                Light
              </button>
              <button
                className={`${styles.menuItem} ${theme === "dark" ? styles.active : ""}`}
                onClick={() => handleThemeChange("dark")}
              >
                <Moon size={18} />
                Dark
              </button>
              <button
                className={`${styles.menuItem} ${theme === "system" ? styles.active : ""}`}
                onClick={() => handleThemeChange("system")}
              >
                <Monitor size={18} />
                System
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
