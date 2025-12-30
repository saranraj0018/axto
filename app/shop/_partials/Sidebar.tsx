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
        new Set(products.map((p) => p.category).filter(Boolean))
    );

    const brands = Array.from(
        new Set(products.map((p) => p.brand).filter(Boolean))
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
        <div className="w-full md:w-64 space-y-5">

            {/* Categories */}
            {categories.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Categories</h3>
                    {categories.map((c) => (
                        <label key={c} className="flex gap-2 items-center text-sm">
                            <input
                                type="checkbox"
                                checked={filters.category.includes(c.toLowerCase())}
                                onChange={() => toggle("category", c.toLowerCase())}
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
    );
};

export default Sidebar;
