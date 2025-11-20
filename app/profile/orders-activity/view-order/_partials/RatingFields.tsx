"use client";
import { useRef, useState } from "react";
import {
  grayStarIcon,
  yellowStarIcon,
  UploadPhotoIcon,
} from "../../../../../components/all_icons";

const RatingFields = () => {
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setImages((prev) => [...prev, ...Array.from(files)]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2 md:space-y-4">
      <h3 className="text-md md:text-2xl font-medium">Rate your experience</h3>
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

      {/* REVIEW SECTION */}
      <form>
        <label className="text-sm font-medium">Review this Product</label>
        <br />

        <textarea
          className="my-2 w-full h-30 text-sm outline outline-gray-300 focus:outline-orange-400 p-2 rounded-2xl"
          placeholder="Share your Thoughts"
        />

        {/* IMAGE UPLOAD BOX */}
        <div className="mt-4">
          <label className="text-sm font-medium mb-2 block">
            Upload Images
          </label>

          {/* CLICKABLE DIV */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="
              outline outline-gray-300 focus:outline-orange-400
              h-22 rounded-2xl flex flex-col gap-2 items-center justify-center
              
            "
          >
            <div>{UploadPhotoIcon}</div>
            <div className="text-md text-gray-500 cursor-pointer">
              Upload Photos
            </div>
          </div>

          {/* HIDDEN INPUT */}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* IMAGE PREVIEW GRID */}
          <div className="mt-3 flex flex-wrap gap-3">
            {images.map((img, index) => {
              const url = URL.createObjectURL(img);
              return (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded-md overflow-hidden"
                >
                  <img
                    src={url}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* SUBMIT */}
        <input
          type="submit"
          className="axto-orange-btn my-4"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default RatingFields;
