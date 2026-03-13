"use client";
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";
import { useAuth } from "@/context/AuthContext";

type CartContextType = {
    cartTotalItem: number;
    fetchCartTotal: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAuth();
    const [cartTotalItem, setCartItem] = useState(0);

    const fetchCartTotal = useCallback(async () => {

        const guestToken = localStorage.getItem("guest_token");
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/cart/total`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                        ...(guestToken && {
                            "guest-token": guestToken,
                        }),
                    },
                    cache: "no-store", // 🔥 THIS IS CRITICAL
                }
            );

            const data = await res.json();

            setCartItem(data.totalItems || 0);
        } catch (err) {
            console.error("Cart fetch failed", err);
        }
    }, [token]);

    // 🔥 THIS WAS MISSING (MOST IMPORTANT PART)
    useEffect(() => {
        if (token) {
            fetchCartTotal();
        } else {
            setCartItem(0);
        }
    }, [token, fetchCartTotal]);

    return (
        <CartContext.Provider value= {{cartTotalItem, fetchCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return context;
};