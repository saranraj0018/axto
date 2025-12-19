"use client";
import { useState } from "react";
import {
  RatingStarIcon,
  MinusIcon,
  PlusIcon,
  LinkIcon,
  youtube_icon,
  insta_icon,
  facebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "../../../../components/all_icons";

interface VariationType {
  id: string;
  label: string;
  regularPrice: number;
  sellingPrice: number;
}

interface ProductInfoProps {
  product: {
    id: number;
    title: string;
    description: string;
    itemCode: string;
    category: string;
    brand: string;
    ratings: number;
    stock: string;
    url: string;
    variations?: VariationType[];
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const defaultVariation = product.variations?.[0] ?? {
    regularPrice: 0,
    sellingPrice: 0,
    id: "default",
    label: "Default",
  };

  const [selectedVariation, setSelectedVariation] = useState(defaultVariation);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div>
      <p className="text-sm text-secondary mb-1 rounded-full border border-secondary w-max py-0.5 px-2">
        {product.brand}
      </p>

      <h1 className="md:text-xl font-medium my-4">{product.title}</h1>

      {/* Variation Selector */}
      {product.variations && product.variations.length > 0 && (
        <select
          className="rounded px-2 py-1 mb-4 focus:outline-none border border-gray-300 text-sm w-1/3"
          defaultValue={defaultVariation.id}
          onChange={(e) => {
            const variation = product.variations?.find(
              (v) => v.id === e.target.value
            );
            if (variation) setSelectedVariation(variation);
          }}
        >
          {product.variations.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>
      )}

      {/* Dynamic Price */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-medium">
          ₹{selectedVariation.sellingPrice}
        </span>
        {selectedVariation.regularPrice > 0 && (
          <span className="text-[14px] line-through text-secondary">
            ₹{selectedVariation.regularPrice}
          </span>
        )}
        <div className="flex gap-1 my-auto mx-2 text-[14px] font-medium">
          <div className="my-auto">
            <RatingStarIcon />
          </div>
          {product.ratings}
        </div>
        <span className="text-[12px] border border-green-500 text-green-500 rounded-full py-0.5 px-2 bg-green-100">
          {product.stock}
        </span>
      </div>

      <p className="text-[11px] md:text-[15px] text-secondary mb-2">
        {product.description}
      </p>

      {/* Qty & CTA */}
      <div className="flex gap-2 my-4">
        <div className="flex gap-2 items-center bg-[#EDF0F4] rounded-full p-1">
          <button
            className="h-5 md:h-8 w-5 md:w-8 rounded-full bg-white hover:bg-gray-200 flex justify-center items-center"
            onClick={() => setCount(count > 0 ? count - 1 : 0)}
          >
            {MinusIcon}
          </button>

          <span className="text-[12px] md:text-md">{count}</span>

          <button
            className="h-5 md:h-8 w-5 md:w-8 rounded-full bg-white hover:bg-gray-200 flex justify-center items-center"
            onClick={() => setCount(count + 1)}
          >
            {PlusIcon}
          </button>
        </div>

        <a
          href={product.url}
          className="axto-white-btn text-[12px] md:text-md h-max my-auto"
        >
          Add to Cart
        </a>
        <a
          href={product.url}
          className="axto-orange-btn text-[12px] md:text-md h-max my-auto"
        >
          Buy Now
        </a>
      </div>

      <p className="text-[12px] md:text-sm text-gray-500 mb-1">
        ITEM CODE: {product.itemCode}
      </p>
      <p className="text-[12px] md:text-sm text-gray-500 mb-1">
        CATEGORY: {product.category}
      </p>

      {/* Share */}
      <div>
        <p className="text-sm text-gray-500 my-2">Share :</p>
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="text-secondary text-sm px-1.5 py-0.5 rounded-full flex gap-1 border border-secondary hover:bg-gray-100 transition"
          >
            <div className="my-auto">{LinkIcon}</div>
            {copied ? "Copied" : "Copy Link"}
          </button>

          <div className="flex gap-2">
            {youtube_icon}
            {insta_icon}
            {facebookIcon}
            {LinkedinIcon}
            {TwitterIcon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
