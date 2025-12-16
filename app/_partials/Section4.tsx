"use client";

import { useState, useEffect, useRef  } from "react";
import {
  RatingStarIcon,
  WishlistIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "../../components/all_icons";

const Section4 = () => {
  const BSProductItems = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
      title: "EV Battery",
      itemCode: "OLA000043",
      ratings: 4.5,
      discount: "10%",
      img: "/img/home/P1.png",
      regularPrice: "999",
      sellingPrice: "799",
      url: "#",
    },
    {
      id: 5,
      title: "Car Battery",
      itemCode: "OLA000044",
      ratings: 4.5,
      discount: "10%",
      img: "/img/home/P1.png",
      regularPrice: "999",
      sellingPrice: "8000",
      url: "#",
    },
  ];

  // Slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };

    updateItems();
    window.addEventListener("resize", updateItems);

    return () => {
      window.removeEventListener("resize", updateItems);
    };
  }, []);

  // Infinite Loop Functions
  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % BSProductItems.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? BSProductItems.length - 1 : prev - 1
    );
  };
  return (
    <div className="my-14 space-y-2 relative">
      <h2 className="text-center text-md md:text-2xl font-medium">
        Best <span className="text-primary">Sellers</span>
      </h2>
      <p className="text-center font-medium text-secondary text-[10px] md:text-lg">
        Explore our top scooter accessories, selected for you!
      </p>

      {/* Slider Wrapper */}
      <div className="relative overflow-hidden">
        {/* Cards Track */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
          }}
        >
          {BSProductItems.map((item) => (
            <div
              key={item.id}
              className="min-w-[50%] sm:min-w-[33.33%] lg:min-w-[25%] p-2 flex"
            >
              {/* YOUR EXACT UI */}
              <div className="shadow-md rounded-2xl overflow-hidden flex flex-col w-full">
                <div className="space-y-5 bg-[#F4F4F4] p-3">
                  <div className="flex justify-between">
                    <p className="text-white bg-primary w-max px-3 py-1 text-[10px] md:text-sm rounded-3xl h-max">
                      {item.discount} OFF
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

                <div className="bg-[#fffffd] p-2 md:p-3 space-y-1 mt-auto flex flex-col justify-between flex-1">
                  <div className="flex justify-between">
                    <p className="text-secondary text-[9px] md:text-[12px]">
                      ITEM CODE : {item.itemCode}
                    </p>

                    <div className="flex gap-1 text-[10px] md:text-[13px]">
                      <span className="-mt-0.5 md:mt-0.5 scale-75 md:scale-100">
                        <RatingStarIcon />
                      </span>
                      {item.ratings}
                    </div>
                  </div>

                  <h3 className="text-[11px] md:text-[16px] font-medium">
                    {item.title}
                  </h3>

                  <div className="flex flex-col md:flex-row gap-2 justify-between mt-auto">
                    <div className="flex gap-1 text-[13px] md:text-md font-medium text-[#332820] my-auto">
                      ₹{item.sellingPrice}
                      <span className="line-through text-sm my-auto text-secondary font-normal">
                        {item.regularPrice}
                      </span>
                    </div>

                    <button className="bg-primary hover:bg-white text-white hover:text-primary px-4 py-1 cursor-pointer rounded-3xl text-[10px] md:text-[15px] border border-primary transition">
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white shadow px-4 py-3 rounded-full z-10"
        >
          {LeftArrowIcon}
        </button>

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
