"use client";

import ProgressBar from "./ProgressBar";
import Link from "next/link";
import AllReviews from "./AllReviews";

interface Review {
  id: number;
  rating: number;
  title: string;
  description: string;
  image: string | null;
  created_at: string | null;
}

interface ReviewsProps {
  reviews?: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews = [] }) => {
  const totalReviews = reviews.length;

  const averageRating =
      totalReviews > 0
          ? (
              reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          ).toFixed(1)
          : "0.0";

  // Rating distribution (for progress bar)
  const ratingCounts = [5, 4, 3, 2, 1].map(
      (star) => reviews.filter((r) => r.rating === star).length
  );

  return (
      <div>
        <div className="my-5 grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Rating Summary */}
          <div className="md:col-span-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">

              {/* Rating Number */}
              <div className="w-full sm:w-1/2 text-center sm:text-left">
                <div className="flex items-start justify-center sm:justify-start">
                  <h2 className="text-[80px] sm:text-[120px] md:text-[120px] lg:text-[150px] leading-none text-black font-medium">
                    {averageRating}
                  </h2>

                  <span className="text-[18px] sm:text-[24px] md:text-[30px] mt-3 sm:mt-5 md:mt-10 lg:mt-14">
              /5
            </span>
                </div>

                <p className="text-secondary text-sm sm:text-base md:text-lg mt-2">
                  ({totalReviews} Reviews)
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-1/2 my-auto">
                <ProgressBar
                    total={totalReviews}
                    ratings={ratingCounts}
                />
              </div>
            </div>
          </div>

          {/* All Reviews */}
          <div className="md:col-span-6">
            <AllReviews reviews={reviews} />
          </div>

        </div>
      </div>
  );
};

export default Reviews;
