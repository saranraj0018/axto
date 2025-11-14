"use client";

import CommonBanner from "../../../components/others/CommonBanners";
import {
  CartPage_OrangeCartIcon,
  CartPage_OrangeLocationIcon,
  CartPage_LocationIcon,
  CartPagePaymentIcon,
  CartPageSuccessIcon,
} from "../../../components/all_icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StepLines = () => {
  const pathname = usePathname();

  const steps = [
    {
      id: 1,
      label: "Cart",
      path: "/cart",
      icon: pathname.startsWith("/cart")
        ? CartPage_OrangeCartIcon
        : CartPage_OrangeCartIcon, // always orange on /cart pages
    },
    {
      id: 2,
      label: "Address",
      path: "/cart/address",
      icon:
        pathname === "/cart/address" || pathname.startsWith("/cart/address")
          ? CartPage_OrangeLocationIcon
          : CartPage_LocationIcon,
    },
    {
      id: 3,
      label: "Payment",
      path: "#",
      icon: CartPagePaymentIcon,
    },
    {
      id: 4,
      label: "Success",
      path: "#",
      icon: CartPageSuccessIcon,
    },
  ];

  return (
    <>
      <CommonBanner />
      <div className="axto-container py-10 md:w-full lg:w-2/3 mx-auto">
        <div className="grid grid-cols-18 gap-3">
          {steps.map((step, index) => (
            <>
              <div
                key={step.id}
                className="col-span-18 md:col-span-3 flex md:justify-center gap-5 md:gap-3"
              >
                <Link
                  href={step.path}
                  className="flex md:justify-center gap-5 md:gap-3"
                >
                  <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
                    {step.icon}
                  </div>
                  <div className="my-auto text-md font-medium">
                    {step.label}
                  </div>
                </Link>
              </div>

              {/* Line between steps (skip last) */}
              {index !== steps.length - 1 && (
                <div className="col-span-18 md:col-span-2 my-auto text-gray-200 border-[0.5px] hidden md:block">
                  <hr />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default StepLines;
