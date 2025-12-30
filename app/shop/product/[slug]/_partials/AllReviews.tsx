"use client";

import { RatingStarIcon } from "@/components/all_icons";

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

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
        <div className="text-center py-6 text-gray-500">
          No reviews yet
        </div>
    );
  }

  return (
      <div className="space-y-4">
        <div className="overflow-auto max-h-[400px]">
          {reviews.map((item) => (
              <div
                  key={item.id}
                  className="my-3 p-4 border-t border-[#DBDBDB] space-y-3"
              >
                {/* Rating */}
                <div className="flex justify-between">
                  <div className="flex gap-2 font-medium">
                    <div className="flex gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                          <RatingStarIcon key={i} />
                      ))}
                    </div>
                    {item.rating}
                  </div>

                  {item.created_at && (
                      <div className="text-secondary text-[12px]">
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                  )}
                </div>

                {/* Review Content */}
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-secondary text-[13px]">
                    {item.description}
                  </p>
                </div>

                {/* Images (if backend sends later) */}
                {item.image && (
                    <div className="flex gap-3">
                      <img
                          src={item.image}
                          alt="review"
                          className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                )}
              </div>
          ))}
        </div>
      </div>
  );
};

export default Reviews;
