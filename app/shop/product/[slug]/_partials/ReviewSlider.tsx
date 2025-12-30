"use client";
import React, { useState } from "react";

const GrayStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#757575"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9" />
  </svg>
);

const YellowStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="#FFBB00"
    stroke="#FFBB00"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9" />
  </svg>
);

// Sample reviews
const ReviewData = [
  {
    Name: "Tharun",
    Description:
      "NextGen's dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning.",
    Date: "13 Nov 2025",
    StarRating: 3,
    ProfileImg: "/img/others/Review.png",
  },
  {
    Name: "Vasanth",
    Description:
      "NextGen's dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning.",
    Date: "13 Nov 2025",
    StarRating: 5,
    ProfileImg: "/img/others/Review.png",
  },
  {
    Name: "Sharan",
    Description:
      "NextGen's dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning.",
    Date: "13 Nov 2025",
    StarRating: 4,
    ProfileImg: "/img/others/Review.png",
  },
];

const ReviewSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? ReviewData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === ReviewData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full flex items-center justify-center py-6">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow z-10 scale-75 md:scale-100"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M15 6l-6 6 6 6" stroke="black" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {/* Slider */}
      <div className="w-[400px] overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 370}px)` }}
        >
          {ReviewData.map((review, index) => (
            <div
              key={index}
              className="shrink-0 w-[350px] m-2 border border-gray-300 rounded-xl shadow-md p-4 flex flex-col bg-gray-50"
            >
              {/* Reviewer */}
              <div className="flex items-center mb-2">
                <img
                  src={review.ProfileImg}
                  alt={review.Name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="flex flex-col justify-center">
                  <p className="font-medium">{review.Name}</p>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <span key={num}>
                        {num <= review.StarRating ? (
                          <YellowStar />
                        ) : (
                          <GrayStar />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-auto">
                  <p className="text-xs text-secondary">{review.Date}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-secondary text-[12px] md:text-sm">
                {review.Description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow z-10 scale-75 md:scale-100"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" stroke="black" strokeWidth="2" fill="none" />
        </svg>
      </button>
    </div>
  );
};

export default ReviewSlider;
