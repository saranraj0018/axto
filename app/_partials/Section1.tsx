"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

type Banner = {
  id: number;
  image: string;
  link: string;
};

const Section1 = () => {
  const banners: Banner[] = [
    { id: 1, image: "/img/home/B1.png", link: "#" },
    { id: 2, image: "/img/home/B1.png", link: "#" },
    { id: 3, image: "/img/home/B1.png", link: "#" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index: number) => setCurrent(index);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="min-w-full shrink-0 relative h-[140px] md:h-[350px] lg:h-[560px]"
          >
            <Image
              src={item.image}
              alt={`Banner ${item.id}`}
              fill
              className="object-cover"
              priority={item.id === 1}
            />
          </a>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((item) => (
          <button
            key={item.id}
            onClick={() => goToSlide(item.id - 1)}
            className={
              "w-2 h-2 rounded-full transition-all " +
              (item.id - 1 === current ? "bg-orange-500 scale-125" : "bg-zinc-500")
            }
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Section1;
