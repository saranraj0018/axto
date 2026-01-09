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
  title: string;
  price: number;
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
          className="grid grid-cols-12 gap-3 border border-gray-300 rounded-2xl p-4"
        >
          <div className="col-span-12 lg:col-span-9 flex gap-3">
            {/* Product Image */}
            <div className="w-1/3 md:w-auto ">
              <img
                  src={order.image}
                  alt={order.title}
                className="w-full md:w-30 h-auto md:h-30 object-cover rounded"
              />
            </div>

            {/* Product Details */}
            <div className="w-2/3">
              <div className="font-medium text-[11px] md:text-lg flex gap-1">
                <div className="scale-75 md:scale-100">{GreenOrderBoxIcon}</div>
                <div>{order.status}</div>
              </div>
              <div className="my-1 md:my-3">
                <h3 className="text-secondary text-[11px] md:text-[13px]">
                  ITEM CODE: {order.item_code}
                </h3>
                <p className="font-medium text-[10px] md:text-[13px]">
                  {order.title}
                </p>
              </div>
              <p className="font-semibold mt-1">₹{order.price}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="col-span-12 lg:col-span-3 my-auto">
            <div className="md:mt-2 flex justify-end lg:flex-col gap-2">

              <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/api/user/invoice/${order.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="axto-white-btn text-center block"
              >
                Download Invoice
              </a>
              <Link href={`/profile/orders-activity/view-order/${order.order_details_id}`} className="bg-white hover:bg-secondary text-secondary hover:text-white px-3 py-1 text-[10px] md:text-[15px] cursor-pointer rounded-3xl border border-secondary hover:border-white transition text-center"
              >
                  View Order
                </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderData;
