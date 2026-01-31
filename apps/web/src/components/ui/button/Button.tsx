"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  icon,
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);
  const isDisabled = disabled || loading;

  useEffect(() => {
    const stars = starsRef.current;
    
    // Initial animation for stars
    gsap.set(stars, {
      opacity: 0.3,
      scale: 0.8,
    });

    // Floating animation
    stars.forEach((star, index) => {
      gsap.to(star, {
        y: "random(-3, 3)",
        x: "random(-2, 2)",
        rotation: "random(-15, 15)",
        duration: "random(2, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });
  }, []);

  const handleMouseEnter = () => {
    if (isDisabled) return;

    const stars = starsRef.current;
    const button = buttonRef.current;

    // Shooting star effect - infinite loop from left to right
    stars.forEach((star, index) => {
      gsap.killTweensOf(star); // Kill floating animation
      
      // Reset position to left side
      gsap.set(star, {
        x: -100,
        y: `random(-20, 20)`,
        opacity: 0,
        scale: 0.5,
        rotation: -45,
      });

      // Animate across the button
      gsap.to(star, {
        x: 150,
        y: `+=${Math.random() * 40 - 20}`, // Add some vertical variation
        opacity: 1,
        scale: 1.2,
        rotation: 45,
        duration: 1.5,
        delay: index * 0.15,
        ease: "none",
        repeat: -1,
        repeatDelay: 0.3,
        onRepeat: function() {
          // Randomize y position on each repeat
          gsap.set(star, {
            y: `random(-20, 20)`,
          });
        },
      });

      // Fade in/out during travel
      gsap.to(star, {
        opacity: 0,
        duration: 0.3,
        delay: index * 0.15 + 1.2,
        ease: "power2.in",
        repeat: -1,
        repeatDelay: 1.5,
      });
    });

    gsap.to(button, {
      boxShadow: "0 8px 24px rgba(69, 122, 240, 0.5), 0 0 40px rgba(103, 68, 206, 0.3)",
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (isDisabled) return;

    const stars = starsRef.current;
    const button = buttonRef.current;

    // Kill shooting star animations and restart floating
    stars.forEach((star, index) => {
      gsap.killTweensOf(star);
      
      // Return to original position with floating animation
      gsap.to(star, {
        x: 0,
        y: 0,
        opacity: 0.3,
        scale: 0.8,
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Restart floating animation
          gsap.to(star, {
            y: "random(-3, 3)",
            x: "random(-2, 2)",
            rotation: "random(-15, 15)",
            duration: "random(2, 3)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          });
        },
      });
    });

    gsap.to(button, {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      duration: 0.4,
    });
  };

  const handleClick = () => {
    if (isDisabled) return;

    const stars = starsRef.current;
    const button = buttonRef.current;

    // Stars burst outward
    stars.forEach((star, index) => {
      const angle = (index / stars.length) * Math.PI * 2;
      const distance = 15;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.to(star, {
        x: x,
        y: y,
        opacity: 1,
        scale: 1.5,
        rotation: 360,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(star, {
            x: 0,
            y: 0,
            scale: 0.8,
            rotation: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        },
      });
    });

    gsap.to(button, {
      boxShadow: "0 0 50px rgba(69, 122, 240, 0.8), 0 0 80px rgba(103, 68, 206, 0.5)",
      duration: 0.15,
      yoyo: true,
      repeat: 1,
    });

    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      className={`${styles.button} ${styles[variant]} ${isDisabled ? styles.disabled : ""} ${loading ? styles.loading : ""} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={isDisabled}
    >
      {/* 3D shadow layer */}
      <div className={styles.shadowLayer} />
      
      {/* Animated border */}
      <div className={styles.borderGlow} />
      
      <div className={styles.stars}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) starsRef.current[i] = el;
            }}
            className={styles.star}
          />
        ))}
      </div>

      <span className={styles.content}>
        {loading ? (
          <>
            <span className={styles.spinner} />
            Loading...
          </>
        ) : (
          <>
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
          </>
        )}
      </span>
    </button>
  );
}
