"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import styles from "./Slider.module.css";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "small" | "medium" | "large";
  variant?: "default" | "primary" | "secondary";
  showLabel?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = "medium",
  variant = "default",
  showLabel = false,
  disabled = false,
  className = "",
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  useEffect(() => {
    const stars = starsRef.current;

    // Floating animation for stars
    stars.forEach((star, index) => {
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
    });
  }, []);

  const updateValue = (clientX: number) => {
    if (!trackRef.current || disabled) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newPercentage = (x / rect.width) * 100;
    const rawValue = (newPercentage / 100) * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    onChange(clampedValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateValue(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      <div
        ref={trackRef}
        className={`${styles.track} ${styles[variant]} ${disabled ? styles.disabled : ""}`}
        onMouseDown={handleMouseDown}
      >
        {/* Shadow layer for 3D effect */}
        <div className={styles.shadowLayer} />

        {/* Fill */}
        <div className={styles.fill} style={{ width: `${percentage}%` }}>
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

        {/* Thumb */}
        <div
          ref={thumbRef}
          className={styles.thumb}
          style={{ left: `${percentage}%` }}
        />

        {/* Animated border */}
        <div className={styles.borderGlow} />
      </div>

      {/* Label */}
      {showLabel && <div className={styles.label}>{Math.round(value)}</div>}
    </div>
  );
}
