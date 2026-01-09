"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface WishlistIconProps {
    productId: number;
    initialLiked?: boolean;
    onChange?: (liked: boolean) => void;
}

export const WishlistIcon = ({
                                 productId,
                                 initialLiked = false,
                                 onChange,
                             }: WishlistIconProps) => {
    const [liked, setLiked] = useState(initialLiked);
    const [loading, setLoading] = useState(false);

    const toggleWishlist = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/wishlist/toggle`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                    },
                    body: JSON.stringify({ product_id: productId }),
                }
            );

            const data = await res.json();

            if (data.status === 401) {
                toast.error("Please Sign In");
                return;
            }

            const newLiked = data.liked;

            setLiked(newLiked);

            // 🔔 Notify parent ONLY if provided
            onChange?.(newLiked);

            toast.success(data.message || "Wishlist updated");
        } catch (error) {
            console.error("Wishlist error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <svg
            onClick={toggleWishlist}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className={`cursor-pointer transition-all duration-300 ${
                liked ? "fill-[#ff3144]" : "fill-gray-400 hover:fill-red-500"
            } ${loading ? "opacity-50" : ""}`}
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    );
};
