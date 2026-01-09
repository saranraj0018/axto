"use client";
import { useEffect, useState } from "react";
import { GreenOrderBoxIcon } from "@/components/all_icons";

type OrderItem = {
  product_name: string;
  price: number;
  image: string;
};

type OrderData = {
  status_text: string;
  order_code: string;
  item: OrderItem;
};


const ProductData = ({ orderId }: { orderId: string }) => {
  const [data, setData] = useState<OrderData | null>(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/order/details/${orderId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
        .then((res) => res.json())
        .then((res) => setData(res.data));
  }, [orderId]);

  if (!data) return null;

  return (
    <>
      <div className="flex gap-5">
        <div className="w-1/3 md:w-auto">
          <img
              src={data.item.image}
              alt={data.item.product_name}
              className="w-full md:w-40 h-auto md:h-40 object-cover my-auto p-2 bg-[#F4F4F4] rounded-xl"
          />
        </div>

        <div className="w-2/3 my-auto">
          <div className="font-medium text-[12px] md:text-lg flex gap-1">
            <div className="scale-75 md:scale-100">{GreenOrderBoxIcon}</div>
            <div>{data.status_text}</div>
          </div>
          <div className="my-1 md:my-3">   
            <h3 className="text-secondary text-[11px] md:text-[13px]">
              ITEM CODE : {data.order_code}
            </h3>
            <p className="font-medium text-[10px] md:text-[13px]">
              {data.item.product_name}
            </p>
          </div>
          <p className="font-semibold mt-1">₹{data.item.price}</p>
        </div>
      </div>
    </>
  );
};

export default ProductData;
