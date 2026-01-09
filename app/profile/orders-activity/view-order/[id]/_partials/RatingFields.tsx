"use client";
import React, { useRef, useState } from "react";
import {
  grayStarIcon,
  yellowStarIcon,
  UploadPhotoIcon,
} from "@/components/all_icons";
import toast from "react-hot-toast";

const RatingFields = ({ orderId }: { orderId: string }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("order_id", orderId);
    formData.append("rating", String(rating));
    formData.append("review", review);

    if (image) {
      formData.append("image", image); // ✅ single image
    }
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/product/review`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: formData,
        }
    );
      if (res.status === 413){
          toast.error('image size must be 2 Mb below')
          return;
      }
    const data = await res.json();



    if (data.status) {
      toast.success("Review submitted!");
      setRating(0);
      setReview("");
      setImage(null);
    }

  };

  return (
      <div className="space-y-4">
        <h3 className="text-2xl font-medium">Rate your experience</h3>
        <p className="text-secondary text-sm">
          Share your thoughts with other customers
        </p>

        {/* ⭐ STAR RATINGS */}
        <div className="flex space-x-3 cursor-pointer">
          {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} onClick={() => setRating(num)}>
                {num <= rating ? yellowStarIcon : grayStarIcon}
              </div>
          ))}
        </div>

        {/* REVIEW FORM */}
        <form onSubmit={submitReview}>
          <label className="text-sm font-medium">Review this Product</label>

          <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="my-2 w-full h-28 text-sm outline outline-gray-300 p-2 rounded-2xl"
              placeholder="Share your thoughts"
          />

          {/* IMAGE UPLOAD */}
          <div className="mt-4">
            <label className="text-sm font-medium block mb-2">
              Upload Image
            </label>

            <div
                onClick={() => fileInputRef.current?.click()}
                className="outline outline-gray-300 h-22 rounded-2xl flex flex-col gap-2 items-center justify-center cursor-pointer"
            >
              {UploadPhotoIcon}
              <span className="text-gray-500">Upload Photo</span>
                <span className="text-red-400">Make sure the image is at least
                  and under 2 MB.</span>
            </div>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
                className="hidden"
            />

            {/* IMAGE PREVIEW */}
            {image && (
                <div className="mt-3 relative w-24 h-24 border rounded-md overflow-hidden">
                  <img
                      src={URL.createObjectURL(image)}
                      className="w-full h-full object-cover"
                      alt="Preview"
                  />
                  <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 rounded"
                  >
                    ✕
                  </button>
                </div>
            )}
          </div>

          <button type="submit" className="axto-orange-btn my-4">
            Submit
          </button>
        </form>
      </div>
  );
};

export default RatingFields;
