"use client";
import React from "react";
import { GreenOrderBoxIcon } from "../../../../components/all_icons";

const Order_ActivitiesData = [
  {
    status: "Order Delivered Mon, 3rd Nov '25",
    img: "/img/home/P1.png",
    ItemCode: "OLA000040",
    ProductTitle: "ROADWAY Retro Square, Wayfarer, Sports Sunglasses",
    Price: 799,
    DownloadInvoice: "#",
    ViewOrderCTA: "/profile/orders-activity/view-order",
    trackOrder: "",
  },
  {
    status: "Order Shipped Tue, 4th Nov '25",
    img: "/img/home/P1.png",
    ItemCode: "OLA000041",
    ProductTitle: "ROADWAY Classic Aviator Sunglasses",
    Price: 699,
    DownloadInvoice: "",
    ViewOrderCTA: "",
    trackOrder: "/profile/orders-activity/track-order",
  },
  {
    status: "Order Pending Wed, 5th Nov '25",
    img: "/img/home/P1.png",
    ItemCode: "OLA000042",
    ProductTitle: "ROADWAY Sports Wrap Sunglasses",
    Price: 599,
    DownloadInvoice: "",
    ViewOrderCTA: "",
    trackOrder: "/profile/orders-activity/track-order",
  },
];

const OrderData: React.FC = () => {
  return (
    <div className="space-y-6">
      {Order_ActivitiesData.map((order, idx) => (
        <div
          key={idx}
          className="grid grid-cols-12 gap-3 border border-gray-300 rounded-2xl p-4"
        >
          <div className="col-span-12 lg:col-span-9 flex gap-3">
            {/* Product Image */}
            <div className="w-1/3 md:w-auto ">
              <img
                src={order.img}
                alt={order.ProductTitle}
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
                  ITEM CODE: {order.ItemCode}
                </h3>
                <p className="font-medium text-[10px] md:text-[13px]">
                  {order.ProductTitle}
                </p>
              </div>
              <p className="font-semibold mt-1">₹{order.Price}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="col-span-12 lg:col-span-3 my-auto">
            <div className="md:mt-2 flex justify-end lg:flex-col gap-2">
              {order.DownloadInvoice && (
                <a
                  href={order.DownloadInvoice}
                  className="axto-white-btn text-center"
                >
                  Download Invoice
                </a>
              )}
              {order.ViewOrderCTA && (
                <a
                  href={order.ViewOrderCTA}
                  className="bg-white hover:bg-secondary text-secondary hover:text-white px-3 py-1 text-[10px] md:text-[15px] cursor-pointer rounded-3xl border border-secondary hover:border-white transition text-center"
                >
                  View Order
                </a>
              )}
              {order.trackOrder && (
                <a
                  href={order.trackOrder}
                  className="axto-white-btn text-center"
                >
                  Track Order
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderData;
