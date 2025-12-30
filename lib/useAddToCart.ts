"use client";

import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export const useAddToCart = () => {
    const router = useRouter();

    const addToCart = async (
        item: {
            id: number;
            variant_id: number;
            quantity: number;
        },
        redirect: boolean = true
    ) => {
        try {
            await api.post("/api/user/cart/add", {
                product_id: item.id,
                variant_id: item.variant_id ?? 0,
                quantity: item.quantity,
            });

            if (redirect) {
                router.push("/cart");
            }
        } catch (error) {
            console.error("Add to cart failed", error);
        }
    };

    return { addToCart };
};
