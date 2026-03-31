"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Settings, Moon, Sun, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from "next-themes"; // Import cái này
import BackgroundMusic from '../bgMusic';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme(); // Lấy hàm setTheme ra
    const menuRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    const params = useParams();
    const locale = params.locale;

    useEffect(() => {
        setMounted(true);
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!mounted) return null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                <Link className="flex items-center gap-2" href={`/${locale}`}>
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">D</div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                        Gacha<span className="text-indigo-500">DaMN</span>-Wiki
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <button className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-all">
                        Đăng nhập
                    </button>

                    <BackgroundMusic src="/music/Unwelcome School.mp3" />

                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <Settings size={20} />
                            <ChevronDown size={14} className={isMenuOpen ? 'rotate-180' : ''} />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-slate-900 p-2 shadow-2xl">

                                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase">Giao diện</div>

                                <button
                                    onClick={() => { setTheme("light"); setIsMenuOpen(false); }}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${theme === 'light' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                >
                                    <Sun size={16} /> <span>Sáng</span>
                                </button>

                                <button
                                    onClick={() => { setTheme("dark"); setIsMenuOpen(false); }}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${theme === 'dark' ? 'bg-indigo-900/30 text-indigo-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                >
                                    <Moon size={16} /> <span>Tối</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header >
    );
}

export default Header;