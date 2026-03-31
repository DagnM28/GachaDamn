"use client";

import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "next-themes";

// --- UTILS ---
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    });
  }
  return stars;
};

const Cloud = ({ delay = 0, duration = 30, top = '20%', isDark }: { delay?: number; duration?: number; top?: string; isDark: boolean }) => (
  <motion.div
    className="absolute"
    style={{ top, left: '-20%' }}
    animate={{
      x: '120vw',
      opacity: isDark ? 0.2 : 0.8
    }}
    transition={{
      x: { duration, delay, ease: "linear", repeat: Infinity },
      opacity: { duration: 2.5 }
    }}
  >
    <svg width="400" height="160" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M150,150 
           C100,150 80,120 100,100 
           C90,50 140,40 180,60 
           C210,30 290,30 320,70 
           C370,40 430,70 410,110 
           C440,140 400,180 350,170 
           C320,195 240,195 210,170 
           C180,185 140,180 150,150 Z"
        fill={isDark ? "black" : "white"}
      />
    </svg>
  </motion.div>
);

const ShootingStar = () => {
  const startPos = useMemo(() => ({
    top: `${Math.random() * 40}%`,
    left: `${Math.random() * 80 + 20}%`,
    delay: Math.random() * 20,
    duration: Math.random() * 0.8 + 0.7
  }), []);

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{ x: -600, y: 400, opacity: [0, 1, 1, 0] }}
      transition={{ duration: startPos.duration, delay: startPos.delay, repeat: Infinity, repeatDelay: 15 }}
      style={{ top: startPos.top, left: startPos.left, position: 'absolute' }}
    >
      <div className="h-[2px] w-[150px] bg-gradient-to-l from-white via-blue-200 to-transparent rotate-[145deg]" />
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function BackgroundAnimation() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === "dark";

  const stars = useMemo(() => generateStars(100), []);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">

      {/* --- LỚP NỀN (Z-index < 5) --- */}

      {/* 1. Lớp Ban Ngày (Cố định, nằm dưới cùng) */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-white" />

      {/* 2. Lớp Ban Đêm (Chồng lên, thay đổi Opacity) */}
      <motion.div
        className="absolute inset-0 z-[1]"
        initial={false}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        style={{
          background: 'radial-gradient(circle at 30% 30%, #1e293b 0%, #020617 100%)',
        }}
      />

      {/* 3. Lớp Hoàng Hôn ( mix-blend-overlay) */}
      <motion.div
        className="absolute inset-0 z-[2] mix-blend-overlay"
        animate={{ opacity: [0, 0.4, 0] }}
        key={isDark ? 'to-dark' : 'to-light'}
        transition={{ duration: 2.5 }}
        style={{
          background: 'linear-gradient(to top, #f97316, transparent)',
        }}
      />

      {/* Lớp cũ bị thừa - Mình đã xóa bỏ vì nó chồng lấp logic */}
      {/* <motion.div className="absolute inset-0 transition-opacity..." /> */}


      {/* --- LỚP THIÊN THỂ (Z-index >= 5 để hiện lên trên nền đằng sau) --- */}

      {/* SAO & SAO BĂNG (Chỉ hiện khi tối, Z-index trung bình) */}
      <AnimatePresence>
        {isDark && (
          <motion.div
            className="absolute inset-0 z-[5]" // Đặt Z-index cụ thể
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
          >
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white shadow-[0_0_3px_rgba(255,255,255,0.8)]" // Thêm chút glow cho sao
                style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
                animate={{ opacity: [0.3, 1, 0.3] }} // Sửa opacity để sao sáng hơn
                transition={{ duration: star.duration, delay: star.delay, repeat: Infinity }}
              />
            ))}
            <ShootingStar />
            <ShootingStar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MẶT TRỜI */}
      <motion.div
        className="absolute left-[15%] z-[10] h-36 w-36"
        animate={{
          y: isDark ? '110vh' : '15vh',
          filter: isDark ? 'blur(20px)' : 'blur(0px)'
        }}
        transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="h-full w-full rounded-full bg-yellow-400 shadow-[0_0_80px_20px_rgba(250,204,21,0.4)]" />
      </motion.div>

      {/* MẶT TRĂNG */}
      <motion.div
        className="absolute right-[15%] z-[10] h-36 w-36"
        animate={{
          y: isDark ? '15vh' : '110vh',
          filter: isDark ? 'blur(0px)' : 'blur(20px)'
        }}
        transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="relative h-full w-full rounded-full bg-gradient-to-br from-yellow-50 to-slate-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-slate-400/20" />
          <div className="absolute top-16 left-16 w-8 h-8 rounded-full bg-slate-400/20" />
        </div>
      </motion.div>

      {/* MÂY (Z-index cao nhất để che nhẹ các thiên thể) */}
      <div className="absolute inset-0 z-[20]">
        <Cloud top="10%" duration={70} delay={0} isDark={isDark} />
        <Cloud top="25%" duration={50} delay={5} isDark={isDark} />
        <Cloud top="40%" duration={80} delay={10} isDark={isDark} />
      </div>

      {/* LỚP PHỦ CUỐI CÙNG (Để nội dung web nổi lên) */}
      <div className="absolute inset-0 z-[30] bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}