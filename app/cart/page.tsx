"use client";

import { useEffect, useState } from "react";
import StepLines from "./_partials/StepLines";
import OrderSummary from "./_partials/OrderSummary";
import { refreshCart } from "@/lib/cartTotal";
import { PlusIcon, MinusIcon, closeIcon } from "@/components/all_icons";
import Link from "next/link";
import toast from "react-hot-toast";

interface CartItem {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  attribute_name:string;
  variation: null | {
    id: string;
    name: string;
    price: number;
  };
}


const page = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [billSummary, setBillSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  /* ============================
    FETCH CART DATA
 ============================ */
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/get/cart`,
          {
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            },
          }
      );

      const data = await res.json();

      if (data.status === 200) {
        setCartItems(data.productData);
        setBillSummary(data.billSummary);
      }
    } catch (err) {
      console.error("Cart fetch failed", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCart();
    refreshCart();
  }, []);

  /* ============================
    UPDATE QUANTITY
 ============================ */
  const updateQuantity = async (
      index: number,
      type: "inc" | "dec"
  ) => {
    const item = cartItems[index];

    // 🔑 SEND ONLY DELTA
    const deltaQty = type === "inc" ? 1 : -1;

    // Prevent going below 1
    if (type === "dec" && item.quantity <= 1) return;

    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/cart/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              product_id: item.id,
              variant_id: item.variation?.id ?? 0,
              quantity: deltaQty, // ✅ ONLY +1 or -1
            }),
          }
      );
      if (res.status === 422 || res.status === 400) {
        const data = await res.json();
        console.log("Error data:", data);
        toast.error(data?.message ?? "Unable to add to cart");
        return false;
      }
      fetchCart(); // re-sync from backend
      refreshCart();
    } catch (err) {
      console.error("Update quantity failed", err);
    }
  };


  /* ============================
     REMOVE ITEM
  ============================ */
  const removeItem = async (item: CartItem) => {
    try {
      const token = localStorage.getItem("auth_token");

      await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/cart/remove`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              product_id: item.id,
              variant_id: item.variation?.id ?? 0,
            }),
          }
      );

      fetchCart();
      refreshCart();
    } catch (err) {
      console.error("Remove item failed", err);
    }
  };


  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <>
      <StepLines />

      <div className="axto-container py-10">
        <div className="grid grid-cols-12 gap-3 md:gap-8">
          {/* LEFT SECTION */}
          <div className="col-span-12 md:col-span-8">

            {/* RESPONSIVE WRAPPER */}
            <div className="w-full overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full min-w-[750px]">
                <thead className="bg-[#F4F4F4]">
                  <tr>
                    <th className="p-2 text-left">Product</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                {cartItems.map((item, index) => (
                    <tr
                        key={`${item.id}-${item.variation?.id ?? "default"}`}
                        className="border-b border-gray-200"
                    >
                      <td className="p-2 flex items-center gap-3 min-w-[240px]">
                        <button
                            className="text-red-500 ml-2"
                            onClick={() => removeItem(item)}
                        >
                          {closeIcon}
                        </button>

                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-contain"
                        />

                        <div>
                          <div className="text-[12px] md:text-[16px] font-medium">
                            {item.name}
                          </div>
                          {item.variation && (
                              <div className="text-xs text-gray-500">
                                {item.attribute_name}: {item.variation.name}
                              </div>
                          )}
                        </div>
                      </td>

                      <td className="p-2">
                        ₹{item.discountedPrice /  item.quantity}
                      </td>

                      <td className="p-2">
                        <div className="flex gap-2 items-center bg-[#EDF0F4] rounded-full p-3 w-max">
                          <button
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 rounded-full flex justify-center items-center bg-white disabled:opacity-50"
                              onClick={() => updateQuantity(index, "dec")}
                          >
                            {MinusIcon}
                          </button>

                          <span className="px-2">{item.quantity}</span>

                          <button
                              className="h-8 w-8 rounded-full flex justify-center items-center bg-white"
                              onClick={() => updateQuantity(index, "inc")}
                          >
                            {PlusIcon}
                          </button>
                        </div>
                      </td>

                      <td className="p-2 font-medium">
                        ₹{item.discountedPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
            <Link href="/shop">
              <button className="axto-orange-btn w-1/4 mt-3">
               Continue To Shop
              </button>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 md:col-span-4">
            <OrderSummary billSummary={billSummary} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
