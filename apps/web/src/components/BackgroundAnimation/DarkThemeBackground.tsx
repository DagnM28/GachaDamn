"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./BackgroundAnimation.module.css";

export default function DarkThemeBackground() {
  const starsRef = useRef<HTMLDivElement[]>([]);
  const shootingStarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stars = starsRef.current;

    // Twinkle animation for stars
    stars.forEach((star, index) => {
      gsap.to(star, {
        opacity: "random(0.2, 1)",
        duration: "random(1, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1,
      });
    });

    // Shooting stars animation
    const createShootingStar = () => {
      if (!shootingStarsRef.current) return;

      const shootingStar = document.createElement("div");
      shootingStar.className = styles.shootingStar;

      // Random start position (top area)
      const startX = Math.random() * 100;
      const startY = Math.random() * 30;

      shootingStar.style.left = `${startX}%`;
      shootingStar.style.top = `${startY}%`;

      shootingStarsRef.current.appendChild(shootingStar);

      // Animate shooting star
      gsap.to(shootingStar, {
        x: "random(-300, -200)",
        y: "random(200, 300)",
        opacity: 0,
        duration: "random(1, 1.5)",
        ease: "power2.in",
        onComplete: () => {
          shootingStar.remove();
        },
      });
    };

    // Create shooting stars at random intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        createShootingStar();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Generate random star positions
  const starPositions = Array.from({ length: 30 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
  }));

  return (
    <div className={styles.darkBackground}>
      {/* Small stars */}
      <div className={styles.stars}>
        {starPositions.map((pos, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) starsRef.current[i] = el;
            }}
            className={styles.star}
            style={{
              left: pos.left,
              top: pos.top,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars container */}
      <div ref={shootingStarsRef} className={styles.shootingStars} />
    </div>
  );
}
