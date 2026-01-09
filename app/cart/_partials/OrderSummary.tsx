"use client";
import Link from "next/link";

interface BillSummary {
    totalItems: number;
    itemsAmount: number;
    deliveryCharge: number;
    SGST: string;
    IGST: string;
    platformFee: number;
    totalAmount: string;
}

interface OrderSummaryProps {
    billSummary: BillSummary | null;
}

const OrderSummary = ({ billSummary }: OrderSummaryProps) => {
    if (!billSummary) return null;

    const {
        totalItems,
        itemsAmount,
        deliveryCharge,
        SGST,
        IGST,
        platformFee,
        totalAmount,
    } = billSummary;

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

            <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹{deliveryCharge}</span>
            </div>

            <div className="flex justify-between mb-2">
                <span>SGST</span>
                <span>₹{SGST}</span>
            </div>

            <div className="flex justify-between mb-2">
                <span>IGST</span>
                <span>₹{IGST}</span>
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

            <Link href="/cart/address">
                <button className="axto-orange-btn w-full mt-3">
                    Proceed to checkout
                </button>
            </Link>
        </div>
    );
};

export default OrderSummary;
