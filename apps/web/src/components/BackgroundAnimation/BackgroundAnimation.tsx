"use client";

import { useTheme } from "@/contexts/ThemeContext";
import LightThemeBackground from "./LightThemeBackground";
import DarkThemeBackground from "./DarkThemeBackground";
import styles from "./BackgroundAnimation.module.css";

export default function BackgroundAnimation() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={styles.container}>
      {isDark ? <DarkThemeBackground /> : <LightThemeBackground />}
    </div>
  );
}
