"use client";

import { useState, useEffect } from "react";
import Sidebar from "./_partials/Sidebar";
import Topbar from "./_partials/Topbar";
import Content from "./_partials/Content";
import CommonBanners from "@/components/others/CommonBanners";
import {
  RatingStarIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@/components/all_icons";

type ShopProps = {
  initialBrand?: string;
  initialCategory?: string;
};

// --- Dummy Product Data ---
const ShopProductItems = [
  {
    id: 1,
    title: "Ergo Backrest Support",
    itemCode: "BCK1001",
    category: "Backrest",
    brand: "ProSeat",
    ratings: 4.5,
    img: "/img/home/P1.png",
    regularPrice: 1200,
    sellingPrice: 950,
    url: "#",
  },
  {
    id: 2,
    title: "Foam Cushion Backrest",
    itemCode: "BCK1002",
    category: "Backrest",
    brand: "ComfyRide",
    ratings: 4.2,
    img: "/img/home/P1.png",
    regularPrice: 999,
    sellingPrice: 799,
    url: "#",
  },
  {
    id: 3,
    title: "Heavy Duty Break Wire",
    itemCode: "WR1003",
    category: "Wire",
    brand: "WireMax",
    ratings: 4.0,
    img: "/img/home/P1.png",
    regularPrice: 899,
    sellingPrice: 699,
    url: "#",
  },
  {
    id: 4,
    title: "EV Lithium Battery",
    itemCode: "BAT1004",
    category: "Battery",
    brand: "ElectroPower",
    ratings: 4.8,
    img: "/img/home/P1.png",
    regularPrice: 4999,
    sellingPrice: 4499,
    url: "#",
  },
  {
    id: 5,
    title: "Car Battery Ultra",
    itemCode: "BAT1005",
    category: "Battery",
    brand: "PowerDrive",
    ratings: 4.3,
    img: "/img/home/P1.png",
    regularPrice: 3500,
    sellingPrice: 3200,
    url: "#",
  },
  {
    id: 6,
    title: "Wire Cutter Pro",
    itemCode: "WR1006",
    category: "Wire",
    brand: "WireMax",
    ratings: 4.1,
    img: "/img/home/P1.png",
    regularPrice: 750,
    sellingPrice: 650,
    url: "#",
  },
  {
    id: 7,
    title: "Smart Battery Charger",
    itemCode: "BAT1007",
    category: "Battery",
    brand: "ElectroPower",
    ratings: 1,
    img: "/img/home/P1.png",
    regularPrice: 3000,
    sellingPrice: 1599,
    url: "#",
  },
  {
    id: 8,
    title: "Premium Seat Cushion",
    itemCode: "BCK1008",
    category: "Backrest",
    brand: "ProSeat",
    ratings: 4.7,
    img: "/img/home/P1.png",
    regularPrice: 699,
    sellingPrice: 549,
    url: "#",
  },
  {
    id: 9,
    title: "Insulated Car Wire",
    itemCode: "WR1009",
    category: "Wire",
    brand: "WireSafe",
    ratings: 4.0,
    img: "/img/home/P1.png",
    regularPrice: 499,
    sellingPrice: 399,
    url: "#",
  },
  {
    id: 10,
    title: "Laptop Power Battery",
    itemCode: "BAT1010",
    category: "Battery",
    brand: "TechVolt",
    ratings: 5.0,
    img: "/img/home/P1.png",
    regularPrice: 2999,
    sellingPrice: 2499,
    url: "#",
  },
  {
    id: 11,
    title: "Office Ergonomic Cushion",
    itemCode: "BCK1011",
    category: "Backrest",
    brand: "ComfyRide",
    ratings: 4.3,
    img: "/img/home/P1.png",
    regularPrice: 899,
    sellingPrice: 749,
    url: "#",
  },
  {
    id: 12,
    title: "Copper Wire 10m",
    itemCode: "WR1012",
    category: "Wire",
    brand: "WireSafe",
    ratings: 4.2,
    img: "/img/home/P1.png",
    regularPrice: 599,
    sellingPrice: 599,
    url: "#",
  },
];

// Discount Ranges
const discountRanges = [
  { label: "0 - 20%", min: 0, max: 21 },
  { label: "20 - 40%", min: 20, max: 41 },
  { label: "40 - 60%", min: 40, max: 61 },
  { label: "60 - 80%", min: 60, max: 81 },
];

// Ratings Ranges
const ratingsRanges = [
  {
    id: "5",
    label: (
      <>
        <RatingStarIcon />
        <RatingStarIcon />
        <RatingStarIcon />
        <RatingStarIcon />
        <RatingStarIcon /> 5 star
      </>
    ),
    min: 5,
    max: 6,
  },
  {
    id: "4",
    label: (
      <>
        <RatingStarIcon />
        <RatingStarIcon />
        <RatingStarIcon />
        <RatingStarIcon /> 4 star
      </>
    ),
    min: 4,
    max: 5,
  },
  {
    id: "3",
    label: (
      <>
        <RatingStarIcon />
        <RatingStarIcon />
        <RatingStarIcon /> 3 star
      </>
    ),
    min: 3,
    max: 4,
  },
  {
    id: "2",
    label: (
      <>
        <RatingStarIcon />
        <RatingStarIcon /> 2 star
      </>
    ),
    min: 2,
    max: 3,
  },
  {
    id: "1",
    label: (
      <>
        <RatingStarIcon /> 1 star
      </>
    ),
    min: 1,
    max: 2,
  },
];

const ShopPage = ({ initialBrand, initialCategory }: ShopProps) => {
  const [products] = useState(ShopProductItems);
  const [filteredProducts, setFilteredProducts] = useState(ShopProductItems);
  const [filters, setFilters] = useState({
    category: initialCategory ? [initialCategory.toLowerCase()] : [],
    brand: initialBrand ? [initialBrand.toLowerCase()] : [],
    discount: [] as string[],
    ratings: [] as string[],
    price: [0, 0] as number[],
    search: "",
    sort: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);

  // Discount calculation
  const calculateDiscount = (regularPrice: number, sellingPrice: number) => {
    if (regularPrice <= sellingPrice) return 0;
    return Math.round(((regularPrice - sellingPrice) / regularPrice) * 100);
  };

  // Responsive productsPerPage
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setProductsPerPage(6);
      else if (width >= 768) setProductsPerPage(6);
      else setProductsPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Filtering ---
  useEffect(() => {
    let tempProducts = [...products];

    if (filters.category.length > 0) {
      tempProducts = tempProducts.filter((p) =>
        filters.category.includes(p.category.toLowerCase())
      );
    }
    if (filters.brand.length > 0) {
      tempProducts = tempProducts.filter((p) =>
          filters.brand.includes(p.brand.toLowerCase())
      );
    }
    if (filters.discount.length > 0) {
      tempProducts = tempProducts.filter((p) => {
        const disc = calculateDiscount(p.regularPrice, p.sellingPrice);
        return filters.discount.some((label) => {
          const range = discountRanges.find((r) => r.label === label);
          return range && disc >= range.min && disc < range.max;
        });
      });
    }
    if (filters.ratings.length > 0) {
      tempProducts = tempProducts.filter((p) =>
        filters.ratings.some((id) => {
          const range = ratingsRanges.find((r) => r.id === id);
          return range && p.ratings >= range.min && p.ratings < range.max;
        })
      );
    }
    if (filters.price[0] > 0)
      tempProducts = tempProducts.filter(
        (p) => p.sellingPrice >= filters.price[0]
      );
    if (filters.price[1] > 0)
      tempProducts = tempProducts.filter(
        (p) => p.sellingPrice <= filters.price[1]
      );
    if (filters.search) {
      const q = filters.search.toLowerCase();
      tempProducts = tempProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.itemCode.toLowerCase().includes(q)
      );
    }
    if (filters.sort === "price-asc")
      tempProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
    if (filters.sort === "price-desc")
      tempProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);

    setFilteredProducts(tempProducts);
    setCurrentPage(1);
  }, [filters, products]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  // Sliding 3-number pagination
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 2);
    if (end - start < 2) start = Math.max(1, end - 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      <CommonBanners />
      <div className="axto-container flex flex-col md:flex-row gap-6 my-10">
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          products={products}
          calculateDiscount={calculateDiscount}
          discountRanges={discountRanges}
          ratingsRanges={ratingsRanges}
        />
        <div className="flex-1 space-y-4">
          <Topbar
            filters={filters}
            setFilters={setFilters}
            totalProducts={filteredProducts.length}
          />
          <Content
            products={currentProducts}
            calculateDiscount={(r, s) => `${calculateDiscount(r, s)}%`}
          />

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-primary rounded-3xl text-primary hover:bg-orange-200 disabled:opacity-50"
            >
              {LeftArrowIcon}
            </button>

            {getPageNumbers().map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 border border-zinc-300 rounded-3xl ${
                  currentPage === num
                    ? "bg-primary text-white border border-orange-300"
                    : "text-primary"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-primary rounded-3xl text-primary hover:bg-orange-200 disabled:opacity-50"
            >
              {RightArrowIcon}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;