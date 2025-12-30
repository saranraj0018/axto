"use client";

import React, { useEffect, useRef, useState } from "react";
import { Share2, Mail, Link as LinkIcon } from "lucide-react";

type ProductShareButtonProps = {
  productName: string;
  productSlug: string;
  productImage?: string;
};

export default function ProductShareButton({
                                             productName,
                                             productSlug,
                                             productImage,
                                           }: ProductShareButtonProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShareUrl(
        `${window.location.origin}/shop/product/${encodeURIComponent(productSlug)}`
    );
  }, [productSlug]);


  // 🔹 Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isMobile = () =>
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleShareClick = async () => {
    if (navigator.share && isMobile()) {
      await navigator.share({
        title: productName,
        text: "Check out this product!",
        url: shareUrl,
      });
    } else {
      setOpen((prev) => !prev);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    alert("Link copied!");
    setOpen(false);
  };

  return (
      <div ref={wrapperRef} className="relative inline-block">
        <button
            onClick={handleShareClick}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Share"
        >
          <Share2 size={20} />
        </button>

        {open && (
            <div className="absolute right-0 top-10 w-52 bg-white border rounded-lg shadow-lg z-50">
              <a
                  href={`mailto:?subject=${encodeURIComponent(
                      productName
                  )}&body=${encodeURIComponent(shareUrl)}`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <Mail size={16} /> Email
              </a>

              <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 hover:bg-gray-100 block"
              >
                Facebook
              </a>

              <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      shareUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 hover:bg-gray-100 block"
              >
                X
              </a>

              {productImage && (
                  <a
                      href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                          shareUrl
                      )}&media=${encodeURIComponent(
                          productImage
                      )}&description=${encodeURIComponent(productName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 hover:bg-gray-100 block"
                  >
                    Pinterest
                  </a>
              )}

              <button
                  onClick={copyLink}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <LinkIcon size={16} /> Copy Link
              </button>
            </div>
        )}
      </div>
  );
}
