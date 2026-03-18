"use client";
import {
    RatingStarIcon,
    MinusIcon,
    PlusIcon,
} from "@/components/all_icons";
import ProductShareButton from "@/components/ProductShareButton";
import { useAddToCart } from "@/lib/useAddToCart";
import { useAuthModal } from "@/context/AuthModalContext";
import { useState, useEffect, useMemo } from "react";

/** ---------- TYPES ---------- */
interface VariantType {
    variant_id: number;
    name: string;
    regular: number;
    sale: number;
    stock?: number;
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

    const variants: VariantType[] = useMemo(
        () => product.variants ?? [],
        [product.variants]
    );

    /** AUTO SELECT FIRST VARIANT */
    useEffect(() => {
        if (product.type === "variant" && variants.length > 0 && !selectedVariant) {
            setSelectedVariant(variants[0]);
        }
    }, [product.type, variants, selectedVariant, setSelectedVariant]);

    /** ---------- ACTIVE VARIANT ---------- */
    const activeVariant: VariantType | null =
        product.type === "variant"
            ? selectedVariant || variants[0] || null
            : null;

    /** ---------- STOCK ---------- */
    const currentStock =
        product.type === "variant"
            ? activeVariant?.stock ?? 0
            : product.stock ?? 0;

    /** ---------- PRICE ---------- */
    const salePrice =
        product.type === "variant"
            ? activeVariant?.sale ?? 0
            : product.sellingPrice && product.sellingPrice > 0
                ? product.sellingPrice
                : product.regularPrice;

    const regularPrice =
        product.type === "variant"
            ? activeVariant?.regular ?? 0
            : product.regularPrice;

    const discount =
        product.type === "variant"
            ? activeVariant?.discount
            : product.discount;



    return (
        <div>
            {/* BRAND */}
            <p className="text-sm text-secondary mb-1 rounded-full border border-secondary w-max py-0.5 px-2">
                {product.brand}
            </p>

            {/* TITLE */}
            <h1 className="md:text-xl font-medium my-4">{product.title}</h1>

            <p className="text-[11px] md:text-[15px] text-secondary mb-2">
                {product.attribute_name}
            </p>

            {/* ---------- VARIANT SELECT ---------- */}
            {product.type === "variant" && variants.length > 0 && (
                <select
                    className="rounded px-2 py-1 mb-4 focus:outline-none border border-gray-300 text-sm w-1/3"
                    value={activeVariant?.name}
                    onChange={(e) => {
                        const v = variants.find((x) => x.name === e.target.value);
                        if (v) {
                            setSelectedVariant(v);
                            setCount(1);
                        }
                    }}
                >
                    {variants.map((v) => (
                        <option
                            key={v.variant_id}
                            value={v.name}
                            disabled={(v.stock ?? 0) <= 0}
                        >
                            {v.name} {(v.stock ?? 0) <= 0 ? "(Out of Stock)" : ""}
                        </option>
                    ))}
                </select>
            )}

            {/* ---------- PRICE ---------- */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-medium">₹{salePrice}</span>

                {regularPrice > salePrice && (
                    <span className="text-[14px] line-through text-secondary">
            ₹{regularPrice}
          </span>
                )}

                {discount && (
                    <span className="text-[12px] text-green-600 font-medium">
            {discount}% OFF
          </span>
                )}

                <div className="flex gap-1 my-auto mx-2 text-[14px] font-medium">
                    <RatingStarIcon />
                    {product.ratings}
                </div>

                <span className="text-[12px] border border-green-500 text-green-500 rounded-full py-0.5 px-2 bg-green-100">
          {currentStock > 0 ? "In Stock" : "Out of Stock"}
        </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-[11px] md:text-[15px] text-secondary mb-2">
                {product.description}
            </p>

            {/* ---------- QTY ---------- */}
            <div className="flex gap-2 my-4">
                <div className="flex gap-2 items-center bg-[#EDF0F4] rounded-full p-1">
                    <button
                        onClick={() => setCount((c) => Math.max(1, c - 1))}
                        disabled={count <= 1}
                        className="h-5 md:h-8 w-5 md:w-8 rounded-full bg-white hover:bg-gray-200 flex justify-center items-center disabled:opacity-50"
                    >
                        {MinusIcon}
                    </button>

                    <span className="text-[12px] md:text-md">{count}</span>

                    <button
                        onClick={() => setCount((c) => (c < currentStock ? c + 1 : c))}
                        disabled={count >= currentStock}
                        className="h-5 md:h-8 w-5 md:w-8 rounded-full bg-white hover:bg-gray-200 flex justify-center items-center disabled:opacity-50"
                    >
                        {PlusIcon}
                    </button>
                </div>

                {/* ADD TO CART */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(
                            {
                                id: product.id,
                                variant_id:
                                    product.type === "variant"
                                        ? activeVariant?.variant_id ?? 0
                                        : 0,
                                quantity: count,
                            },
                            {
                                onAuthRequired: openAuthModal,
                                buyNow: true,
                            }
                        );
                    }}
                    disabled={currentStock <= 0 || loadingId === product.id}
                    className="axto-white-btn text-sm my-auto disabled:opacity-50"
                >
                    {currentStock <= 0
                        ? "Out of Stock"
                        : loadingId === product.id
                            ? "Adding..."
                            : "+ Add to Cart"}
                </button>
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