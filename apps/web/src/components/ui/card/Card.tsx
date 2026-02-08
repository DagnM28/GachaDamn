"use client";

import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  title?: string;
  variant?: "default" | "primary" | "secondary";
  hoverable?: boolean;
  className?: string;
}

export default function Card({
  children,
  title,
  variant = "default",
  hoverable = false,
  className = "",
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const stars = starsRef.current;

    // Floating animation for stars
    stars.forEach((star, index) => {
      gsap.to(star, {
        y: "random(-3, 3)",
        x: "random(-2, 2)",
        rotation: "random(-15, 15)",
        duration: "random(2, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.15,
      });
    });
  }, []);

  const handleMouseEnter = () => {
    if (!hoverable) return;

    const stars = starsRef.current;
    stars.forEach((star) => {
      gsap.to(star, {
        scale: 1.2,
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  const handleMouseLeave = () => {
    if (!hoverable) return;

    const stars = starsRef.current;
    stars.forEach((star) => {
      gsap.to(star, {
        scale: 1,
        opacity: 0.4,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles[variant]} ${hoverable ? styles.hoverable : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shadow layer for 3D effect */}
      <div className={styles.shadowLayer} />

      {/* Decorative stars */}
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

      {/* Animated border */}
      <div className={styles.borderGlow} />

      {/* Content */}
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
