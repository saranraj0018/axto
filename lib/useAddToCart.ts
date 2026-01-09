"use client";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export const useAddToCart = () => {
    const { token, isAuthenticated } = useAuth();

    const addToCart = async (
        item: { id: number; variant_id?: number; quantity: number },
        config?: {
            onAuthRequired?: () => void;
            buyNow?: boolean;
            onSuccess?: () => void;
        }
    ): Promise<boolean> => {
        if (!token || !isAuthenticated) {
            config?.onAuthRequired?.();
            return false;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/cart/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        product_id: item.id,
                        variant_id: item.variant_id ?? 0,
                        quantity: item.quantity,
                    }),
                }
            );


            // 🔴 AUTH
            if (res.status === 401) {
                config?.onAuthRequired?.();
                return false;
            }

            // 🔴 VALIDATION / STOCK ERRORS
            if (res.status === 422 || res.status === 400) {
                const data = await res.json();
                console.log("Error data:", data);
                toast.error(data?.message ?? "Unable to add to cart");
                return false;
            }

            // 🔴 OTHER ERRORS
            if (!res.ok) {
                toast.error("Add to cart failed");
                return false;
            }

            // 🟢 BUY NOW
            if (config?.buyNow) {
                window.location.href = "/cart";
            }

            toast.success("Added to cart");
            config?.onSuccess?.();
            return true;

        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("Something went wrong");
            return false;
        }
    };

    return { addToCart };
};
