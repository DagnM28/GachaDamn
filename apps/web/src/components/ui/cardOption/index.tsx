"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    image: string;
    hoverImage?: string;
    title: string;
    category?: string;
}

const Card = ({ image, hoverImage, title, category = "Wiki" }: CardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl backdrop-blur-sm p-3 transition-all"
        >
            <div className="relative aspect-square overflow-hidden rounded-x1">
                <img
                    src={image}
                    alt={title}
                    className={`h-full w-full object-cover transition-all duration-500 
                        ${hoverImage ? 'group-hover:opacity-0 group-hover:scale-110' : 'group-hover:scale-110'}`}
                />

                {hoverImage && (
                    <img
                        src={hoverImage}
                        alt={`${title} hover`}
                        className="absolute inset-0 h-full w-full object-cover opacity-0 scale-105 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
                    />
                )}
            </div>

            <div className="mt-4 px-1 pb-2 flex flex-col items-center">
                <h3 className="mt-1 line-clamp-1 text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {title}
                </h3>
            </div>
        </motion.div>
    );
};

export default Card;