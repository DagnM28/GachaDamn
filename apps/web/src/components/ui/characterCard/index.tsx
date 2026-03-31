"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Zap } from 'lucide-react';

interface CharacterCardProps {
    name: string;
    image: string;
    rarity: 4 | 5;
    element: string;
    level: number;
}

const ELEMENT_COLORS: Record<string, string> = {
    Pyro: 'bg-red-500/80',
    Hydro: 'bg-blue-500/80',
    Anemo: 'bg-teal-400/80',
    Electro: 'bg-purple-500/80',
    Dendro: 'bg-green-500/80',
    Cryo: 'bg-cyan-300/80',
    Geo: 'bg-yellow-600/80',
};

const CharacterCard = ({ name, image, rarity, element, level }: CharacterCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-all shadow-sm hover:shadow-xl dark:hover:shadow-indigo-500/10"
        >
            {/* Cấp độ và Element (Badge) */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                <span className="rounded-full bg-slate-950/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                    Lv.{level}
                </span>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center backdrop-blur-md ${ELEMENT_COLORS[element] || 'bg-slate-500/80'}`}>
                    <Zap size={12} className="text-white" />
                </div>
            </div>

            {/* Thumbnail */}
            <div className="aspect-[3/4] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Thông tin bên dưới */}
            <div className="p-4">
                <div className="flex items-center gap-0.5 mb-1 text-yellow-500">
                    {[...Array(rarity)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                    ))}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                    {name}
                </h3>
                <button className="mt-3 w-full rounded-lg bg-indigo-600/10 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors dark:bg-indigo-500/20 dark:text-indigo-400">
                    Xem chi tiết
                </button>
            </div>
        </motion.div>
    );
};

export default CharacterCard;