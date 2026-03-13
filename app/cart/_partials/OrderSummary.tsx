"use client";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BillSummary {
    totalItems: number;
    itemsAmount: number;
    deliveryCharge: number;
    SGST: string;
    IGST: string;
    discount: number;
    platformFee: number;
    totalAmount: string;
}

interface OrderSummaryProps {
    billSummary: BillSummary | null;
    removeCoupon: () => void;
}

const OrderSummary = ({ billSummary,removeCoupon }: OrderSummaryProps) => {
    if (!billSummary) return null;
    const { openAuthModal } = useAuthModal();
    const { token, isAuthenticated } = useAuth();
    const router = useRouter();
    const {
        totalItems,
        itemsAmount,
        deliveryCharge,
        SGST,
        IGST,
        discount,
        platformFee,
        totalAmount,
    } = billSummary;
    const [loading, setLoading] = useState(false);

    const igst = parseFloat(IGST || "0");
    const sgst = parseFloat(SGST || "0");

    const gst =(igst + sgst);


    const handleCheckout = () => {
        if (!token || !isAuthenticated) {
            openAuthModal();   // ✅ DIRECT CALL
            return;
        }
        setLoading(true);
        router.push("/cart/address");
    };
    return (
        <div className="border border-gray-200 p-6 rounded-2xl shadow-lg">
            <h2 className="text-sm md:text-lg font-semibold mb-4">
                Order Summary
            </h2>

            <hr className="my-2" />

            <div className="flex justify-between mb-2">
                <span>Total Items</span>
                <span>{totalItems}</span>
            </div>

            <div className="flex justify-between mb-2">
                <span>Sub Total</span>
                <span>₹{itemsAmount}</span>
            </div>
            {discount > 0 && (
                <div className="bg-green-50 border border-green-200 p-2 rounded-lg text-sm mb-3 flex justify-between">
                    <span>Coupon Applied (-₹{discount})</span>
                    <button onClick={removeCoupon} className="text-red-500">
                        Remove
                    </button>
                </div>
            )}
            <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹{deliveryCharge}</span>
            </div>

            {/*<div className="flex justify-between mb-2">*/}
            {/*    <span>SGST</span>*/}
            {/*    <span>₹{SGST}</span>*/}
            {/*</div>*/}

            <div className="flex justify-between mb-2">
                <span>GST</span>
                <span>₹{gst}</span>
            </div>

            {platformFee > 0 && (
                <div className="flex justify-between mb-2">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                </div>
            )}

            <hr className="my-2" />

            <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{totalAmount}</span>
            </div>

            <button  type="button" disabled={loading}
                onClick={handleCheckout}
                className="axto-orange-btn w-full mt-3"
            >
                {loading ? "Processing..." : "Proceed to checkout"}
            </button>
        </div>
    );
};

export default OrderSummary;
