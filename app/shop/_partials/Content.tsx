"use client";

import { RatingStarIcon } from "@/components/all_icons";
import { WishlistIcon } from "@/components/WishlistIcon";
import Link from "next/link";
import { useAddToCart } from "@/lib/useAddToCart";
import { useAuthModal } from "@/context/AuthModalContext";
import { useRouter } from "next/navigation";
import React from "react";

interface ContentProps {
  products: any[];
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const Content: React.FC<ContentProps> = ({ products }) => {
  const { addToCart, loadingId } = useAddToCart();
  const { openAuthModal } = useAuthModal();
  const router = useRouter();

  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {products.map((item) => {
            const isOutOfStock =
              item.is_out_of_stock || (item.remaining_stock ?? 0) <= 0;

            return (
              <div key={item.id} className="w-full flex">
                <div className="shadow-md rounded-2xl overflow-hidden flex flex-col w-full h-full bg-white">
                  {/* IMAGE SECTION */}
                  <div className="space-y-5 bg-[#F4F4F4] p-2 relative">
                    <div className="flex justify-between w-full px-2 absolute top-2 left-0 right-0 z-10">
                      {isOutOfStock ? (
                        <p className="text-white bg-red-500 w-max px-3 py-1 text-[10px] md:text-sm rounded-3xl h-max">
                          Out of Stock
                        </p>
                      ) : (
                        item.discount > 0 && (
                          <p className="text-white bg-primary w-max px-3 py-1 text-[10px] md:text-sm rounded-3xl h-max">
                            {item.discount}% OFF
                          </p>
                        )
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
                        className={`rounded-2xl w-full h-32 lg:h-60 mx-auto object-cover ${
                          isOutOfStock ? "opacity-60 grayscale" : ""
                        }`}
                      />
                    </Link>
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="bg-[#fffffd] p-2 md:p-3 space-y-1 mt-auto flex flex-col flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-secondary text-[9px] lg:text-[12px]">
                        ITEM CODE : {item.item_code}
                      </p>

                      <div className="flex gap-1 text-[10px] lg:text-[13px] items-center">
                        <span className="scale-75 md:scale-100">
                          <RatingStarIcon />
                        </span>
                        {item.ratings}
                      </div>
                    </div>

                    <Link
                      href={`/shop/product/${slugify(item.title)}-${item.id}`}
                    >
                      <h3 className="text-[11px] lg:text-[16px] font-medium leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>

                    <div className="flex flex-col gap-2 mt-1">
                      {/* Price */}
                      <div className="flex gap-1 text-[13px] lg:text-md font-medium text-[#332820] items-center">
                        <span>₹{item.sellingPrice}</span>
                        {item.regularPrice > item.sellingPrice && (
                          <span className="line-through text-sm text-secondary font-normal">
                            ₹{item.regularPrice}
                          </span>
                        )}
                      </div>

                      {/* Buttons */}
                      {item.type === "single" ? (
                        isOutOfStock ? (
                          <button
                            type="button"
                            disabled
                            className="w-full px-3 py-2 rounded-full text-[10px] md:text-[12px] lg:text-[14px] border font-medium text-center bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed"
                          >
                            Out of Stock
                          </button>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 w-full">
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
                              className="w-full px-3 py-2 rounded-full text-[10px] md:text-[12px] lg:text-[14px] border transition font-medium text-center bg-white text-primary border-primary hover:bg-primary hover:text-white"
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
                              className="w-full px-3 py-2 rounded-full text-[10px] md:text-[12px] lg:text-[14px] border transition font-medium text-center bg-primary text-white border-primary hover:bg-white hover:text-primary"
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
                            isOutOfStock
                              ? "#"
                              : `/shop/product/${slugify(item.title)}-${item.id}`
                          }
                          onClick={(e) => {
                            if (isOutOfStock) e.preventDefault();
                          }}
                          className={`w-full px-4 py-2 rounded-full text-[10px] md:text-[12px] lg:text-[14px] border transition font-medium inline-block text-center ${
                            isOutOfStock
                              ? "bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed pointer-events-none"
                              : "bg-primary hover:bg-white text-white hover:text-primary border-primary hover:border-primary"
                          }`}
                        >
                          {isOutOfStock ? "Out of Stock" : "Select Options"}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 text-secondary text-sm md:text-base">
          No products found matching your filters.
        </div>
      )}
    </>
  );
};

export default Content;
