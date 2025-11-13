"use client";

import React from "react";

interface TopbarProps {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  totalProducts: number;
}

const Topbar: React.FC<TopbarProps> = ({
  filters,
  setFilters,
  totalProducts,
}) => {
  // handle filter removal
  const removeFilter = (type: string, value: string | number) => {
    if (
      type === "category" ||
      type === "brand" ||
      type === "discount" ||
      type === "ratings"
    ) {
      setFilters({
        ...filters,
        [type]: filters[type].filter((v: string) => v !== value),
      });
    }

    if (type === "price") {
      setFilters({
        ...filters,
        price: [0, 0],
      });
    }

    if (type === "search") {
      setFilters({
        ...filters,
        search: "",
      });
    }
  };

  // active filters list for display
  const activeFilters: {
    type: string;
    label: string;
    value: string | number;
  }[] = [];

  if (filters.category.length > 0)
    filters.category.forEach((c: string) =>
      activeFilters.push({ type: "category", label: c, value: c })
    );

  if (filters.brand.length > 0)
    filters.brand.forEach((b: string) =>
      activeFilters.push({ type: "brand", label: b, value: b })
    );

  if (filters.discount.length > 0)
    filters.discount.forEach((d: string) =>
      activeFilters.push({ type: "discount", label: d, value: d })
    );

  if (filters.ratings.length > 0)
    filters.ratings.forEach((r: string) =>
      activeFilters.push({ type: "ratings", label: `${r} star`, value: r })
    );

  if (filters.price[0] > 0 || filters.price[1] > 0)
    activeFilters.push({
      type: "price",
      label: `₹${filters.price[0]} - ₹${filters.price[1]}`,
      value: `${filters.price[0]}-${filters.price[1]}`,
    });

  if (filters.search)
    activeFilters.push({
      type: "search",
      label: `Search: ${filters.search}`,
      value: filters.search,
    });

  return (
    <div className="grid grid-cols-12 gap-3">
      {/* Search Input */}
      <div className="col-span-12 gap-2 w-full">
        <input
          type="text"
          placeholder="Search Products (Title, Category, Brand, Code)"
          value={filters.search || ""}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border border-zinc-300 rounded-md px-3 py-2 w-full text-sm outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="col-span-12">
        <div className="flex justify-between w-full gap-2">
          <div className="text-sm text-secondary my-auto">
            Showing {totalProducts} Results
          </div>
          <select
            value={filters.sort || ""}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="text-secondary border border-zinc-50 rounded-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="col-span-12 flex flex-wrap items-center gap-2 mt-2 md:mt-0">
          {activeFilters.map((filter, index) => (
            <span
              key={`${filter.type}-${filter.value}-${index}`}
              className="flex items-center gap-2 bg-primary text-white text-xs md:text-sm px-3 py-1 rounded-full"
            >
              {filter.label}
              <button
                onClick={() => removeFilter(filter.type, filter.value)}
                className="text-white hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </span>
          ))}
          <button
            onClick={() =>
              setFilters({
                category: [],
                brand: [],
                discount: [],
                ratings: [],
                price: [0, 0],
                search: "",
                sort: "",
              })
            }
            className="text-[12px] text-primary underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default Topbar;
