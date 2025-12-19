"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Brand = {
  id: number;
  name:string;
  image: string;
};

const Section2 = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);


  // FETCH BRANDS
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/brand/list`,
            { cache: "no-store" }
        );
        const json = await res.json();
        setBrands(json.data || []);
      } catch (error) {
        console.error("Brand fetch error:", error);
      }
    };

    fetchBrands();
  }, []);

  // Show More → +4
  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, brands.length));
  };

  // Show Less → -4  
  const handleShowLess = () => {
    setVisibleCount(4);
  };


  const slugify = (text: string) =>
      text.toLowerCase().replace(/\s+/g, "-");

  if (brands.length === 0) return null; // or loader

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
          {brands.slice(0, visibleCount).map((item) => (
              <div key={item.id} className="col-span-6">
                <Link href={`/shop/brand/${slugify(item.name.toLowerCase())}`}>
                  <img
                      src={item.image}
                      alt={item.name}
                      className="cursor-pointer hover:scale-105 transition"
                  />
                </Link>
              </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-4">

          {visibleCount < brands.length && (
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
