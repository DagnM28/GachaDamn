"use client";

import React, { useMemo } from 'react';
import Card from "../ui/cardOption";
import Hero from '../heroSection';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const gameOptions = [
    {
        id: 1,
        title: "Genshin Impact",
        image: "/assets/paimon.png",
        hoverImage: "/assets/paimon2.png",
        category: "Mihoyo",
        href: "/games/genshin"
    },
    {
        id: 2,
        title: "Honkai: Star Rail",
        image: "/assets/pompom.png",
        hoverImage: "/assets/pompom2.png",
        category: "Mihoyo",
        href: "/games/starrail"
    },
    {
        id: 3,
        title: "Arknights: Endfield",
        image: "/assets/chen.png",
        hoverImage: "/assets/chen2.png",
        category: "Hypergryph",
        href: "/games/endfield"
    },
    {
        id: 4,
        title: "Fate: Grand Order",
        image: "/assets/castoria.png",
        hoverImage: "/assets/castoria2.png",
        category: "Aniplex",
        href: "/games/fgo"
    },
];

const Home = () => {
    const params = useParams();
    const locale = params.locale;

    const items = useMemo(() => gameOptions, []);

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden">
            <main className="flex-grow z-10">
                <Hero />
                <section className="relative px-4 pb-24 z-10">
                    <div className="container mx-auto max-w-4xl">
                        <div className="grid grid-cols-2 gap-8 md:gap-12">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-center">
                                    <Link href={`/${locale}${item.href}`} className="w-full max-w-[320px]">
                                        <Card
                                            title={item.title}
                                            image={item.image}
                                            hoverImage={item.hoverImage}
                                            category={item.category}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div >
    );
};

export default Home;