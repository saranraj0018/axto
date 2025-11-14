// page.tsx

"use client";
import { useState } from "react";
import StepLines from "./_partials/StepLines";
import OrderSummary from "./_partials/OrderSummary";
import { PlusIcon, MinusIcon, closeIcon } from "../../components/all_icons";

const CartItems = [
  {
    id: 1,
    title: "Backrest Support..",
    itemCode: "OLA000040",
    img: "/img/home/P1.png",
    sellingPrice: 799,
  },
  {
    id: 2,
    title: "Cushion Backrest Support..",
    itemCode: "OLA000041",
    img: "/img/home/P1.png",
    sellingPrice: 799,
  },
  {
    id: 3,
    title: "Break Wire",
    itemCode: "OLA000042",
    img: "/img/home/P1.png",
    sellingPrice: 799,
  },
  {
    id: 4,
    title: "EV Battery",
    itemCode: "OLA000043",
    img: "/img/home/P1.png",
    sellingPrice: 799,
  },
  {
    id: 5,
    title: "Car Battery",
    itemCode: "OLA000043",
    img: "/img/home/P1.png",
    sellingPrice: 8000,
  },
];

const page = () => {
  const [quantities, setQuantities] = useState(() => CartItems.map(() => 1));

  const updateQuantity = (index: number, value: number) => {
    setQuantities((prev) =>
      prev.map((q, i) => (i === index ? Math.max(q + value, 0) : q))
    );
  };
  return (
    <>
      <StepLines />
      <div className="axto-container py-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <table className="w-full overflow-hidden rounded-2xl border-gray-200 ">
              <thead className="bg-[#F4F4F4]">
                <tr>
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {CartItems.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="p-2 flex items-center gap-3">
                      <button className="text-red-500 ml-2">{closeIcon}</button>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-12 h-12 object-contain"
                      />
                      <div>
                        <div className="font-medium flex justify-between items-center">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.itemCode}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{item.sellingPrice}</td>
                    <td className="p-2">
                      <div className="flex gap-2 items-center bg-[#EDF0F4] rounded-full p-1 w-max">
                        <button
                          className="h-8 w-8 rounded-full bg-white hover:bg-gray-200 flex justify-center items-center"
                          onClick={() => updateQuantity(index, -1)}
                        >
                          {MinusIcon}
                        </button>
                        <span className="px-2">{quantities[index]}</span>
                        <button
                          className="h-8 w-8 rounded-full bg-white hover:bg-gray-200 flex justify-center items-center"
                          onClick={() => updateQuantity(index, 1)}
                        >
                          {PlusIcon}
                        </button>
                      </div>
                    </td>
                    <td className="p-2 font-medium">
                      {item.sellingPrice * quantities[index]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-span-12 md:col-span-4">
            <OrderSummary quantities={quantities} cartItems={CartItems} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
