"use client";

import { RatingStarIcon, WishlistIcon } from "@/components/all_icons";
import Link from "next/link";
import { useAddToCart } from "@/lib/useAddToCart";


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
  return (
      <>
        {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {products.map((item) => (
                  <div key={item.id} className="w-full flex">
                    <div className="shadow-md rounded-2xl overflow-hidden flex flex-col w-full">

                      {/* Top Section */}
                      <div className="space-y-5 bg-[#F4F4F4] p-3">
                        <div className="flex justify-between">
                          {item.discount > 0 && (
                              <p className="text-white bg-primary w-max px-3 py-1 text-[10px] lg:text-sm rounded-3xl">
                                {item.discount}% OFF
                              </p>
                          )}

                          <div className="p-1 rounded-3xl bg-white hover:bg-[#f3f3f3] hover:scale-125 transition cursor-pointer">
                            <WishlistIcon />
                          </div>
                        </div>

                        <img
                            src={item.img}
                            alt={item.title}
                            className="rounded-2xl w-full md:w-3/4 mx-auto"
                        />
                      </div>

                      {/* Bottom Section */}
                        <Link href={`/shop/product/${slugify(item.title)}-${item.id}`}>
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

                          <h3 className="text-[11px] lg:text-[16px] font-medium">
                            {item.title}
                          </h3>

                          <div className="flex flex-col lg:flex-row gap-2 justify-between mt-auto">
                            <div className="flex gap-2 text-[13px] lg:text-md font-medium text-[#332820]">
                              ₹{item.sellingPrice}
                              {item.regularPrice > item.sellingPrice && (
                                  <span className="line-through text-sm text-secondary font-normal">
                            ₹{item.regularPrice}
                          </span>
                              )}
                            </div>

                            <button  onClick={(e) => {
                                e.preventDefault();
                                addToCart({
                                    id: item.id,
                                    variant_id: 0,
                                    quantity: 1,
                                });
                            }} className="bg-primary hover:bg-white text-white hover:text-primary px-4 py-1 rounded-3xl text-[10px] md:text-[12px] lg:text-[15px] border border-white hover:border-primary transition font-medium">
                              + Add
                            </button>
                          </div>

                        </div>
                      </Link>
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
