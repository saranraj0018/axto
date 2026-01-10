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
    addressId: number | null;
}


const Summary = ({ billSummary, addressId }: OrderSummaryProps) => {
    if (!billSummary) return null;

    const isDisabled = !addressId;

    const {
        totalItems,
        itemsAmount,
        deliveryCharge,
        SGST,
        IGST,
        platformFee,
        totalAmount,
    } = billSummary;


    const handlePayment = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token || !addressId) return;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/payment/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        address_id: addressId,
                        grant_total: totalAmount,
                    }),
                }
            );

            const data = await res.json();
            console.log("Cashfree response:", data);

            if (!data.payment_session_id) {
                alert("Payment session missing");
                return;
            }

            // ✅ ENSURE SDK IS LOADED
            if (!(window as any).Cashfree) {
                alert("Cashfree SDK not loaded");
                return;
            }

            const cashfree = (window as any).Cashfree({
                mode: "production", // change to production later
            });

            cashfree.checkout({
                paymentSessionId: data.payment_session_id,
                redirectTarget: "_self",
            });

        } catch (err) {
            console.error("Payment error", err);
        }
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

            {isDisabled ? (
                <button
                    disabled
                    className="w-full mt-3 bg-gray-300 text-gray-600 cursor-not-allowed py-2 rounded-lg"
                >
                    Add Address to Continue
                </button>
            ) : (

                    <button  onClick={handlePayment} className="axto-orange-btn w-full mt-3">
                        Proceed to Buy
                    </button>
            )}
        </div>
    );
};

export default Summary;
