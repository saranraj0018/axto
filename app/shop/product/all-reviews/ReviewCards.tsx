"use client";
import { useState } from "react";
import { RatingStarIcon } from "../../../../components/all_icons";

const allReviews = [
  {
    id: 1,
    rating: 5,
    date: "12/12/26",
    title: "Great value",
    description:
      "I'm impressed with the brake pads' stopping power, offering great value. The side mirrors have a sleek design. Delivery was fast.",
    images: [
      "/img/others/RV1.png",
      "/img/others/RV1.png",
      "/img/others/RV1.png",
    ],
    name: "Jeevan Patel",
  },
  {
    id: 2,
    rating: 3,
    date: "11/08/26",
    title: "Good but can improve",
    description:
      "Quality is decent for the price. Delivery was on time but packaging could be better.",
    images: ["/img/others/RV1.png", "/img/others/RV1.png"],
    name: "Dhaamu",
  },
  {
    id: 3,
    rating: 4,
    date: "10/03/26",
    title: "Satisfied purchase",
    description:
      "The product works as expected. Smooth performance and affordable too.",
    images: [],
    name: "Vicky",
  },
  {
    id: 4,
    rating: 5,
    date: "09/03/26",
    title: "Excellent Quality",
    description: "Perfect build quality and fast delivery. Highly recommend!",
    images: ["/img/others/RV1.png"],
    name: "Karthik",
  },
  {
    id: 5,
    rating: 2,
    date: "08/09/26",
    title: "Average",
    description: "Not as expected. Could have been better.",
    images: [],
    name: "Suresh",
  },
  {
    id: 6,
    rating: 4,
    date: "07/02/26",
    title: "Value for money",
    description: "Good performance for budget users.",
    images: ["/img/others/RV1.png"],
    name: "Hari",
  },
  {
    id: 7,
    rating: 5,
    date: "06/05/26",
    title: "Awesome purchase",
    description: "Exceeded expectations in all aspects.",
    images: ["/img/others/RV1.png"],
    name: "Manoj",
  },
  {
    id: 8,
    rating: 3,
    date: "05/04/26",
    title: "Decent",
    description: "Works okay. Not too great, not too bad.",
    images: [
      "/img/others/RV1.png",
      "/img/others/RV1.png",
      "/img/others/RV1.png",
    ],
    name: "Lokesh",
  },
  {
    id: 9,
    rating: 4,
    date: "04/01/26",
    title: "Satisfied",
    description: "Good performance and fast delivery.",
    images: ["/img/others/RV1.png"],
    name: "Deepak",
  },
];

const ReviewCards = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleReviews = allReviews.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-12 gap-5 my-10">
        {visibleReviews.map((item) => (
          <div
            key={item.id}
            className="col-span-12 md:col-span-4 p-4 border border-[#DBDBDB] rounded-3xl space-y-3"
          >
            <div className="flex justify-between">
              <div className="flex gap-1 font-medium">
                <div className="mt-1 flex gap-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <RatingStarIcon key={i} />
                  ))}
                </div>
                {item.rating}
              </div>
              <div className="text-secondary text-[12px]">{item.date}</div>
            </div>

            <div>
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-secondary text-[13px]">{item.description}</p>
            </div>

            {item.images.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {item.images.map((img, i) => (
                  <img key={i} src={img} alt="" />
                ))}
              </div>
            )}

            <p className="font-medium text-md mt-4">{item.name}</p>
          </div>
        ))}
      </div>

      {visibleCount < allReviews.length && (
        <div className="flex justify-center my-6">
          <button
            onClick={loadMore}
            className="axto-orange-btn"
          >
            View More
          </button>
        </div>
      )}
    </>
  );
};

export default ReviewCards;
