"use client";

import React from "react";
import { RatingStarIcon } from "@/components/all_icons";

interface SidebarProps {
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
    products: any[];
}

const ratings = ["5", "4", "3", "2", "1"];

const Sidebar: React.FC<SidebarProps> = ({
                                             filters,
                                             setFilters,
                                             products,
                                         }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = (type: string, value: string) => {
        setFilters((prev: any) => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter((v: string) => v !== value)
                : [...prev[type], value],
        }));
    };

    // 🔥 Dynamic category & brand from API data
    const categories = Array.from(
        new Set(
            products.flatMap((p) => p.category || [])
        )
    );

    const brands = Array.from(
        new Set(
            products.flatMap((p) => p.brand || [])
        )
    );

    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);

    const discountRanges = Array.from(
        new Set(products.map((p) => p.discount))
    )
        .filter((d) => d > 0)
        .map((d) => {
            const min = Math.floor(d / 20) * 20;
            const max = min + 20;
            return `${min} - ${max}%`;
        })
        .filter((v, i, arr) => arr.indexOf(v) === i)
        .sort((a, b) => Number(a) - Number(b));

    return (
        <div className="w-full md:w-64 shrink-0">
            {/* Mobile Filter Button */}
            <button
                className="md:hidden w-max py-1.5 px-2 rounded-md font-medium border border-gray-200 mb-1 text-sm flex gap-2"
                onClick={() => setIsOpen(true)}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" stroke-linecap="round">
                    <line x1="4" y1="6" x2="20" y2="6"/>
                    <circle cx="12" cy="6" r="1.8" fill="currentColor"/>

                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <circle cx="8" cy="12" r="1.8" fill="currentColor"/>

                    <line x1="4" y1="18" x2="20" y2="18"/>
                    <circle cx="16" cy="18" r="1.8" fill="currentColor"/>
                </svg>
                Filters
            </button>

            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <div className={`
                fixed inset-y-0 left-0 bg-white z-50 w-72 p-5 overflow-y-auto transition-transform duration-300 ease-in-out shadow-xl
                md:relative md:translate-x-0 md:p-0 md:bg-transparent md:z-auto md:shadow-none md:w-full space-y-5
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="flex justify-between items-center md:hidden pb-4 border-b mb-4">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 text-2xl leading-none">
                        &times;
                    </button>
                </div>

            {/* Categories */}
            {categories.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Categories</h3>
                    {categories.map((c) => (
                        <label key={c} className="flex gap-2 items-center text-sm">
                            <input
                                type="checkbox"
                                checked={filters.category.includes(c)}
                                onChange={() => toggle("category", c)}
                            />
                            {c}
                        </label>
                    ))}
                </div>
            )}

            {/* Brands */}
            {brands.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Brands</h3>
                    {brands.map((b) => (
                        <label key={b} className="flex gap-2 items-center text-sm">
                            <input
                                type="checkbox"
                                checked={filters.brand.includes(b)}
                                onChange={() => toggle("brand", b)}
                            />
                            {capitalize(b)}
                        </label>
                    ))}
                </div>
            )}


            {/* Discount */}
            {discountRanges.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Discount</h3>
                    {discountRanges.map((d) => (
                        <label key={d} className="flex gap-2 items-center text-sm">
                            <input
                                type="checkbox"
                                checked={filters.discount.includes(d)}
                                onChange={() => toggle("discount", d)}
                            />
                            {d}
                        </label>
                    ))}
                </div>
            )}

            {/* Ratings */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Ratings</h3>
                {ratings.map((r) => (
                    <label key={r} className="flex gap-2 items-center text-sm">
                        <input
                            type="checkbox"
                            checked={filters.ratings.includes(r)}
                            onChange={() => toggle("ratings", r)}
                        />
                        <RatingStarIcon /> {r} Star
                    </label>
                ))}
            </div>

            {/* Price */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Price</h3>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.price[0]}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                price: [Number(e.target.value), filters.price[1]],
                            })
                        }
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.price[1]}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                price: [filters.price[0], Number(e.target.value)],
                            })
                        }
                        className="w-full border p-2 rounded"
                    />
                </div>
            </div>
            </div>
        </div>
    );
};

export default Sidebar;
