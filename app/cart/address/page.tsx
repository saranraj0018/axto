"use client";

import { useEffect, useState } from "react";
import StepLines from "../_partials/StepLines";
import ChangeAddress from "./_partials/ChangeAddress";
import OrderSummary from "@/app/cart/address/_partials/Summary";
import {refreshCart} from "@/lib/cartTotal";

type Address = {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    phone_number: string;
    set_default: number;
};

type BillSummary = {
    totalItems: number;
    itemsAmount: number;
    deliveryCharge: number;
    SGST: string;
    IGST: string;
    platformFee: number;
    totalAmount: string;
};


const page = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [billSummary, setBillSummary] = useState<BillSummary | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [editAddress, setEditAddress] = useState<Address | null>(null);



    /* ---------------- Fetch Address ---------------- */

    const fetchAddress = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) return;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/address/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await res.json();

            if (result.data?.length) {
                setAddresses(result.data);

                // ⭐ auto-select default OR first
                const defaultAddr =
                    result.data.find((a: Address) => a.set_default === 1) ||
                    result.data[0];

                setSelectedAddress(defaultAddr);
            } else {
                setAddresses([]);
                setSelectedAddress(null);
            }
        } catch (e) {
            console.error(e);
        }
    };


    const fetchBillSummary = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) return;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/get/cart`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (data.status === 200 && data.billSummary) {
                setBillSummary(data.billSummary);
            }
        } catch (err) {
            console.error("Bill summary fetch failed", err);
        }
    };


    useEffect(() => {
        fetchAddress();
        fetchBillSummary();
        refreshCart();
    }, []);

    return (
        <>
            <StepLines />

            <div className="axto-container py-5">
                <div className="grid grid-cols-12 gap-8">
                    {/* Delivery Address */}
                    <div className="col-span-12 md:col-span-8 space-y-3">
                        <h3 className="text-2xl font-medium">Delivery Address</h3>
                        <div className="bg-[#f4f4f4] p-5 rounded-2xl space-y-4">

                            {addresses.length === 0 && (
                                <p className="text-sm text-secondary">No delivery address found</p>
                            )}

                            {addresses.map((addr) => (
                                <label
                                    key={addr.id}
                                    className="flex gap-3 bg-white p-4 rounded-xl cursor-pointer border"
                                >
                                    <input
                                        type="radio"
                                        name="delivery_address"
                                        checked={selectedAddress?.id === addr.id}
                                        onChange={() => setSelectedAddress(addr)}
                                        className="accent-orange-500 mt-1"
                                    />

                                    <div className="space-y-1">
                                        <div className="flex gap-2 items-center">
                                            <p className="font-medium text-sm">{addr.name}</p>

                                            {addr.set_default === 1 && (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 rounded-full">
              Default
            </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-secondary">+91 {addr.phone_number}</p>
                                        <p className="text-sm text-secondary">{addr.address}</p>
                                        <p className="text-sm text-secondary">
                                            {addr.city}, {addr.state} - {addr.pincode}
                                        </p>


                                    </div>
                                    {/* EDIT BUTTON */}
                                    <button
                                        type="button"
                                        className="text-sm text-orange-500 font-medium"
                                        onClick={() => {
                                            setEditAddress({
                                                id: addr.id,
                                                name: addr.name,
                                                phone_number: addr.phone_number,
                                                city: addr.city,
                                                state: addr.state,
                                                country: addr.country,
                                                pincode: addr.pincode,
                                                address: addr.address,
                                                set_default: addr.set_default
                                            });
                                            setIsPopupOpen(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </label>
                            ))}

                            <button
                                onClick={() => {
                                    setEditAddress(null); // ADD MODE
                                    setIsPopupOpen(true);
                                }}
                                className="border border-gray-300 text-sm font-medium py-1 px-3 rounded-md"
                            >
                                Change / Add Address
                            </button>

                        </div>

                    </div>

                    {/* Order Summary */}
                    <div className="col-span-12 md:col-span-4">
                        <OrderSummary
                            billSummary={billSummary}
                            addressId={selectedAddress?.id ?? null}
                        />
                    </div>
                </div>
            </div>

            {/* Change Address Popup */}
            <ChangeAddress
                isOpen={isPopupOpen}
                addressData={editAddress}
                onClose={() => setIsPopupOpen(false)}
                onSaved={() => {
                    fetchAddress();
                    setIsPopupOpen(false);
                }}
            />


        </>
    );
};

export default page;
