"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  size?: "small" | "medium" | "large";
  variant?: "default" | "primary" | "secondary";
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  size = "medium",
  variant = "default",
  showLabel = false,
  animated = true,
  className = "",
}: ProgressBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  useEffect(() => {
    if (!animated || !fillRef.current) return;

    // Animate fill
    gsap.to(fillRef.current, {
      width: `${percentage}%`,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate glow
    if (glowRef.current && percentage > 0) {
      gsap.to(glowRef.current, {
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // Animate stars
    starsRef.current.forEach((star, index) => {
      if (star) {
        gsap.to(star, {
          x: "random(-2, 2)",
          y: "random(-2, 2)",
          rotation: "random(-10, 10)",
          duration: "random(1.5, 2.5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1,
        });
      }
    });
  }, [percentage, animated]);

  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      <div className={`${styles.track} ${styles[variant]}`}>
        {/* Shadow layer for 3D effect */}
        <div className={styles.shadowLayer} />

        {/* Fill */}
        <div
          ref={fillRef}
          className={styles.fill}
          style={{ width: animated ? "0%" : `${percentage}%` }}
        >
          {/* Glow effect */}
          <div ref={glowRef} className={styles.glow} />

          {/* Stars decoration */}
          <div className={styles.stars}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) starsRef.current[i] = el;
                }}
                className={styles.star}
              />
            ))}
          </div>
        </div>

        {/* Animated border */}
        <div className={styles.borderGlow} />
      </div>

      {/* Label */}
      {showLabel && (
        <div className={styles.label}>{Math.round(percentage)}%</div>
      )}
    </div>
  );
}
