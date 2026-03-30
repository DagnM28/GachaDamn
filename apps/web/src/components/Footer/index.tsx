"use client";

import React, { useEffect, useState } from 'react';
import { Github, Twitter, Facebook, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-black/5 dark:border-white/10 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Cột 1: Giới thiệu & Logo */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">D</div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                                Gacha<span className="text-indigo-500">DaMN</span>-Wiki
                            </span>
                        </div>
                    </div>

                    {/* Cột 2: Danh mục chính */}
                    <div>
                    </div>

                    {/* Cột 3: Cộng đồng */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Cộng đồng</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><a href="#" className="hover:text-indigo-500 transition-colors">Diễn đàn thảo luận</a></li>
                            <li><a href="#" className="hover:text-indigo-500 transition-colors">Nhóm Facebook</a></li>
                            <li><a href="#" className="hover:text-indigo-500 transition-colors">Discord Server</a></li>
                            <li><a href="#" className="hover:text-indigo-500 transition-colors flex items-center gap-1">Đóng góp bài viết <ExternalLink size={12} /></a></li>
                        </ul>
                    </div>

                    {/* Cột 4: Hỗ trợ */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Thông tin</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><a href="#" className="hover:text-indigo-500 transition-colors">Điều khoản sử dụng</a></li>
                            <li><a href="#" className="hover:text-indigo-500 transition-colors">Chính sách bảo mật</a></li>
                            <li><a href="#" className="hover:text-indigo-500 transition-colors">Liên hệ quảng cáo</a></li>
                            <li><a href="#" className="hover:text-indigo-500 transition-colors">Đội ngũ phát triển</a></li>
                        </ul>
                    </div>
                </div>

                {/* Thanh dưới cùng: Bản quyền & Social */}
                <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                        © {currentYear} GachaDaMN Wiki. All rights reserved.
                        <span className="mx-2">|</span>
                        Sản phẩm được thực hiện bởi DaMN-Team.
                    </div>

                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                        <a href="#" className="hover:text-indigo-500 transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="hover:text-indigo-500 transition-colors"><Facebook size={18} /></a>
                        <a href="#" className="hover:text-indigo-500 transition-colors"><Github size={18} /></a>
                        <a href="#" className="hover:text-indigo-500 transition-colors"><Mail size={18} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;