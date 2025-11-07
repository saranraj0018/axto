"use client";
import React, { useState, useEffect } from "react";
import { WishlistIcon, RatingStarIcon } from "../../all_icons"; // update paths as needed

const SearchItems = [
  {
    title: "Backrest Support..",
    itemCode: "OLA000040",
    ratings: 4.5,
    discount: "10%",
    img: "/img/home/P1.png",
    regularPrice: "999",
    sellingPrice: "799",
    url: "#",
  },
  {
    title: "Cushion Backrest Support..",
    itemCode: "OLA000041",
    ratings: 4.5,
    discount: "10%",
    img: "/img/home/P1.png",
    regularPrice: "999",
    sellingPrice: "799",
    url: "#",
  },
  {
    title: "Break Wire",
    itemCode: "OLA000042",
    ratings: 4.5,
    discount: "10%",
    img: "/img/home/P1.png",
    regularPrice: "999",
    sellingPrice: "799",
    url: "#",
  },
  {
    title: "EV Battery",
    itemCode: "OLA000043",
    ratings: 4.5,
    discount: "10%",
    img: "/img/home/P1.png",
    regularPrice: "999",
    sellingPrice: "799",
    url: "#",
  },
];

interface SearchPopupProps {
  onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Slide-in effect on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // wait for slide-out
  };

  const handleClear = () => setQuery("");

  const filteredProducts = SearchItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-[#0a0a0a80] backdrop-blur-[2px] z-50 cursor-pointer transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Modal container */}
      <div
        className={`fixed top-1/2 left-1/2 w-11/12 md:w-5/6 lg:w-3/7 bg-white rounded-3xl shadow-lg z-50 transform transition-all duration-300 ease-out`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translate(-50%, -50%)"
            : "translate(-50%, -60%)",
        }}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={handleClose}
            className="ml-3 text-red-500 hover:text-red-700 font-semibold"
          >
            ✖
          </button>
        </div>

        {/* Search input */}
        <div className="flex justify-between items-center p-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="p-2 w-full rounded-lg outline-1 outline-orange-200 focus:outline-orange-500"
          />
          <button
            onClick={handleClear}
            className="ml-3 text-red-500 hover:text-red-700 font-semibold"
          >
            Clear
          </button>
        </div>

        {/* Search results */}
        <div className="grid grid-cols-12 gap-3 p-4 max-h-[70vh] overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item.itemCode} className="col-span-6 md:col-span-12">
                <div className="shadow-md rounded-2xl overflow-hidden flex flex-col md:flex-row">
                  <div className="space-y-5 bg-[#F4F4F4] p-3 w-full md:w-1/3">
                    <div className="flex justify-between">
                      <p className="text-white bg-primary w-max px-3 py-1 text-[10px] md:text-[11px] rounded-3xl h-max">
                        {item.discount} OFF
                      </p>
                      <div className="p-1 rounded-3xl bg-white hover:bg-[#f3f3f3] hover:scale-125 focus:scale-125 transition cursor-pointer">
                        <WishlistIcon />
                      </div>
                    </div>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="rounded-2xl w-3/4 md:w-3/4 mx-auto"
                    />
                  </div>
                  <div className="bg-[#fffffd] p-2 md:p-3 space-y-1 w-full md:w-2/3 my-auto">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <p className="text-secondary text-[9px] md:text-[12px]">
                          ITEM CODE : {item.itemCode}
                        </p>
                      </div>
                      <div className="flex gap-1 text-[10px] md:text-[13px]">
                        <div className="-mt-0.5 md:mt-0.5 scale-75 md:scale-100">
                          {RatingStarIcon}
                        </div>
                        {item.ratings}
                      </div>
                    </div>
                    <h3 className="text-[11px] md:text-[20px] font-medium">
                      {item.title}
                    </h3>
                    <div className="flex flex-col md:flex-row gap-2 justify-between">
                      <div className="flex gap-1 text-[14px] md:text-md font-medium text-[#332820] my-auto">
                        ₹{item.sellingPrice}{" "}
                        <div className="line-through text-sm my-auto text-secondary font-normal">
                          {item.regularPrice}
                        </div>
                      </div>
                      <button className="bg-primary hover:bg-white text-white hover:text-primary px-4 py-1 cursor-pointer rounded-3xl text-[10px] md:text-[15px] border border-white hover:border-primary transition font-medium">
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-12 text-center text-red-500">
              No products found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPopup;
