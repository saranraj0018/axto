"use client";

import React, { useState, useEffect } from "react";
import {
  RatingStarIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@/components/all_icons";
import { useAddToCart } from "@/lib/useAddToCart";
import { WishlistIcon } from "@/components/WishlistIcon";
import { useAuthModal } from "@/context/AuthModalContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BestSellerProduct {
  id: number;
  title: string;
  img: string;
  item_code: string;
  ratings: number;
  regularPrice: number;
  sellingPrice: number;
  discount: number | string;
  type: string;
  is_wishlisted: boolean;
  is_out_of_stock: boolean;
}

const Section4 = () => {
  const { addToCart, loadingId } = useAddToCart();
  const { openAuthModal } = useAuthModal();
  const router = useRouter();

  const [BSProductItems, setBSProductItems] = useState<BestSellerProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/best-seller/list`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        : {
            Accept: "application/json",
          },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.data) {
          setBSProductItems(res.data);
        }
      })
      .catch((err) => console.error("Best seller fetch error:", err));
  }, []);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };

    updateItems();
    window.addEventListener("resize", updateItems);

    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const next = () => {
    if (!BSProductItems.length) return;
    setCurrentIndex((prev) => (prev + 1) % BSProductItems.length);
  };

  const prev = () => {
    if (!BSProductItems.length) return;
    setCurrentIndex((prev) =>
      prev === 0 ? BSProductItems.length - 1 : prev - 1,
    );
  };

  if (!BSProductItems.length) return null;

  return (
    <div className="my-3 md:my-10 space-y-2 relative">
      <h2 className="text-center text-md md:text-2xl font-medium">
        Best <span className="text-primary">Sellers</span>
      </h2>

      <p className="text-center font-medium text-secondary text-[10px] md:text-lg">
        Explore our top scooter accessories, selected for you!
      </p>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
          }}
        >
          {BSProductItems.map((item) => (
            <div
              key={item.id}
              className="p-2 flex shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="shadow-md rounded-2xl overflow-hidden flex flex-col w-full h-full bg-white">
                {/* IMAGE SECTION */}
                <div className="space-y-5 bg-[#F4F4F4] p-2 relative">
                  <div className="flex justify-between w-full px-2 absolute top-2 left-0 right-0 z-10">
                    {item.is_out_of_stock ? (
                      <p className="text-white bg-red-500 w-max px-3 py-1 text-[10px] md:text-sm rounded-3xl h-max">
                        Out of Stock
                      </p>
                    ) : (
                      <p className="text-white bg-primary w-max px-3 py-1 text-[10px] md:text-sm rounded-3xl h-max">
                        {item.discount}% OFF
                      </p>
                    )}

                    <div className="p-1 rounded-3xl bg-white hover:bg-[#f3f3f3] hover:scale-125 transition cursor-pointer">
                      <WishlistIcon
                        productId={item.id}
                        initialLiked={item.is_wishlisted}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/shop/product/${slugify(item.title)}-${item.id}`}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className={`rounded-2xl w-full h-32 md:h-60 mx-auto object-cover ${
                        item.is_out_of_stock ? "opacity-60 grayscale" : ""
                      }`}
                    />
                  </Link>
                </div>

                {/* CONTENT SECTION */}
                <div className="bg-[#fffffd] p-2 md:p-3 space-y-1 mt-auto flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-secondary text-[9px] md:text-[12px]">
                      ITEM CODE : {item.item_code}
                    </p>

                    <div className="flex gap-1 text-[10px] md:text-[13px] items-center">
                      <span className="scale-75 md:scale-100">
                        <RatingStarIcon />
                      </span>
                      {item.ratings}
                    </div>
                  </div>

                  <Link
                    href={`/shop/product/${slugify(item.title)}-${item.id}`}
                  >
                    <h3 className="text-[11px] md:text-[16px] font-medium leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex flex-col gap-2 mt-auto">
                    {/* Price */}
                    <div className="flex gap-2 items-center text-[13px] md:text-md font-medium text-[#332820]">
                      <span>₹{item.sellingPrice}</span>
                      <span className="line-through text-[11px] md:text-sm text-secondary font-normal">
                        ₹{item.regularPrice}
                      </span>
                    </div>

                    {/* Buttons */}
                    {/* Buttons */}
                    {item.type === "single" ? (
                      item.is_out_of_stock ? (
                        <button
                          type="button"
                          disabled
                          className="w-full px-3 py-2 rounded-full text-[10px] md:text-[12px] lg:text-[14px] border font-medium text-center bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      ) : (
                        <div className="grid grid-cols-2 gap-1 md:gap-2 w-full">
                          {/* Add to Cart */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();

                              addToCart(
                                {
                                  id: item.id,
                                  variant_id: 0,
                                  quantity: 1,
                                },
                                {
                                  onAuthRequired: openAuthModal,
                                  buyNow: false,
                                },
                              );
                            }}
                            className="w-full px-1 md:px-3 py-1 md:py-2 rounded-full text-[8px] md:text-[12px] lg:text-[14px] border transition font-medium text-center bg-white text-primary border-primary hover:bg-primary hover:text-white"
                            disabled={loadingId === item.id}
                          >
                            {loadingId === item.id ? "Adding..." : "+ Add"}
                          </button>

                          {/* Buy Now */}
                          <button
                            type="button"
                            onClick={async (e) => {
                              e.preventDefault();

                              try {
                                await addToCart(
                                  {
                                    id: item.id,
                                    variant_id: 0,
                                    quantity: 1,
                                  },
                                  {
                                    onAuthRequired: openAuthModal,
                                    buyNow: false,
                                  },
                                );

                                router.push("/cart");
                              } catch (error) {
                                console.error("Buy now error:", error);
                              }
                            }}
                            className="w-full px-1 md:px-3 py-1 md:py-2 rounded-full text-[8px] md:text-[12px] lg:text-[14px] border transition font-medium text-center bg-primary text-white border-primary hover:bg-white hover:text-primary"
                            disabled={loadingId === item.id}
                          >
                            {loadingId === item.id
                              ? "Processing..."
                              : "Buy Now"}
                          </button>
                        </div>
                      )
                    ) : (
                      <Link
                        href={
                          item.is_out_of_stock
                            ? "#"
                            : `/shop/product/${slugify(item.title)}-${item.id}`
                        }
                        onClick={(e) => {
                          if (item.is_out_of_stock) e.preventDefault();
                        }}
                        className={`w-full px-1 md:px-3 py-1 md:py-2 rounded-full text-[8px] md:text-[12px] lg:text-[14px] border transition font-medium inline-block text-center ${
                          item.is_out_of_stock
                            ? "bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed pointer-events-none"
                            : "bg-primary hover:bg-white text-white hover:text-primary border-primary hover:border-primary"
                        }`}
                      >
                        {item.is_out_of_stock
                          ? "Out of Stock"
                          : "Select Options"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white shadow px-4 py-3 rounded-full z-10"
        >
          {LeftArrowIcon}
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={next}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow px-4 py-3 rounded-full z-10"
        >
          {RightArrowIcon}
        </button>
      </div>
    </div>
  );
};

export default Section4;
