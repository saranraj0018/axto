"use client";
import { useState } from "react";

const CategoryItems = [
  { id: 1, img: "/img/home/C1.png", url: "#" },
  { id: 2, img: "/img/home/C2.png", url: "#" },
  { id: 3, img: "/img/home/C3.png", url: "#" },
  { id: 4, img: "/img/home/C4.png", url: "#" },
  { id: 5, img: "/img/home/C1.png", url: "#" },
  { id: 6, img: "/img/home/C1.png", url: "#" },
  { id: 7, img: "/img/home/C1.png", url: "#" },
  { id: 8, img: "/img/home/C2.png", url: "#" },
  { id: 9, img: "/img/home/C3.png", url: "#" },
  { id: 10, img: "/img/home/C4.png", url: "#" },
  { id: 11, img: "/img/home/C1.png", url: "#" },
  { id: 12, img: "/img/home/C1.png", url: "#" },
];

const Section3 = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  // +6 each time
  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, CategoryItems.length));
  };

  // -6 each time
  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(prev - 6, 6));
  };

  // items to display
  const visibleItems = CategoryItems.slice(0, visibleCount);

  return (
    <>
      <div className="my-10 space-y-2 md:space-y-1">
        <h2 className="text-center text-md md:text-2xl font-medium">
          Shop by <span className="text-primary">Category</span>
        </h2>

        <p className="text-center text-secondary font-medium text-[10px] md:text-lg">
          Find perfect scooter accessories in our categories.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-12 gap-3 mt-8">
          {visibleItems.map((item) => (
            <div key={item.id} className="col-span-6 md:col-span-4">
              <img src={item.img} alt="" />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-4">
          {visibleCount < CategoryItems.length && (
            <button onClick={handleShowMore} className="axto-orange-btn">
              Show More
            </button>
          )}

          {visibleCount > 6 && (
            <button onClick={handleShowLess} className="axto-orange-btn">
              Show Less
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Section3;
