"use client";

import { useEffect, useState } from "react";
import StepLines from "./_partials/StepLines";
import OrderSummary from "./_partials/OrderSummary";
import { refreshCart } from "@/lib/cartTotal";
import { PlusIcon, MinusIcon, closeIcon } from "@/components/all_icons";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

interface CartItem {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  attribute_name: string;
  variation: null | {
    id: string;
    name: string;
    price: number;
  };
}

const page = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [billSummary, setBillSummary] = useState<any>(null);
  const [shippingMessage, setShippingMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [couponLoading, setCouponLoading] = useState(false);
  const { fetchCartTotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponList, setCouponList] = useState<any[]>([]);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponId, setCouponId] = useState<number | null>(null);
  const [typingTimeout, setTypingTimeout] = useState<any>(null);
  const { token, isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();

  const fetchCouponId = async (code: string) => {
    if (!code) return;

    try {
      const token = localStorage.getItem("auth_token");
      const guestToken = localStorage.getItem("guest-token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/get/coupon-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(guestToken && { "guest-token": guestToken }),
          },
          body: JSON.stringify({
            coupon_code: code,
          }),
        },
      );

      const data = await res.json();

      if (data.status === 200) {
        setCouponId(data.coupon_id);
      } else {
        setCouponId(null);
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Coupon fetch failed", err);
    }
  };

  const removeCoupon = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const guestToken = localStorage.getItem("guest-token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/get/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(guestToken && { "guest-token": guestToken }),
          },
          body: JSON.stringify({
            coupon_id: "remove_coupon",
          }),
        },
      );

      const data = await res.json();

      if (data.status !== 200) {
        toast.error(data.message);
        return;
      }

      toast.success("Coupon removed");

      setCoupon("");
      setCouponId(null);

      fetchCart();
      fetchCartTotal();
    } catch (err) {
      console.error("Remove coupon failed", err);
    }
  };

  /* ============================
    FETCH CART DATA
 ============================ */
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const guestToken = localStorage.getItem("guest-token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/get/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(guestToken && {
              "guest-token": guestToken,
            }),
          },
        },
      );

      const data = await res.json();

      if (data.status === 200) {
        setCartItems(data.productData);
        setBillSummary(data.billSummary);
        setShippingMessage(data.shippingMessage);
      }
    } catch (err) {
      console.error("Cart fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const guestToken = localStorage.getItem("guest-token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/get/coupons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(guestToken && {
              "guest-token": guestToken,
            }),
          },
        },
      );

      const data = await res.json();
      if (data.status === 200) {
        setCouponList(data.data);
      }
    } catch (err) {
      console.error("Coupon fetch failed", err);
    }
  };

  useEffect(() => {
    fetchCart();
    refreshCart();
    fetchCoupons();
  }, []);

  const applyCoupon = async (id?: number) => {
    if (!token || !isAuthenticated) {
      openAuthModal();
      return;
    }

    const finalCouponId = id ?? couponId;
    if (!finalCouponId) {
      toast.error("Invalid coupon code");
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");
      const guestToken = localStorage.getItem("guest-token");
      setCouponLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/get/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(guestToken && {
              "guest-token": guestToken,
            }),
          },
          body: JSON.stringify({
            coupon_id: finalCouponId,
          }),
        },
      );

      const data = await res.json();

      if (data.status !== 200) {
        setShowCouponModal(false);
        toast.error(data.message);
        return;
      }

      toast.success("Coupon applied");

      fetchCart();
      setShowCouponModal(false);
      fetchCartTotal();
    } catch (err) {
      console.error("Apply coupon failed", err);
    } finally {
      setCouponLoading(false);
    }
  };

  /* ============================
    UPDATE QUANTITY
 ============================ */
  const updateQuantity = async (index: number, type: "inc" | "dec") => {
    const item = cartItems[index];

    // 🔑 SEND ONLY DELTA
    const deltaQty = type === "inc" ? 1 : -1;

    // Prevent going below 1
    if (type === "dec" && item.quantity <= 1) return;

    try {
      const token = localStorage.getItem("auth_token");
      const guestToken = localStorage.getItem("guest-token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(guestToken && {
              "guest-token": guestToken,
            }),
          },
          body: JSON.stringify({
            product_id: item.id,
            variant_id: item.variation?.id ?? 0,
            quantity: deltaQty, // ✅ ONLY +1 or -1
          }),
        },
      );
      if (res.status === 422 || res.status === 400) {
        const data = await res.json();

        toast.error(data?.message ?? "Unable to add to cart");
        return false;
      }
      await fetchCartTotal();
      fetchCart();
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
      const guestToken = localStorage.getItem("guest-token");

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(guestToken && {
            "guest-token": guestToken,
          }),
        },
        body: JSON.stringify({
          product_id: item.id,
          variant_id: item.variation?.id ?? 0,
        }),
      });
      fetchCart();
      refreshCart();
      await fetchCartTotal();
    } catch (err) {
      console.error("Remove item failed", err);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  if (!loading && cartItems.length === 0) {
    return (
      <>
        <StepLines />
        <div className="axto-container py-16 text-center">
          <img
            src="/img/cart-empty.webp" // 👈 put your image path here
            alt="Cart Empty"
            className="mx-auto w-64 mb-6"
          />

          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>

          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything yet.
          </p>

          <Link href="/shop">
            <button className="axto-orange-btn px-8">Continue Shopping</button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <StepLines />

      <div className="axto-container py-10">
        <div className="grid grid-cols-12 gap-3 md:gap-8">
          {/* LEFT SECTION */}
          <div className="col-span-12 md:col-span-6 lg:col-span-8">
            {/* DESKTOP VIEW - TABLE */}
            <div className="hidden lg:block w-full overflow-x-auto rounded-2xl border border-gray-200">
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
                        ₹{item.discountedPrice / item.quantity}
                      </td>

                      <td className="p-2">
                        <div className="flex gap-2 items-center bg-[#EDF0F4] rounded-full p-3 w-max">
                          <button
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 flex justify-center items-center rounded-full bg-white disabled:opacity-50"
                            onClick={() => updateQuantity(index, "dec")}
                          >
                            {MinusIcon}
                          </button>

                          <span className="px-2">{item.quantity}</span>

                          <button
                            className="h-8 w-8 flex justify-center items-center rounded-full bg-white"
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

            {/* MOBILE VIEW - CARDS */}
            <div className="block lg:hidden">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.variation?.id ?? "default"}`}
                    className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex gap-4">
                      {/* Product */}
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      <div className="flex-1 min-w-0 my-auto">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            {closeIcon}
                          </button>
                        </div>

                        {item.variation && (
                          <div className="text-xs text-gray-500 mt-1">
                            {item.attribute_name}: {item.variation.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {/* Price & Quantity */}
                      <div className="space-y-1 w-1/3">
                        <div className="text-[11px] text-gray-500 uppercase tracking-wider">
                          Price
                        </div>
                        <div className="text-sm font-semibold">
                          ₹
                          {(
                            item.discountedPrice / item.quantity
                          ).toLocaleString()}
                        </div>
                      </div>

                      <div className="space-y-1 w-2/3">
                        <div className="text-[11px] text-gray-500 uppercase tracking-wider">
                          Quantity
                        </div>
                        <div className="flex items-center bg-gray-100 rounded-lg p-0.5 w-max">
                          <button
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 hover:bg-gray-200 rounded disabled:opacity-30"
                            onClick={() => updateQuantity(index, "dec")}
                          >
                            {MinusIcon}
                          </button>
                          <span className="px-3 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="px-2 py-1 hover:bg-gray-200 rounded"
                            onClick={() => updateQuantity(index, "inc")}
                          >
                            {PlusIcon}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[11px] text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </div>
                        <div className="text-base font-bold text-orange-600">
                          ₹{item.discountedPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/shop">
              <button className="axto-orange-btn w-full md:w-1/4 mt-3 mb-6 md:mb-0">
                Continue To Shop
              </button>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            {/* COUPON BOX */}

            <div className="bg-white border rounded-xl p-4 mb-4">
              <h3 className="font-semibold mb-3">Apply Coupon</h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCoupon(value);

                    if (typingTimeout) {
                      clearTimeout(typingTimeout);
                    }

                    const timeout = setTimeout(() => {
                      fetchCouponId(value);
                    }, 500); // wait 500ms after typing stops

                    setTypingTimeout(timeout);
                  }}
                  className="border rounded-lg px-3 py-2 w-full"
                />

                <button
                  disabled={couponLoading}
                  onClick={() => applyCoupon()}
                  className="axto-orange-btn px-4"
                >
                  {couponLoading ? "Applying..." : "Apply"}
                </button>
              </div>
            </div>

            {/* AVAILABLE COUPONS */}

            <div>
              <div
                onClick={() => setShowCouponModal(true)}
                className="border rounded-lg p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              >
                <span className="text-sm font-medium">
                  View Available Coupons
                </span>

                <span className="text-orange-500 text-sm">
                  {couponList.length} Available
                </span>
              </div>

              {showCouponModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                  <div className="bg-white w-[95%] md:w-[450px] rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-lg">
                        Available Coupons
                      </h3>

                      <button
                        onClick={() => setShowCouponModal(false)}
                        className="text-gray-500"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto">
                      {couponList.map((c) => (
                        <div
                          key={c.id}
                          className="border rounded-lg p-3 flex justify-between items-center"
                        >
                          <div>
                            <div className="font-semibold text-sm">
                              {c.coupon_code}
                            </div>

                            <div className="text-xs text-gray-500">
                              {c.description}
                            </div>
                          </div>

                          {c.coupon_status ? (
                            <button
                              type="button"
                              className="axto-orange-btn px-3 py-1 text-sm "
                              disabled={couponLoading}
                              onClick={() => applyCoupon(c.id)}
                            >
                              {couponLoading ? "Applying..." : "Apply"}
                            </button>
                          ) : (
                            <span className="text-xs text-red-500">
                              {c.apply_for == "1"
                                ? `Valid for subtotal between ₹${c.min_price} - ₹${c.max_price}`
                                : `Valid after ${c.order_count} orders`}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4">
              <OrderSummary
                billSummary={billSummary}
                removeCoupon={removeCoupon}
                shippingMessage={shippingMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
