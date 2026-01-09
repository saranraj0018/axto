"use client";
import { useEffect, useState } from "react";

type Delivery = {
  name: string;
  address: string;
  phone: string;
};

type PriceDetails = {
  total_items: number;
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
  payment_method: string;
};

type OrderSummaryData = {
  delivery: Delivery;
  price: PriceDetails;
};

const OrderSummary = ({ orderId }: { orderId: string }) => {
  const [data, setData] = useState<OrderSummaryData | null>(null);

  useEffect(() => {
    fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/order/summary/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
    )
        .then((res) => res.json())
        .then((res) => setData(res.data));
  }, [orderId]);

  if (!data) return null;
  return (
      <>
        <div className="space-y-3">
          <div className="border border-gray-300 p-5 rounded-2xl space-y-3">
            <h2 className="text-md font-medium">Delievery Details</h2>
            <hr className="text-gray-300" />
            <div className="space-y-3">
              <p className="font-medium text-[15px]">
                {data.delivery.name}
              </p>
              <p className="text-secondary text-sm">
                {data.delivery.address}
              </p>
              <p className="text-secondary text-sm">
                Mobile :
                <span className="text-black font-medium">
              {" "}{data.delivery.phone}
            </span>
              </p>
            </div>
          </div>

          <div className="border border-gray-300 p-5 rounded-2xl space-y-3">
            <h2 className="text-md font-medium">Price Details</h2>
            <hr className="text-gray-300" />
            <div className="flex justify-between mb-2">
              <span className="text-secondary">Total Items</span>
              <span>{data.price.total_items}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-secondary">Sub Total</span>
              <span>₹{data.price.subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-secondary">Shipping</span>
              <span>₹{data.price.shipping}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-secondary">Taxes (%)</span>
              <span>₹{data.price.taxes}</span>
            </div>
            <hr className="text-gray-300 border my-2" />
            <div className="flex justify-between font-semibold text-[15px] mt-3">
              <span className="text-secondary">Total</span>
              <span>₹{data.price.total}</span>
            </div>
          </div>
        </div>
      </>
  );
};

export default OrderSummary;
