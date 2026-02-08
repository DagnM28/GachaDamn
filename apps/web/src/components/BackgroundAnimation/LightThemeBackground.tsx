"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./BackgroundAnimation.module.css";

export default function LightThemeBackground() {
  const cloudsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const clouds = cloudsRef.current;

    // Animate each cloud with different speeds
    clouds.forEach((cloud, index) => {
      const duration = 40 + index * 10; // 40s, 50s, 60s, 70s
      const delay = index * 5; // Stagger start

      gsap.fromTo(
        cloud,
        { x: "100vw" },
        {
          x: "-120%",
          duration,
          delay,
          repeat: -1,
          ease: "none",
        },
      );
    });
  }, []);

  return (
    <div className={styles.lightBackground}>
      {/* Sun */}
      <div className={styles.sun}>
        <div className={styles.sunCore} />
        <div className={styles.sunGlow} />
      </div>

      {/* Clouds */}
      <div className={styles.clouds}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cloudsRef.current[i] = el;
            }}
            className={`${styles.cloud} ${styles[`cloud${i + 1}`]}`}
          >
            <div className={styles.cloudPart1} />
            <div className={styles.cloudPart2} />
            <div className={styles.cloudPart3} />
          </div>
        ))}
      </div>
    </div>
  );
}
