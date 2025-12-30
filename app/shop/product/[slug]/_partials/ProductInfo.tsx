"use client";
import { useState } from "react";
import {
  RatingStarIcon,
  MinusIcon,
  PlusIcon,
} from "../../../../../components/all_icons";
import ProductShareButton from "@/components/ProductShareButton";

/** ---------- TYPES ---------- */
interface VariantType {
  name: string;
  regular: number;
  sale: number;
  stock?: number;
  discount?: number;
}

interface ProductInfoProps {
  product: {
    id: number;
    title: string;
    description: string;
    item_code: string;
    category: string;
    brand: string;
    ratings: number;
    type: "single" | "variant";
    regularPrice: number;
    sellingPrice: number;
    cover_image: string;
    discount?: number | null;
    stock?: number;
    url: string;
    variants?: VariantType[];
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  /** ---------- DEFAULT VARIANT ---------- */
  const variants = product.variants ?? [];

  const defaultVariant: VariantType =
      product.type === "variant" && variants.length > 0
          ? variants[0]
          : {
              name: "Default",
              regular: product.regularPrice,
              sale: product.sellingPrice,
              stock: product.stock,
          };

  const [selectedVariant, setSelectedVariant] =
      useState<VariantType>(defaultVariant);
  /** ---------- COPY LINK ---------- */





    return (
      <div>
        {/* BRAND */}
        <p className="text-sm text-secondary mb-1 rounded-full border border-secondary w-max py-0.5 px-2">
          {product.brand}
        </p>

        {/* TITLE */}
        <h1 className="md:text-xl font-medium my-4">{product.title}</h1>

        {/* VARIANT SELECT */}
          {product.type === "variant" && variants.length > 0 && (
              <select
                  className="rounded px-2 py-1 mb-4 focus:outline-none border border-gray-300 text-sm w-1/3"
                  onChange={(e) => {
                      const v = variants.find((x) => x.name === e.target.value);
                      if (v) setSelectedVariant(v);
                  }}
              >
                  {variants.map((v) => (
                      <option key={v.name} value={v.name}>
                          {v.name}
                      </option>
                  ))}
              </select>
          )}


          {/* PRICE */}
        <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-medium">
          ₹{selectedVariant.sale}
        </span>

          {selectedVariant.regular > selectedVariant.sale && (
              <span className="text-[14px] line-through text-secondary">
            ₹{selectedVariant.regular}
          </span>
          )}

          {selectedVariant.discount && (
              <span className="text-[12px] text-green-600 font-medium">
            {selectedVariant.discount}% OFF
          </span>
          )}

          <div className="flex gap-1 my-auto mx-2 text-[14px] font-medium">
            <RatingStarIcon />
            {product.ratings}
          </div>

          <span className="text-[12px] border border-green-500 text-green-500 rounded-full py-0.5 px-2 bg-green-100">
          {selectedVariant.stock && selectedVariant.stock > 0
              ? "In Stock"
              : "Out of Stock"}
        </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-[11px] md:text-[15px] text-secondary mb-2">
          {product.description}
        </p>

        {/* QTY + CTA */}
        <div className="flex gap-2 my-4">
          <div className="flex gap-2 items-center bg-[#EDF0F4] rounded-full p-1">
            <button
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="h-5 md:h-8 w-5 md:w-8 rounded-full bg-white hover:bg-gray-200 flex justify-center items-center"
            >
              {MinusIcon}
            </button>

            <span className="text-[12px] md:text-md">{count}</span>

            <button
                onClick={() => setCount((c) => c + 1)}
                className="h-5 md:h-8 w-5 md:w-8 rounded-full bg-white hover:bg-gray-200 flex justify-center items-center"
            >
              {PlusIcon}
            </button>
          </div>

          <a href={product.url} className="axto-white-btn text-sm my-auto">
            Add to Cart
          </a>
          <a href={product.url} className="axto-orange-btn text-sm my-auto">
            Buy Now
          </a>
        </div>

        {/* META */}
        <p className="text-[12px] md:text-sm text-gray-500">
          ITEM CODE: {product.item_code}
        </p>
        <p className="text-[12px] md:text-sm text-gray-500">
          CATEGORY: {product.category}
        </p>

        {/* SHARE */}
          <div>
              <ProductShareButton
                  productName={product.title}
                  productSlug={product.title + - +product.id}
                  productImage={product.cover_image}
              />
          </div>

      </div>
  );
};

export default ProductInfo;
