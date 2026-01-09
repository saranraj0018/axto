"use client";

import {usePathname, useRouter} from "next/navigation";
import {
  Black_ProfileIcon,
  White_ProfileIcon,
  Black_OrderIcon,
  White_OrderIcon,
  Black_WishListIcon,
  White_WishListIcon,
  Black_LocationIcon,
  White_LocationIcon,
  Black_BellIcon,
  White_BellIcon,
  Black_SupportIcon,
  White_SupportIcon,
  logoutIcon,
} from "@/components/all_icons";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const Sideitems = [
    {
      id: 1,
      label: "Profile",
      path: "/profile",
      // FIXED: exact match only
      icon: pathname === "/profile" ? White_ProfileIcon : Black_ProfileIcon,
      matchType: "exact",
    },
    {
      id: 2,
      label: "Orders & Activity",
      path: "/profile/orders-activity",
      icon: pathname.startsWith("/profile/orders-activity")
        ? Black_OrderIcon
        : White_OrderIcon,
      matchType: "starts",
    },
    {
      id: 3,
      label: "Wishlist",
      path: "/profile/wishlist",
      icon: pathname.startsWith("/profile/wishlist")
        ? Black_WishListIcon
        : White_WishListIcon,
      matchType: "starts",
    },
    {
      id: 4,
      label: "Manage Address",
      path: "/profile/manage-address",
      icon: pathname.startsWith("/profile/manage-address")
        ? Black_LocationIcon
        : White_LocationIcon,
      matchType: "starts",
    },
    // {
    //   id: 5,
    //   label: "Notification",
    //   path: "/profile/notification",
    //   icon: pathname.startsWith("/profile/notification")
    //     ? Black_BellIcon
    //     : White_BellIcon,
    //   matchType: "starts",
    // },
    {
      id: 6,
      label: "Raise a Ticket",
      path: "/profile/raise-a-ticket",
      icon: pathname.startsWith("/profile/raise-a-ticket")
        ? Black_SupportIcon
        : White_SupportIcon,
      matchType: "starts",
    },
  ];

  return (
    <>
      <div className="space-y-5">
        <div className="flex gap-2">
          <img src={user?.image || "/img/profile/Male-Avatar.png"} alt="" className="w-20 h-20 rounded-full object-cover" />
          <div className="my-auto">
            <h4 className="font-medium text-lg">{user?.name}</h4>
            <p className="text-sm text-secondary">{user?.email}</p>
          </div>
        </div>

        <div>
          {Sideitems.map((items) => {
            let isActive =
              items.matchType === "exact"
                ? pathname === items.path
                : pathname.startsWith(items.path);

            return (
              <div key={items.id}>
                <div
                  className={`my-1 lg:my-2 p-0.5 lg:p-2 rounded-full w-4/5 lg:w-full ${
                    isActive ? "bg-primary" : "bg-white"
                  }`}
                >
                  <Link href={items.path} className="flex gap-2">
                    <div className="rounded-full py-1 px-2 scale-75 lg:scale-100">
                      {items.icon}
                    </div>

                    <div
                      className={`my-auto text-[12px] lg:text-[15px] font-medium ${
                        isActive ? "text-white" : "text-black"
                      }`}
                    >
                      {items.label}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
          <div className="my-1 lg:my-2 p-0.5 lg:p-2 rounded-full">
            <div
                onClick={handleLogout}
                className="flex gap-2 cursor-pointer"
            >
              <div className="rounded-full scale-75 lg:scale-100 py-1 px-2">
                {logoutIcon}
              </div>

              <div className="my-auto text-[12px] lg:text-[15px] lg:text-md font-medium text-[#ec221f]">
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
