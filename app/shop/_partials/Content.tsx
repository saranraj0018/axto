"use client";

import { RatingStarIcon } from "@/components/all_icons";
import {WishlistIcon} from "@/components/WishlistIcon";
import Link from "next/link";
import { useAddToCart } from "@/lib/useAddToCart";
import { useAuthModal } from "@/context/AuthModalContext";
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
    const { addToCart } = useAddToCart();
    const { openAuthModal } = useAuthModal();
  return (
      <>
        {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {products.map((item) => (
                  <div key={item.id} className="w-full flex">
                    <div className="shadow-md rounded-2xl overflow-hidden flex flex-col w-full">

                      {/* Top Section */}
                      <div className="space-y-5 bg-[#F4F4F4] p-2 relative">
                        <div className="flex justify-between w-8/9 absolute t-1">
                          {item.discount > 0 && (
                              <p className="text-white bg-primary w-max px-3 py-1 text-[10px] lg:text-sm rounded-3xl">
                                {item.discount}% OFF
                              </p>
                          )}

                          <div className="p-1 rounded-3xl bg-white hover:bg-[#f3f3f3] hover:scale-125 transition cursor-pointer">
                              <WishlistIcon productId={item.id}
                                            initialLiked={item.is_wishlisted} />
                          </div>
                        </div>

                        <img
                            src={item.img}
                            alt={item.title}
                            className="rounded-2xl w-full h-60 mx-auto"
                        />
                      </div>

                      {/* Bottom Section */}

                        <div className="bg-[#fffffd] p-2 md:p-3 space-y-1 mt-auto flex flex-col flex-1">

                          <div className="flex justify-between">
                            <p className="text-secondary text-[9px] lg:text-[12px]">
                              ITEM CODE : {item.item_code}
                            </p>

                            <div className="flex gap-1 text-[10px] lg:text-[13px]">
                              <RatingStarIcon />
                              {item.ratings}
                            </div>
                          </div>
                            <Link href={`/shop/product/${slugify(item.title)}-${item.id}`}>
                          <h3 className="text-[11px] lg:text-[16px] font-medium">
                            {item.title}
                          </h3>
                            </Link>

                          <div className="flex flex-col lg:flex-row gap-2 justify-between mt-auto">
                            <div className="flex gap-2 text-[13px] lg:text-md font-medium text-[#332820]">
                              ₹{item.sellingPrice}
                              {item.regularPrice > item.sellingPrice && (
                                  <span className="line-through text-sm text-secondary font-normal">
                            ₹{item.regularPrice}
                          </span>
                              )}
                            </div>
                              {item.type === "single" ? (
                                  <button
                                      onClick={(e) => {
                                          e.preventDefault();
                                          addToCart({
                                              id: item.id,
                                              variant_id: 0,
                                              quantity: 1,
                                          },{
                                              onAuthRequired: openAuthModal,
                                              buyNow: true,
                                          });
                                      }}
                                      className="bg-primary hover:bg-white text-white hover:text-primary px-4 py-1 rounded-3xl text-[10px] md:text-[12px] lg:text-[15px] border border-white hover:border-primary transition font-medium"
                                  >
                                      + Add
                                  </button>
                              ) : (
                                  <Link
                                      href={`/shop/product/${slugify(item.title)}-${item.id}`}
                                      className="bg-primary hover:bg-white text-white hover:text-primary px-4 py-1 rounded-3xl text-[10px] md:text-[12px] lg:text-[15px] border border-white hover:border-primary transition font-medium inline-block"
                                  >
                                      Select
                                  </Link>
                              )}
                          </div>
                        </div>
                    </div>
                  </div>
              ))}
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
