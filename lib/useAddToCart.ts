"use client";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { v4 as uuidv4 } from "uuid";
import React, { useState} from "react";

export const useAddToCart = () => {
    const { token, isAuthenticated } = useAuth();
    const { fetchCartTotal } = useCart();
    const [loading, setLoading] = useState(false);

    const addToCart = async (
        item: { id: number; variant_id?: number; quantity: number },
        config?: {
            onAuthRequired?: () => void;
            buyNow?: boolean;
            onSuccess?: () => void;
        }
    ): Promise<boolean> => {
        try {
            setLoading(true);
            let guestToken = localStorage.getItem("guest_token");

            // ✅ Create guest token if not exists
            if (!guestToken && !isAuthenticated) {
                guestToken = uuidv4();
                if (guestToken != null) {
                    localStorage.setItem("guest_token", guestToken);
                }
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/cart/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                        ...(!isAuthenticated && guestToken && {
                            "guest_token": guestToken,
                        }),
                    },
                    body: JSON.stringify({
                        product_id: item.id,
                        variant_id: item.variant_id ?? 0,
                        quantity: item.quantity,
                    }),
                }
            );

            const data = await res.json();
            setLoading(false);
            // 🔴 VALIDATION / STOCK ERRORS
            if (res.status === 422 || res.status === 400) {
                toast.error(data?.message ?? "Unable to add to cart");
                return false;
            }

            // 🔴 OTHER ERRORS
            if (!res.ok) {
                toast.error(data?.message ?? "Add to cart failed");
                return false;
            }

            // 🟢 Refresh cart count
            await fetchCartTotal();

            toast.success("Added to cart");
            config?.onSuccess?.();
            return true;

        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("Something went wrong");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { addToCart,loading };
};