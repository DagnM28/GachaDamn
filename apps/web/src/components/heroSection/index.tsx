"use client";

import React from 'react';
import { BookOpenText, Search } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative w-full pt-20 pb-16 px-4 z-10">
            <div className="container mx-auto max-w-5xl text-center">

                {/* Badge Chào mừng */}
                <div className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 
                bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-4 py-1.5 text-lg font-semibold text-indigo-600
                dark:text-white mb-6 shadow-sm">
                    <BookOpenText size={24} color='white' />
                    Chào mừng bạn đến với GachaDaMN
                </div>

                {/* Tiêu đề chính */}
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-slate-950 dark:text-white leading-[0.95] mb-6">
                    <span className='drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>Khám phá thông số và dữ liệu về </span><span className="text-indigo-500">Gacha game</span>
                </h1>

                {/* Mô tả ngắn */}
                <p className="max-w-2xl mx-auto text-lg text-black dark:text-white leading-relaxed mb-10 font-bold">
                    Tìm kiếm thông tin chi tiết về nhân vật, vũ khí, hướng dẫn build và mọi dữ liệu bạn cần cho chuyến phiêu lưu của mình.
                </p>

                {/* Tiêu đề phần chọn Game */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-black/5 dark:border-white/10" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-transparent px-4 text-lg font-bold uppercase tracking-widest text-slate-500 dark:text-indigo-500">
                            Bạn quan tâm tới?
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;