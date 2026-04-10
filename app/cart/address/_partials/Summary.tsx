"use client";

import { useState } from "react";

interface BillSummary {
  totalItems: number;
  itemsAmount: number;
  deliveryCharge: number;
  discount: number;
  SGST: string;
  IGST: string;
  CGST: string;
  platformFee: number;
  totalAmount: string;
  taxAmount: string;
}

interface OrderSummaryProps {
  billSummary: BillSummary | null;
  addressId: number | null;
  shippingMessage?: string;
}


const Summary = ({ billSummary,
                     addressId,
                     shippingMessage
}: OrderSummaryProps) => {
    if (!billSummary) return null;

    const isDisabled = !addressId;
    const [loading, setLoading] = useState(false);


    const {
      totalItems,
      itemsAmount,
      deliveryCharge,
      SGST,
      IGST,
      CGST,
      discount,
      platformFee,
      totalAmount,
      taxAmount,
    } = billSummary;

    const igst = parseFloat(IGST || "0");
    const sgst = parseFloat(SGST || "0");
    const csgst = parseFloat(CGST || "0");

    const gst =(igst + sgst + csgst).toFixed(2);


    const handlePayment = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token || !addressId) return;
            setLoading(true);
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

            if (!data.payment_session_id) {
                setLoading(false);
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
            setLoading(false);
            console.error("Payment error", err);
        }
    };



    return (
        <div className="border border-gray-200 p-6 rounded-2xl shadow-lg">
            {shippingMessage && (
                <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4">
                    {shippingMessage}
                </div>
            )}
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
                    <span>Coupon Applied </span> <span className="justify-end">-₹{discount}</span>
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
                <span>₹{taxAmount}</span>
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

                    <button   disabled={loading} onClick={handlePayment} className="axto-orange-btn w-full mt-3">
                        {loading ? "Processing..." : "Proceed to Buy"}
                    </button>
            )}
        </div>
    );
};

export default Summary;
