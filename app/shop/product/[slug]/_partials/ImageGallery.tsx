"use client";
import { useState, useMemo } from "react";

interface ImageGalleryProps {
  images?: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const safeImages = useMemo(
      () => (Array.isArray(images) ? images.filter(Boolean) : []),
      [images]
  );

  const [mainIndex, setMainIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  // 🔍 Zoom states
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const visibleThumbnails = 4;
  const total = safeImages.length;

  if (total === 0) {
    return (
        <div className="w-full h-80 flex items-center justify-center border rounded-2xl text-gray-400">
          No image available
        </div>
    );
  }

  /** ---------- MAIN IMAGE NAV ---------- */
  const goNext = () => {
    const nextIndex = (mainIndex + 1) % total;
    setMainIndex(nextIndex);

    if (nextIndex >= startIndex + visibleThumbnails) {
      setStartIndex(nextIndex - visibleThumbnails + 1);
    }
  };

  const goPrev = () => {
    const prevIndex = (mainIndex - 1 + total) % total;
    setMainIndex(prevIndex);

    if (prevIndex < startIndex) {
      setStartIndex(prevIndex);
    }
  };

  /** ---------- THUMB SLIDER ---------- */
  const slideNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const slidePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  /** ---------- ZOOM HANDLER ---------- */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
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
              <path d="M15 6l-6 6 6 6" stroke="black" strokeWidth="2" fill="none" />
            </svg>
          </button>

          {/* 🔍 ZOOM IMAGE */}
          <div
              className="relative w-full h-[360px] overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
          >
            <img
                src={safeImages[mainIndex]}
                alt="Main product"
                className={`w-full h-full object-contain transition-transform duration-200 ${
                    zoom ? "scale-150" : "scale-100"
                }`}
                style={{
                  transformOrigin: `${pos.x}% ${pos.y}%`,
                }}
                draggable={false}
            />
          </div>

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

        {/* THUMBNAILS */}
        <div className="flex items-center gap-2 mt-4">
          <button
              onClick={slidePrev}
              className="bg-gray-200 p-2 rounded-full hover:bg-orange-300 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M15 6l-6 6 6 6" stroke="black" strokeWidth="2" fill="none" />
            </svg>
          </button>

          <div className="overflow-hidden flex-1">
            <div
                className="flex gap-2 transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${startIndex * 72}px)` }}
            >
              {safeImages.map((img, idx) => (
                  <div
                      key={idx}
                      onClick={() => setMainIndex(idx)}
                      className={`w-24 h-24 shrink-0 cursor-pointer border rounded-md overflow-hidden ${
                          mainIndex === idx
                              ? "border-orange-500"
                              : "border-gray-300"
                      }`}
                  >
                    <img
                        src={img}
                        alt={`Thumbnail ${idx}`}
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                  </div>
              ))}
            </div>
          </div>

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
