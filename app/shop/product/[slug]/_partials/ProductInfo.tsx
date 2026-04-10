"use client";

import { RatingStarIcon, MinusIcon, PlusIcon } from "@/components/all_icons";
import ProductShareButton from "@/components/ProductShareButton";
import { useAddToCart } from "@/lib/useAddToCart";
import { useAuthModal } from "@/context/AuthModalContext";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

/** ---------- TYPES ---------- */
interface VariantType {
  variant_id: number;
  name: string;
  regular: number;
  sale: number;
  stock?: number;
  cart_qty?: number;
  remaining_stock?: number;
  is_out_of_stock?: boolean;
  discount?: number;
  cover_image: string;
  images?: string[];
}

interface ProductInfoProps {
  product: any;
  selectedVariant: VariantType | null;
  setSelectedVariant: (variant: VariantType) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedVariant,
  setSelectedVariant,
}) => {
  const [count, setCount] = useState(1);
  const { addToCart, loadingId } = useAddToCart();
  const { openAuthModal } = useAuthModal();
  const router = useRouter();

  const variants: VariantType[] = useMemo(
    () => product.variants ?? [],
    [product.variants],
  );

  /** ---------- AUTO SELECT FIRST AVAILABLE VARIANT ---------- */
  useEffect(() => {
    if (product.type !== "variant" || variants.length === 0) return;

    const hasSelected = selectedVariant
      ? variants.some((v) => v.variant_id === selectedVariant.variant_id)
      : false;

    if (!hasSelected) {
      const firstAvailable =
        variants.find((v) => (v.remaining_stock ?? 0) > 0) || variants[0];

      setSelectedVariant(firstAvailable);
    }
  }, [product.type, variants, selectedVariant, setSelectedVariant]);

  /** ---------- ACTIVE VARIANT ---------- */
  const activeVariant: VariantType | null =
    product.type === "variant"
      ? variants.find((v) => v.variant_id === selectedVariant?.variant_id) ||
        variants.find((v) => (v.remaining_stock ?? 0) > 0) ||
        variants[0] ||
        null
      : null;

  /** ---------- RESET COUNT WHEN VARIANT CHANGES ---------- */
  useEffect(() => {
    setCount(1);
  }, [activeVariant?.variant_id, product.id]);

  /** ---------- STOCK ---------- */
  const actualStock =
    product.type === "variant"
      ? (activeVariant?.stock ?? 0)
      : (product.stock ?? 0);

  const cartQty =
    product.type === "variant"
      ? (activeVariant?.cart_qty ?? 0)
      : (product.cart_qty ?? 0);

  const currentStock =
    product.type === "variant"
      ? (activeVariant?.remaining_stock ?? 0)
      : (product.remaining_stock ?? 0);

  /** ---------- PRICE ---------- */
  const salePrice =
    product.type === "variant"
      ? (activeVariant?.sale ?? 0)
      : product.sellingPrice && product.sellingPrice > 0
        ? product.sellingPrice
        : product.regularPrice;

  const regularPrice =
    product.type === "variant"
      ? (activeVariant?.regular ?? 0)
      : product.regularPrice;

  const discount =
    product.type === "variant" ? activeVariant?.discount : product.discount;

  /** ---------- FIX COUNT IF STOCK LOWER ---------- */
  useEffect(() => {
    if (count > currentStock && currentStock > 0) {
      setCount(currentStock);
    }

    if (currentStock <= 0) {
      setCount(1);
    }
  }, [currentStock, count]);

  return (
    <div>
      {/* BRAND */}
      <p className="text-sm text-secondary mb-1 rounded-full border border-secondary w-max py-0.5 px-2">
        {Array.isArray(product.brand)
          ? product.brand.join(", ")
          : product.brand}
      </p>

      {/* TITLE */}
      <h1 className="md:text-xl font-medium my-4">{product.title}</h1>

      <p className="text-[11px] md:text-[15px] text-secondary mb-2">
        {Array.isArray(product.attribute_name)
          ? product.attribute_name.join(", ")
          : product.attribute_name}
      </p>

      {/* ---------- VARIANT SELECT ---------- */}
      {product.type === "variant" && variants.length > 0 && (
        <select
          className="rounded px-2 py-1 mb-4 focus:outline-none border border-gray-300 text-sm w-1/3"
          value={activeVariant?.variant_id ?? ""}
          onChange={(e) => {
            const selectedId = Number(e.target.value);
            const variant = variants.find((v) => v.variant_id === selectedId);
            if (variant) {
              setSelectedVariant(variant);
              setCount(1);
            }
          }}
        >
          {variants.map((v) => (
            <option key={v.variant_id} value={v.variant_id}>
              {v.name} {(v.remaining_stock ?? 0) <= 0 ? "(Out of Stock)" : ""}
            </option>
          ))}
        </select>
      )}

      {/* ---------- PRICE ---------- */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xl font-medium">₹{salePrice}</span>

        {regularPrice > salePrice && (
          <span className="text-[14px] line-through text-secondary">
            ₹{regularPrice}
          </span>
        )}

        {discount ? (
          <span className="text-[12px] text-green-600 font-medium">
            {discount}% OFF
          </span>
        ) : null}

        <div className="flex gap-1 my-auto mx-2 text-[14px] font-medium">
          <RatingStarIcon />
          {product.ratings}
        </div>

        <span
          className={`text-[12px] rounded-full py-0.5 px-2 ${
            currentStock > 0
              ? "border border-green-500 text-green-500 bg-green-100"
              : "border border-red-500 text-red-500 bg-red-100"
          }`}
        >
          {currentStock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        {currentStock > 0 && cartQty > 0 && (
          <span className="text-[12px] text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
            {cartQty} in cart • {currentStock} left
          </span>
        )}

        {actualStock > 0 && currentStock <= 0 && (
          <span className="text-[12px] text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
            Already fully added in cart
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="text-[11px] md:text-[15px] text-secondary mb-2">
        {product.description}
      </p>

      {/* ---------- QTY + ACTIONS ---------- */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 my-4">
        {/* Quantity */}
        <div className="flex gap-2 items-center bg-[#EDF0F4] rounded-full p-1 w-max">
          <button
            onClick={() => setCount((c) => Math.max(1, c - 1))}
            disabled={count <= 1}
            className="h-5 md:h-8 w-5 md:w-8 rounded-full bg-white hover:bg-gray-200 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {MinusIcon}
          </button>

          <span className="text-[12px] md:text-md min-w-[20px] text-center">
            {count}
          </span>

          <button
            onClick={() => setCount((c) => (c < currentStock ? c + 1 : c))}
            disabled={count >= currentStock || currentStock <= 0}
            className="h-5 md:h-8 w-5 md:w-8 rounded-full bg-white hover:bg-gray-200 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {PlusIcon}
          </button>
        </div>

        {/* Action Buttons */}
        {currentStock <= 0 ? (
          <button
            type="button"
            disabled
            className="px-6 py-2 rounded-full text-sm font-medium bg-gray-300 text-gray-600 border border-gray-300 cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : (
          <div className="flex gap-3 flex-wrap">
            {/* Add to Cart */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();

                addToCart(
                  {
                    id: product.id,
                    variant_id:
                      product.type === "variant"
                        ? (activeVariant?.variant_id ?? 0)
                        : 0,
                    quantity: count,
                  },
                  {
                    onAuthRequired: openAuthModal,
                    buyNow: false,
                  },
                );
              }}
              disabled={loadingId === product.id}
              className="axto-white-btn text-sm my-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingId === product.id ? "Adding..." : "+ Add to Cart"}
            </button>

            {/* Buy Now */}
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();

                try {
                  await addToCart(
                    {
                      id: product.id,
                      variant_id:
                        product.type === "variant"
                          ? (activeVariant?.variant_id ?? 0)
                          : 0,
                      quantity: count,
                    },
                    {
                      onAuthRequired: openAuthModal,
                      buyNow: false,
                    },
                  );

                  router.push("/cart");
                } catch (error) {
                  console.error("Buy now error:", error);
                }
              }}
              disabled={loadingId === product.id}
              className="px-6 py-2 rounded-full text-sm font-medium bg-primary text-white border border-primary hover:bg-white hover:text-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingId === product.id ? "Processing..." : "Buy Now"}
            </button>
          </div>
        )}
      </div>

      {/* META */}
      <p className="text-[12px] md:text-sm text-gray-500">
        ITEM CODE: {product.item_code}
      </p>
      <p className="text-[12px] md:text-sm text-gray-500">
        CATEGORY: {product.category}
      </p>

      {/* SHARE */}
      <ProductShareButton
        productName={product.title}
        productSlug={`${product.title}-${product.id}`}
        productImage={product.cover_image}
      />
    </div>
  );
};

export default ProductInfo;
