"use client";

import { useState } from "react";
import Link from "next/link";
import StepLines from "../_partials/StepLines";
import ChangeAddress from "./_partials/ChangeAddress";
import { greenCircle } from "../../../components/all_icons";

const page = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Dummy data for the order summary
  const totalItems = 5;
  const subtotal = 799 + 799 + 799 + 799 + 8000; // sum of product prices
  const shipping = 200;
  const taxes = subtotal * 0.1; // 10% tax
  const couponDiscount = subtotal * 0.1; // 10% coupon discount
  const total = subtotal + shipping + taxes - couponDiscount;

  return (
    <>
      <StepLines />

      <div className="axto-container py-5">
        <div className="grid grid-cols-12 gap-8">
          {/* Delivery Address */}
          <div className="col-span-12 md:col-span-8 space-y-3">
            <h3 className="text-2xl font-medium">Delivery Address</h3>
            <div className="bg-[#f4f4f4] p-5 rounded-2xl relative">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-6 space-y-3">
                  <p className="text-sm font-medium">VasanthKumar S</p>
                  <p className="text-sm text-secondary">
                    No. 24, 2nd Floor, Green Park Avenue, Anna Nagar, Chennai -
                    600040, Tamil Nadu, India.
                  </p>
                  <p className="text-sm text-secondary">
                    Mobile:{" "}
                    <span className="font-medium text-black">
                      +91 9876543210
                    </span>
                  </p>
                  <button
                    className="border hover:border-white border-gray-300 text-sm font-medium py-1 px-2 rounded-md hover:bg-white transition"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Change Address
                  </button>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="flex gap-2">
                    <div className="my-auto">{greenCircle}</div>
                    <div>
                      <div className="font-medium text-sm">
                        Cash on delivery available
                      </div>
                    </div>
                  </div>
                  <div className="text-secondary text-sm">
                    Estimated Delivery Sep 22 - Sep 24
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-span-12 md:col-span-4">
            <div className="border border-gray-200 p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <hr className="text-gray-300 border my-2" />
              <div className="flex justify-between mb-2">
        <span className="text-sm lg:text-[15px] text-secondary">Total Items</span>
        <span className="text-sm lg:text-[15px]">{totalItems}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm lg:text-[15px] text-secondary">Sub Total</span>
        <span className="text-sm lg:text-[15px]">{subtotal}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm lg:text-[15px] text-secondary">Shipping</span>
        <span className="text-sm lg:text-[15px]">{shipping}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm lg:text-[15px] text-secondary">Taxes (10%)</span>
        <span className="text-sm lg:text-[15px]">{taxes.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm lg:text-[15px] text-secondary">Coupon Discount (10%)</span>
        <span className="text-sm lg:text-[15px]">-{couponDiscount.toFixed(2)}</span>
      </div>
      <hr className="text-gray-300 border my-2" />
      <div className="flex justify-between font-semibold text-lg mt-3">
        <span className="text-secondary">Total</span>
        <span>{total.toFixed(2)}</span>
      </div>
              <Link href="/cart/address">
                <button className="axto-orange-btn w-full mt-3">
                  Proceed to checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Change Address Popup */}
      <ChangeAddress
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};

export default page;
