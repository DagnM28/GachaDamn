"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Sword, Trophy, Package, Beaker } from "lucide-react";
import { gsap } from "gsap";

interface Category {
  id: number;
  icon: React.ElementType;
  label: string;
  neonColor: string;
  glowColor: string;
}

const categories: Category[] = [
  {
    id: 1,
    icon: User,
    label: "NHÂN VẬT",
    neonColor: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    id: 2,
    icon: Sword,
    label: "VŨ KHÍ",
    neonColor: "#8B5CF6",
    glowColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    id: 3,
    icon: Trophy,
    label: "THÀNH TỰU",
    neonColor: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: 4,
    icon: Package,
    label: "VẬT PHẨM",
    neonColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: 5,
    icon: Beaker,
    label: "CÔNG THỨC",
    neonColor: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
  },
];

export default function DatabaseGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Copy refs vào biến local để tránh stale closure
    const iconElements = iconRefs.current;
    const glowElements = glowRefs.current;

    // Cleanup function để dọn dẹp animations
    return () => {
      iconElements.forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
      glowElements.forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
    };
  }, []);

  useEffect(() => {
    // Chỉ chạy hover animation trên desktop
    if (hoveredId !== null && !isMobile) {
      const index = categories.findIndex((cat) => cat.id === hoveredId);
      const iconEl = iconRefs.current[index];
      const glowEl = glowRefs.current[index];

      if (iconEl) {
        // GSAP animation cho floating effect (nhịp thở)
        gsap.to(iconEl, {
          y: -15,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (glowEl) {
        // GSAP animation cho glow pulsing
        gsap.to(glowEl, {
          scale: 1.2,
          opacity: 0.6,
          duration: 1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    } else {
      // Reset animations khi không hover
      iconRefs.current.forEach((el) => {
        if (el) {
          gsap.killTweensOf(el);
          gsap.to(el, { y: 0, duration: 0.3 });
        }
      });
      glowRefs.current.forEach((el) => {
        if (el) {
          gsap.killTweensOf(el);
          gsap.to(el, { scale: 1, opacity: 0, duration: 0.3 });
        }
      });
    }
  }, [hoveredId, isMobile]);

  const handleClick = (id: number) => {
    setClickedId(id);
    // Reset clicked state sau animation
    setTimeout(() => setClickedId(null), 600);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
        width: "100vw",
        background: "var(--background)",
        opacity: 0.8,
        overflow: isMobile ? "auto" : "hidden",
        position: "relative",
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.02,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {categories.map((item, index) => {
        const Icon = item.icon;
        const isHovered = hoveredId === item.id;
        const isClicked = clickedId === item.id;

        return (
          <motion.div
            key={item.id}
            onMouseEnter={() => !isMobile && setHoveredId(item.id)}
            onMouseLeave={() => !isMobile && setHoveredId(null)}
            onClick={() => handleClick(item.id)}
            style={{
              flex: 1,
              flexBasis: isMobile ? "auto" : "20%",
              flexShrink: isMobile ? 1 : 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: !isMobile && index > 0 ? "1px solid rgba(255,255,255,0.03)" : "none",
              borderTop: isMobile && index > 0 ? "1px solid rgba(255,255,255,0.03)" : "none",
              cursor: "pointer",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
              minHeight: isMobile ? "20vh" : "auto",
              padding: isMobile ? "2rem 1rem" : "0",
              opacity: 1
            }}
            animate={{
              flex: !isMobile && isHovered ? 1.5 : 1,
              flexBasis: !isMobile && isHovered ? "30%" : isMobile ? "auto" : "20%",
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
          >
            {/* Stage Lighting - Spotlight từ trên xuống */}
            <AnimatePresence>
              {isHovered && !isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                    background: `radial-gradient(ellipse 60% 80% at 50% -20%, ${item.glowColor} 0%, transparent 60%)`,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Click Flash Effect - Nhấp nháy khi click */}
            <AnimatePresence>
              {isClicked && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.8, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, times: [0, 0.2, 0.4, 1] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 5,
                    pointerEvents: "none",
                    background: `radial-gradient(circle at center, ${item.neonColor}40 0%, transparent 70%)`,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Glass Card - Thẻ kính mờ chứa biểu tượng */}
            <motion.div
              style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: isMobile ? "100%" : "auto",
                maxWidth: isMobile ? "300px" : "200px",
                padding: isMobile ? "2rem 1.5rem" : "3rem 2rem",
                borderRadius: "20px",
                background: isHovered
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: isHovered
                  ? `0 8px 32px 0 ${item.glowColor}, inset 0 0 20px rgba(255, 255, 255, 0.05)`
                  : "0 4px 16px 0 rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
              animate={{
                y: !isMobile && isHovered ? -25 : 0,
                scale: !isMobile && isHovered ? 1.05 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
              }}
            >
              {/* Click pulse animation overlay */}
              <AnimatePresence>
                {isClicked && (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: [0.95, 1.05, 1] }}
                    exit={{ scale: 1 }}
                    transition={{ 
                      duration: 0.4,
                      times: [0, 0.5, 1],
                      ease: "easeOut"
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "20px",
                      border: `2px solid ${item.neonColor}`,
                      boxShadow: `0 0 30px ${item.glowColor}`,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Glow Aura - Quầng sáng phía sau */}
              <div
                ref={(el) => {
                  glowRefs.current[index] = el;
                }}
                style={{
                  position: "absolute",
                  width: isMobile ? "150px" : "200px",
                  height: isMobile ? "150px" : "200px",
                  borderRadius: "50%",
                  filter: "blur(60px)",
                  backgroundColor: item.glowColor,
                  opacity: 0,
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />

              {/* Floor Reflection - Phản chiếu xuống sàn ảo */}
              <AnimatePresence>
                {isHovered && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 0.15, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: "150px",
                      width: "128px",
                      height: "128px",
                      borderRadius: "50%",
                      filter: "blur(40px)",
                      background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 70%)`,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Icon chính với GSAP Floating */}
              <div
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                style={{
                  position: "relative",
                  transition: "all 0.5s",
                  color: isHovered || isMobile ? item.neonColor : "#4a4a4a",
                  filter: isHovered || isMobile
                    ? `drop-shadow(0 0 20px ${item.glowColor})`
                    : "none",
                }}
              >
                <Icon size={isMobile ? 56 : 72} strokeWidth={1.2} />
              </div>

              {/* Typography - Phông chữ mảnh, giãn cách rộng */}
              <motion.div
                style={{
                  marginTop: isMobile ? "1.5rem" : "3rem",
                  textAlign: "center",
                }}
                animate={{
                  opacity: isHovered || isMobile ? 1 : 0.25,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  style={{
                    display: "block",
                    fontSize: isMobile ? "9px" : "10px",
                    fontWeight: 200,
                    letterSpacing: "0.25em",
                  }}
                  animate={{
                    color: isHovered || isMobile ? "#ffffff" : "#555555",
                    letterSpacing: isHovered || isMobile ? "0.3em" : "0.25em",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {item.label}
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Bottom accent line */}
            <motion.div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: item.neonColor,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: !isMobile && isHovered ? 1 : 0,
                opacity: !isMobile && isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
