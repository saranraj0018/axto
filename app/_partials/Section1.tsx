"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Section1 = () => {
  const banners = [
    { image: "/img/home/B1.png", link: "#" },
    { image: "/img/home/B1.png", link: "#" },
    { image: "/img/home/B1.png", link: "#" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000); // slide every 4s
    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index: number) => setCurrent(index);

  return (
    <div className="relative w-full overflow-hidden ">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="min-w-full shrink-0 relative h-[140px] md:h-[350px] lg:h-[560px]"
          >
            <Image
              src={item.image}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </a>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={
              "w-2 h-2 rounded-full transition-all " +
              (index === current ? "bg-orange-500 scale-125" : "bg-zinc-500")
            }
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Section1;
