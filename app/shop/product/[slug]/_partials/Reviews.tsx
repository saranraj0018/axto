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
        <div className="my-5 grid grid-cols-12 gap-3">
          {/* Rating Summary */}
          <div className="col-span-12 md:col-span-6">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-1/2">
                <h2 className="text-[180px] md:text-[200px] text-black font-medium flex">
                  {averageRating}
                  <span className="text-[30px] mt-45">/5</span>
                </h2>
                <p className="text-secondary text-lg -mt-8">
                  ({totalReviews} Reviews)
                </p>
              </div>

              <div className="w-full md:w-1/2 my-auto">
                <ProgressBar
                    total={totalReviews}
                    ratings={ratingCounts}
                />
              </div>
            </div>
          </div>

          {/* All Reviews */}
          <div className="col-span-12 md:col-span-6 my-auto">
            <AllReviews reviews={reviews} />
          </div>
        </div>


      </div>
  );
};

export default Reviews;
