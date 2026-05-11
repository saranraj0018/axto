"use client";
import React, { useEffect, useState } from "react";
import { GreenOrderBoxIcon } from "@/components/all_icons";
import Link from "next/link";

type Order = {
  id: number;
  order_id: string;
  order_details_id: string;
  status: string;
  image: string;
  item_code: string;
  created_at: string;
  title: string;
  price: number;
  track_id:string;
  courier:string;
  invoice_url?: string;
  view_order_url?: string;
};

const OrderData: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/orders/list`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
              },
            }
        );

        const json = await res.json();
        setOrders(json.data || []);
      } catch (error) {
        console.error("Order fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center">Loading orders...</p>;
  }
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-200 rounded-2xl p-3 md:p-5 bg-white"
        >
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {/* Left Content */}
            <div className="flex gap-4 items-start w-full lg:w-full">
              {/* Product Image */}
              <div className="w-[20%] h-[80%] min-w-[110px] flex items-start">
                <img
                  src={order.image}
                  alt={order.title}
                  className="w-full h-full max-h-[170px] object-cover rounded-xl"
                />
              </div>

              {/* Details */}
              <div className="w-[80%] flex flex-col">
                {/* Top */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] md:text-[13px] text-gray-500">
                      ITEM CODE: {order.item_code}
                    </span>

                    <span className="text-[11px] md:text-[13px] text-[#FF6A00] font-semibold">
                      Order #: {order.order_id}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-[13px] md:text-[16px] font-semibold mt-1">
                    <div className="scale-75 md:scale-100">
                      {GreenOrderBoxIcon}
                    </div>

                    <span>{order.status}</span>
                  </div>

                  <div className="text-[11px] md:text-[13px] text-gray-500">
                    Order placed:
                  </div>

                  <h3 className="text-[13px] md:text-[17px] font-medium text-black line-clamp-2 mb-2">
                    {order.title}
                  </h3>
                </div>

                {/* Price */}
                <div className="text-[18px] md:text-[22px] font-bold text-black mb-2">
                  ₹{order.price}
                </div>

                {/* Track */}
                <span className="text-[11px] md:text-[13px] text-gray-500">
                  Track ID: {order.track_id}
                </span>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <h3 className="text-secondary text-[11px] md:text-[13px]">
                    Courier Name: {order.courier}
                  </h3>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-2 md:justify-end">
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}/api/user/invoice/${order.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-white transition text-[12px] md:text-[14px] font-medium"
                    >
                      Download Invoice
                    </a>

                    <Link
                      href={`/profile/orders-activity/view-order/${order.order_details_id}`}
                      className="px-4 py-2 rounded-full bg-secondary text-white hover:opacity-90 transition text-[12px] md:text-[14px] font-medium text-center"
                    >
                      View Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderData;
