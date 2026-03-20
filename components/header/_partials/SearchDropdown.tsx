"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RatingStarIcon } from "../../all_icons";
import { useAddToCart } from "@/lib/useAddToCart";
import { WishlistIcon } from "@/components/WishlistIcon";
import { useAuthModal } from "@/context/AuthModalContext";

interface Product {
  id: number;
  title: string;
  item_code: string;
  ratings: number;
  discount: string;
  img: string;
  regularPrice: string;
  sellingPrice: string;
  type: string;
  is_wishlisted: boolean;
}

interface SearchDropdownProps {
  query: string;
  onClose: () => void;
}

const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

const SearchDropdown: React.FC<SearchDropdownProps> = ({
                                                         query,
                                                         onClose,
                                                       }) => {
  const { addToCart } = useAddToCart();
  const { openAuthModal } = useAuthModal();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("auth_token");

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/search-products?query=${query}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
        );

        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  if (!query) return null;

  return (
      <div className="absolute md:right-0 top-8 md:top-12 w-80 md:w-82 bg-white shadow-2xl rounded-xl max-h-96 overflow-y-auto z-50">

        {loading && (
            <p className="p-4 text-center">Searching...</p>
        )}

        {!loading && products.length === 0 && (
            <p className="p-4 text-center text-red-500">
              No products found
            </p>
        )}

        {!loading &&
            products.map((item) => (
                <div
                    key={item.id}
                    className="flex gap-3 p-3 border-b hover:bg-gray-50 transition"
                >
                  <Link
                      href={`/shop/product/${slugify(item.title)}-${item.id}`}
                      onClick={onClose}
                  >
                  <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded-lg bg-gray-100"
                  />
                  </Link>

                  <div className="flex-1">
                    <Link
                        href={`/shop/product/${slugify(item.title)}-${item.id}`}
                        onClick={onClose}
                    >
                      <h3 className="text-sm font-medium line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>

                    <div className="flex justify-between items-center mt-1">
                      <div className="text-sm font-semibold text-primary">
                        ₹{item.sellingPrice}
                        <span className="line-through text-xs text-gray-400 ml-2">
                    {item.regularPrice}
                  </span>
                      </div>

                      {/*{item.type === "single" && (*/}
                      {/*    <button*/}
                      {/*        onClick={(e) => {*/}
                      {/*          e.preventDefault();*/}
                      {/*          addToCart(*/}
                      {/*              {*/}
                      {/*                id: item.id,*/}
                      {/*                variant_id: 0,*/}
                      {/*                quantity: 1,*/}
                      {/*              },*/}
                      {/*              {*/}
                      {/*                onAuthRequired: openAuthModal,*/}
                      {/*                buyNow: false,*/}
                      {/*              }*/}
                      {/*          );*/}
                      {/*        }}*/}
                      {/*        className="text-xs bg-primary text-white px-3 py-1 rounded-full"*/}
                      {/*    >*/}
                      {/*      + Add*/}
                      {/*    </button>*/}
                      {/*)}*/}
                    </div>
                  </div>
                </div>
            ))}
      </div>
  );
};

export default SearchDropdown;