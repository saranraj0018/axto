"use client";
import { useState } from "react";

const BrandItems = [
  { id: 1, img: "/img/home/Brand1.png", url: "#" },
  { id: 2, img: "/img/home/Brand2.png", url: "#" },
  { id: 3, img: "/img/home/Brand3.png", url: "#" },
  { id: 4, img: "/img/home/Brand4.png", url: "#" },
  { id: 5, img: "/img/home/Brand3.png", url: "#" },
  { id: 6, img: "/img/home/Brand4.png", url: "#" },
  { id: 7, img: "/img/home/Brand3.png", url: "#" },
  { id: 8, img: "/img/home/Brand4.png", url: "#" },
];

const Section2 = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  // Show More → +4  
  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, BrandItems.length));
  };

  // Show Less → -4  
  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(prev - 4, 4));
  };

  return (
    <>
      <div className="my-10 space-y-2 md:space-y-1">
        <h2 className="text-center text-md md:text-2xl font-medium">
          Shop by <span className="text-primary">Brand</span>
        </h2>

        <p className="text-center text-secondary font-medium text-[10px] md:text-lg">
          Find perfect scooter accessories in our categories.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-12 gap-3 mt-8">
          {BrandItems.slice(0, visibleCount).map((item) => (
            <div key={item.id} className="col-span-6">
              <img src={item.img} alt="" />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-4">

          {visibleCount < BrandItems.length && (
            <button
              onClick={handleShowMore}
              className="axto-orange-btn"
            >
              Show More
            </button>
          )}

          {visibleCount > 4 && (
            <button
              onClick={handleShowLess}
              className="axto-orange-btn bg-gray-300"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Section2;
