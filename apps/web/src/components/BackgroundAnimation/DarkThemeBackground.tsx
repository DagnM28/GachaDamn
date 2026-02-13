"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import styles from "./BackgroundAnimation.module.css";

export default function DarkThemeBackground() {
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const galaxyStarsRef = useRef<HTMLDivElement[]>([]);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate galaxy dust particles (memoized to prevent re-creation)
  const particlePositions = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 0.5,
        layer: i % 3,
      })),
    []
  );

  // Generate galaxy band stars (memoized to keep positions fixed)
  const galaxyStars = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => {
      // Create diagonal band
      const progress = i / 150;
      const bandWidth = 30; // Width of the galaxy band in percentage

      // Diagonal line from bottom-left to top-right
      const centerX = progress * 100;
      const centerY = 100 - progress * 100;

      // Add random offset within band width
      const offsetX = (Math.random() - 0.5) * bandWidth;
      const offsetY = (Math.random() - 0.5) * bandWidth;

      return {
        left: `${Math.max(0, Math.min(100, centerX + offsetX))}%`,
        top: `${Math.max(0, Math.min(100, centerY + offsetY))}%`,
        size: Math.random() * 2.5 + 0.8,
        brightness: Math.random(),
      };
    });
  }, []);

  useEffect(() => {
    const particles = particlesRef.current;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Nebula layers rotation and pulsing
    if (nebulaRef.current) {
      const nebula1 = nebulaRef.current.querySelector(`.${styles.nebula1}`);
      const nebula2 = nebulaRef.current.querySelector(`.${styles.nebula2}`);
      const nebula3 = nebulaRef.current.querySelector(`.${styles.nebula3}`);

      if (nebula1) {
        gsap.to(nebula1, {
          rotation: 360,
          duration: 180,
          repeat: -1,
          ease: "none",
        });
        gsap.to(nebula1, {
          scale: 1.1,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (nebula2) {
        gsap.to(nebula2, {
          rotation: -360,
          duration: 240,
          repeat: -1,
          ease: "none",
        });
        gsap.to(nebula2, {
          scale: 1.15,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (nebula3) {
        gsap.to(nebula3, {
          rotation: 360,
          duration: 200,
          repeat: -1,
          ease: "none",
        });
      }
    }

    // Galaxy dust particles with parallax
    particles.forEach((particle, index) => {
      const layer = index % 3;
      const speed = layer === 0 ? 60 : layer === 1 ? 90 : 120;

      // Floating animation
      gsap.to(particle, {
        y: `random(-30, 30)`,
        x: `random(-20, 20)`,
        duration: speed,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5,
      });

      // Opacity flickering
      gsap.to(particle, {
        opacity: `random(0.1, 0.8)`,
        duration: `random(2, 5)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.05,
      });
    });

    // Galaxy stars twinkling
    galaxyStarsRef.current.forEach((star, index) => {
      if (!star) return;

      gsap.to(star, {
        opacity: `random(0.3, 1)`,
        scale: `random(0.8, 1.2)`,
        duration: `random(1, 3)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.02,
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      particles.forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
      galaxyStarsRef.current.forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
    };
  }, []);

  // Update star brightness based on mouse proximity
  useEffect(() => {
    galaxyStarsRef.current.forEach((star) => {
      if (!star) return;

      const rect = star.getBoundingClientRect();
      const starX = rect.left + rect.width / 2;
      const starY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mousePos.x - starX, 2) + Math.pow(mousePos.y - starY, 2)
      );

      const maxDistance = 300;
      const brightness = Math.max(0, 1 - distance / maxDistance);

      gsap.to(star, {
        opacity: 0.3 + brightness * 0.7,
        scale: 0.8 + brightness * 0.6,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [mousePos]);

  return (
    <div className={styles.darkBackground}>
      {/* Nebula layers */}
      <div ref={nebulaRef} className={styles.nebulaContainer}>
        <div className={styles.nebula1} />
        <div className={styles.nebula2} />
        <div className={styles.nebula3} />
      </div>

      {/* Distant galaxies */}
      <div className={styles.distantGalaxies}>
        <div className={styles.galaxy1} />
        <div className={styles.galaxy2} />
        <div className={styles.galaxy3} />
      </div>

      {/* Galaxy dust particles */}
      <div className={styles.galaxyDust}>
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) particlesRef.current[i] = el;
            }}
            className={`${styles.particle} ${styles[`particleLayer${pos.layer}`]}`}
            style={{
              left: pos.left,
              top: pos.top,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
            }}
          />
        ))}
      </div>

      {/* Galaxy band - diagonal from bottom-left to top-right */}
      <div className={styles.galaxyBand}>
        {galaxyStars.map((star, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) galaxyStarsRef.current[i] = el;
            }}
            className={styles.galaxyStar}
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </div>

      {/* Aurora effect */}
      <div className={styles.aurora}>
        <div className={styles.auroraWave1} />
        <div className={styles.auroraWave2} />
      </div>
    </div>
  );
}
