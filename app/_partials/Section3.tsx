"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  image: string;
}

const Section3 = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/category/list`
        );
        const json = await res.json();
        setCategories(json.data || []);
      } catch (error) {
        console.error("Category fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, categories.length));
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(prev - 6, 6));
  };

  const visibleItems = categories.slice(0, visibleCount);

  const slugify = (text: string) =>
      text.toLowerCase().replace(/\s+/g, "-");

  if (loading) return null;

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
              <Link href={`/shop/category/${slugify(item.name.toLowerCase())}`}>
              <img
                  src={item.image}
                  alt={item.name}
                  className="w-full rounded-lg"
              />
              </Link>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-4">
          {visibleCount < categories.length && (
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
