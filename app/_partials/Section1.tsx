"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

type Banner = {
  id: number;
  image: string;
  link: string;
};

const Section1 = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/user/banner/list`,
                    { cache: "no-store" }
                );
                const json = await res.json();
                setBanners(json.data || []);
            } catch (error) {
                console.error("Banner fetch error:", error);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length === 0) return;

        const interval = setInterval(() => {
            setCurrent((prev) =>
                prev === banners.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [banners.length]);

    if (banners.length === 0) return null;


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
                          priority={current === 0}
                          unoptimized
                      />
                  </a>
              ))}
          </div>

        {/* DOTS */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {banners.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={
                        "w-2 h-2 rounded-full transition-all " +
                        (index === current
                            ? "bg-orange-500 scale-125"
                            : "bg-zinc-500")
                    }
                />
            ))}
        </div>
    </div>
  );
};


export default Section1;
