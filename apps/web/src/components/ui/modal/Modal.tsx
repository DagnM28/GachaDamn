"use client";

import { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "small" | "medium" | "large";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Animate in
      const overlay = overlayRef.current;
      const modal = modalRef.current;
      const stars = starsRef.current;

      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Scale animation from center (keeping original)
      gsap.fromTo(
        modal,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );

      // Stars burst animation
      stars.forEach((star, index) => {
        gsap.fromTo(
          star,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.6,
            duration: 0.4,
            delay: 0.2 + index * 0.05,
            ease: "back.out(2)",
          }
        );

        // Floating animation
        gsap.to(star, {
          y: "random(-5, 5)",
          x: "random(-3, 3)",
          rotation: "random(-20, 20)",
          duration: "random(2, 3)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const modal = modalRef.current;

    gsap.to(modal, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "back.in(1.7)",
    });

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={handleClose}>
      <div
        ref={modalRef}
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative stars */}
        <div className={styles.stars}>
          {[...Array(8)].map((_, i) => (
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

        {/* Header */}
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
