"use client";

import React from "react";
import { RatingStarIcon } from "@/components/all_icons";

interface SidebarProps {
  filters: {
    category: string[];
    brand: string[];
    discount: string[];
    ratings: string[];
    price: number[];
    search: string;
    sort: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string[];
      brand: string[];
      discount: string[];
      ratings: string[];
      price: number[];
      search: string;
      sort: string;
    }>
  >;
  products: any[];
  discountRanges: { label: string; min: number; max: number }[];
  ratingsRanges: {
    id: string;
    label: React.ReactNode;
    min: number;
    max: number;
  }[];
  calculateDiscount: (regularPrice: number, sellingPrice: number) => number;
}

const Sidebar: React.FC<SidebarProps> = ({
  filters,
  setFilters,
  products,
  discountRanges,
  ratingsRanges,
  calculateDiscount,
}) => {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const brands = Array.from(new Set(products.map((p) => p.brand)));

  const handleCheckbox = (type: string, value: string) => {
    const current = filters[type as keyof typeof filters] as string[];
    if (current.includes(value)) {
      setFilters({
        ...filters,
        [type]: current.filter((v) => v !== value),
      });
    } else {
      setFilters({
        ...filters,
        [type]: [...current, value],
      });
    }
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPrice = [...filters.price];
    newPrice[index] = parseInt(e.target.value);
    setFilters({ ...filters, price: newPrice });
  };

  return (
    <div className="w-full md:w-50 lg:w-64 space-y-3">
      {/* CLIENT SAID TO REMOVE THIS - INCASE IF NEEDED JUST UNCOMMENT IT */}

      {/* <h3 className="text-2xl font-semibold text-centre md:text-start">
        Filter Options
      </h3>
      <hr className="text-zinc-300 my-5" /> */}
      {/* Categories */}

      {/* CLIENT SAID TO REMOVE THIS - INCASE IF NEEDED JUST UNCOMMENT IT */}
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      <div className="overflow-auto max-h-30">
        
        {categories.map((c) => (
          <label
            key={c}
            className="flex items-center gap-2 mb-1 text-secondary text-sm"
          >
            <input
              type="checkbox"
              checked={filters.category.includes(c)}
              onChange={() => handleCheckbox("category", c)}
            />
            {c}
          </label>
        ))}
      </div>

      {/* Brands */}
        <h3 className="text-lg font-semibold mb-2">Brands</h3>
      <div className="overflow-auto max-h-30">
        {brands.map((b) => (
          <label
            key={b}
            className="flex items-center gap-2 mb-1 text-secondary text-sm"
          >
            <input
              type="checkbox"
              checked={filters.brand.includes(b)}
              onChange={() => handleCheckbox("brand", b)}
            />
            {b}
          </label>
        ))}
      </div>

      {/* Discount */}
        <h3 className="text-lg font-semibold mb-2">Discount</h3>
        <div className="overflow-auto max-h-30">
        {discountRanges.map((range) => (
          <label
            key={range.label}
            className="flex items-center gap-2 mb-1 text-secondary text-sm"
          >
            <input
              type="checkbox"
              checked={filters.discount.includes(range.label)}
              onChange={() => handleCheckbox("discount", range.label)}
            />
            {range.label}
          </label>
        ))}
      </div>

      {/* Ratings */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Ratings</h3>
        {ratingsRanges.map((range) => (
          <label
            key={range.id}
            className="flex gap-2 items-center mb-1 text-secondary text-sm"
          >
            <input
              type="checkbox"
              checked={filters.ratings.includes(range.id)}
              onChange={() => handleCheckbox("ratings", range.id)}
            />
            {range.label}
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Price</h3>
        <div className="flex gap-2 items-center">
          <div>
            <label className="text-sm">Starting Price</label>
            <input
              type="number"
              value={filters.price[0] || 0}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full outline outline-zinc-300 text-secondary text-sm p-1 rounded focus:outline-1 focus:outline-orange-400 mt-2"
            />
          </div>

          <div>
            <label className="text-sm">Ending Price</label>
            <input
              type="number"
              value={filters.price[1] || 10000}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full outline outline-zinc-300 text-secondary text-sm p-1 rounded focus:outline-1 focus:outline-orange-400 mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
