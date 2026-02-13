"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CustomScrollbar.module.css";

export default function CustomScrollbar() {
  const liquidRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Liquid flow animation
    if (liquidRef.current) {
      gsap.to(liquidRef.current, {
        backgroundPosition: "0% 200%",
        duration: 3,
        repeat: -1,
        ease: "none",
      });
    }

    // Glow pulsing
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Update scrollbar thumb height on scroll
    const updateScrollbar = () => {
      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      const thumb = document.querySelector(`.${styles.scrollbarThumb}`) as HTMLElement;
      if (thumb) {
        thumb.style.top = `${scrollPercentage}%`;
      }
    };

    window.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);
    updateScrollbar();

    return () => {
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
    };
  }, []);

  return (
    <div className={styles.scrollbarContainer}>
      {/* Energy tube outer shell */}
      <div className={styles.scrollbarTrack}>
        {/* Inner glow */}
        <div ref={glowRef} className={styles.innerGlow} />
        
        {/* Liquid gradient */}
        <div ref={liquidRef} className={styles.liquid} />
        
        {/* Glass reflection */}
        <div className={styles.glassReflection} />
        
        {/* Energy particles */}
        <div className={styles.particles}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                animationDelay: `${i * 0.3}s`,
                left: `${20 + Math.random() * 60}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Scrollbar thumb (indicator) */}
      <div className={styles.scrollbarThumb}>
        <div className={styles.thumbGlow} />
      </div>
    </div>
  );
}
