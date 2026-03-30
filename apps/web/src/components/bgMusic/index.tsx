"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicProps {
    src: string;
}

const BackgroundMusic = ({ src }: MusicProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(true), 2000);
        const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
        return () => { clearTimeout(timer); clearTimeout(hideTimer); };
    }, []);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => console.log("Cần tương tác để phát nhạc"));
            }
            setIsPlaying(!isPlaying);
            setShowTooltip(false);
        }
    };

    return (
        <div className="bottom-6 left-6 z-[100] flex items-center gap-2">
            <audio ref={audioRef} src={src} loop />

            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 shadow-xl"
                    >
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                className={`relative flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all ${isPlaying
                    ? 'bg-indigo-600 border-indigo-400 text-white animate-pulse'
                    : 'bg-white dark:bg-slate-900 border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400'
                    }`}
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}

                {isPlaying && (
                    <div className="absolute -inset-1 rounded-full border border-indigo-500/50 animate-ping" />
                )}
            </motion.button>
        </div>
    );
};

export default BackgroundMusic;