"use client";

import { RatingStarIcon, WishlistIcon } from "@/components/all_icons";

interface ContentProps {
  products: any[];
  calculateDiscount: (regularPrice: number, sellingPrice: number) => string;
}

const Content: React.FC<ContentProps> = ({ products, calculateDiscount }) => {
  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {products.map((item) => (
            <div key={item.id} className="w-full">
              <div className="shadow-md rounded-2xl overflow-hidden">
                {/* Top Section */}
                <div className="space-y-5 bg-[#F4F4F4] p-3">
                  <div className="flex justify-between">
                    <p className="text-white bg-primary w-max px-3 py-1 text-[10px] lg:text-sm rounded-3xl h-max">
                      {calculateDiscount(item.regularPrice, item.sellingPrice)}{" "}
                      OFF
                    </p>

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
                <div className="bg-[#fffffd] p-2 md:p-3 space-y-1">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <p className="text-secondary text-[9px] lg:text-[12px]">
                        ITEM CODE : {item.itemCode}
                      </p>
                    </div>
                    <div className="flex gap-1 text-[10px] lg:text-[13px] ">
                      <div className="-mt-0.5 md:mt-0.5 scale-75 md:scale-100">
                        <RatingStarIcon />
                      </div>
                      {item.ratings}
                    </div>
                  </div>

                  <h3 className="text-[11px] lg:text-[16px] font-medium">
                    {item.title}
                  </h3>

                  <div className="flex flex-col lg:flex-row gap-2 justify-between">
                    <div className="flex gap-1 text-[13px] lg:text-md font-medium text-[#332820] my-auto">
                      ₹{item.sellingPrice}
                      <div className="line-through text-sm my-auto text-secondary font-normal">
                        {item.regularPrice}
                      </div>
                    </div>

                    <button className="bg-primary hover:bg-white text-white hover:text-primary px-4 py-1 cursor-pointer rounded-3xl text-[10px] md:text-[12px] lg:text-[15px] border border-white hover:border-primary transition font-medium">
                      + Add
                    </button>
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
