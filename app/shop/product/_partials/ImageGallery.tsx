"use client";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const visibleThumbnails = 4;

  // Main image navigation (loop)
  const goNext = () => {
    const nextIndex = (mainIndex + 1) % images.length;
    setMainIndex(nextIndex);

    // adjust thumbnail slider if needed
    if (nextIndex >= startIndex + visibleThumbnails) {
      setStartIndex(nextIndex - visibleThumbnails + 1);
    }
    // loop thumbnail to start
    if (nextIndex < startIndex) {
      setStartIndex(nextIndex);
    }
  };

  const goPrev = () => {
    const prevIndex = (mainIndex - 1 + images.length) % images.length;
    setMainIndex(prevIndex);

    if (prevIndex < startIndex) {
      setStartIndex(prevIndex);
    }
    if (prevIndex >= startIndex + visibleThumbnails) {
      setStartIndex(prevIndex - visibleThumbnails + 1);
    }
  };

  // Thumbnail slider movement (loop)
  const slideNext = () => {
    const nextStart = (startIndex + 1) % images.length;
    setStartIndex(nextStart);
  };

  const slidePrev = () => {
    const prevStart = (startIndex - 1 + images.length) % images.length;
    setStartIndex(prevStart);
  };

  return (
    <div className="w-full">
      {/* MAIN IMAGE */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
        {/* Left arrow */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/70 p-2 rounded-full shadow hover:bg-orange-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M15 6l-6 6 6 6"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>

        {/* Image */}
        <img
          src={images[mainIndex]}
          alt="Main product"
          className="w-90 h-90 object-contain transition-all duration-300 mx-auto"
        />

        {/* Right arrow */}
        <button
          onClick={goNext}
          className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/70 p-2 rounded-full shadow hover:bg-orange-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" stroke="black" strokeWidth="2" fill="none" />
          </svg>
        </button>
      </div>

      {/* THUMBNAIL SLIDER */}
      <div className="flex items-center gap-2 mt-4">
        {/* Left thumb arrow */}
        <button
          onClick={slidePrev}
          className="bg-gray-200 p-2 rounded-full hover:bg-orange-300 transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M15 6l-6 6 6 6"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>

        {/* Thumbnails */}
        <div className="overflow-hidden flex-1">
          <div
            className="flex gap-2 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${startIndex * 72}px)` }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainIndex(idx)}
                className={`w-24 h-24 shrink-0 cursor-pointer border rounded-md overflow-hidden
                  ${
                    mainIndex === idx ? "border-orange-500" : "border-gray-300"
                  }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right thumb arrow */}
        <button
          onClick={slideNext}
          className="bg-gray-200 p-2 rounded-full hover:bg-orange-300 transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" stroke="black" strokeWidth="2" fill="none" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
