"use client";

import React, { useEffect, useState } from 'react';
import CharacterCard from "@/components/ui/characterCard"; // Điều chỉnh đường dẫn import cho đúng
import { Loader2 } from "lucide-react";

// Định nghĩa kiểu dữ liệu trả về từ API
interface CharacterData {
    id: string;
    name: string;
    image: string;
    rarity: 4 | 5;
    element: string;
    level: number;
}

const CharactersPage = () => {
    const [characters, setCharacters] = useState<CharacterData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/v1/gi-wiki/characters');

                if (!response.ok) {
                    throw new Error('Không thể tải dữ liệu nhân vật');
                }

                const data = await response.json();
                setCharacters(Array.isArray(data) ? data : data.characters);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    if (loading) {
        return (
            <div className="flex h-96 w-full items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-96 w-full items-center justify-center text-red-500">
                <p>Lỗi: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Nhân Vật Genshin Impact
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Danh sách chi tiết các nhân vật trong thế giới Teyvat
                </p>
            </header>

            {/* Grid hiển thị danh sách */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {characters.map((char) => (
                    <CharacterCard
                        key={char.id}
                        name={char.name}
                        image={char.image}
                        rarity={char.rarity}
                        element={char.element}
                        level={char.level}
                    />
                ))}
            </div>

            {characters.length === 0 && (
                <p className="text-center text-slate-500 mt-10">Không tìm thấy nhân vật nào.</p>
            )}
        </div>
    );
};

export default CharactersPage;