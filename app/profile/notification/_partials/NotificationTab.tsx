"use client";
import { useState } from "react";
import All from "./All";
import Unread from "./Unread";
import {
  OrderSuccessfullIcon,
  OrderDelieveryIcon,
  OrderConfirmedIcon,
  OrderRejectedIcon,
  OrderPendingIcon,
  OrderReturnedIcon,
} from "../../../../components/all_icons";

const getIcon = (title: string) => {
  if (title.includes("Delivered")) return OrderSuccessfullIcon;
  if (title.includes("Out for Delivery")) return OrderDelieveryIcon;
  if (title.includes("Confirmed")) return OrderConfirmedIcon;
  if (title.includes("Returned")) return OrderReturnedIcon;
  if (title.includes("Rejected")) return OrderRejectedIcon;
  if (title.includes("Pending")) return OrderPendingIcon;

  // fallback icon
  return OrderDelieveryIcon;
};

const NotificationData = [
  {
    icon: getIcon("Order Delivered Successfully"),
    Title: "Order Delivered Successfully",
    Description:
      "Your order #ORD-2024-1234 has been delivered. We hope you enjoy your new EV accessories!",
    Duration: "2 hours ago",
    Status: "Unread",
  },
  {
    icon: getIcon("Order Out for Delivery"),
    Title: "Order Out for Delivery",
    Description:
      "Your order #ORD-2024-1235 is out for delivery and will reach you today.",
    Duration: "5 hours ago",
    Status: "Unread",
  },
  {
    icon: getIcon("Your Order is Confirmed"),
    Title: "Your Order is Confirmed",
    Description:
      "Your order #ORD-2024-1236 has been confirmed and is being processed.",
    Duration: "1 Day ago",
    Status: "Read",
  },
  {
    icon: getIcon("Your Order Got Rejected"),
    Title: "Your Order Got Rejected",
    Description:
      "Your order #ORD-2024-1237 has been confirmed and is being processed.",
    Duration: "2 hours ago",
    Status: "Read",
  },
  {
    icon: getIcon("Your Order is Pending"),
    Title: "Your Order is Pending",
    Description:
      "Your order #ORD-2024-1237 has been confirmed and is being processed.",
    Duration: "2 hours ago",
    Status: "Read",
  },
  {
    icon: getIcon("Your Order is Returned"),
    Title: "Your Order is Returned",
    Description:
      "Your order #ORD-2024-1237 has been confirmed and is being processed.",
    Duration: "2 hours ago",
    Status: "Read",
  },
];

const NotificationTab = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Filter unread notifications
  const unreadNotifications = NotificationData.filter(
    (item) => item.Status === "Unread"
  );

  return (
    <div>
      <div>
        <div className="flex gap-1 mb-4 w-max bg-[#F5F5F5] p-1 rounded-3xl">
          <button
            className={`px-3.5 py-1 font-medium text-sm md:text-[15px] transition ${
              activeTab === 0
                ? "bg-white rounded-3xl"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(0)}
          >
            All
          </button>

          <button
            className={`px-3.5 py-1 font-medium text-sm md:text-[15px] transition ${
              activeTab === 1
                ? "bg-white rounded-3xl"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(1)}
          >
            Unread
          </button>
        </div>

        <div className="text-sm md:text-base text-gray-700">
          {activeTab === 0 && <All NotificationData={NotificationData} />}

          {activeTab === 1 && <Unread NotificationData={unreadNotifications} />}
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;
