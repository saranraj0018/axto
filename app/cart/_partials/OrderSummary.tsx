// _partials/OrderSummary.tsx
"use client";
import Link from "next/link";
interface OrderSummaryProps {
  quantities: number[];
  cartItems: { sellingPrice: number }[];
}

const OrderSummary = ({ quantities, cartItems }: OrderSummaryProps) => {
  const subtotal = quantities.reduce(
    (sum, qty, i) => sum + cartItems[i].sellingPrice * qty,
    0
  );
  const shipping = 200;
  const taxes = subtotal * 0.1;
  const couponDiscount = subtotal * 0.1;
  const total = subtotal + shipping + taxes - couponDiscount;

  const totalItems = quantities.reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="border border-gray-200 p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <hr className="text-gray-300 border my-2" />
      <div className="flex justify-between mb-2">
        <span className="text-secondary">Total Items</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-secondary">Sub Total</span>
        <span>{subtotal}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-secondary">Shipping</span>
        <span>{shipping}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-secondary">Taxes (10%)</span>
        <span>{taxes.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-secondary">Coupon Discount (10%)</span>
        <span>-{couponDiscount.toFixed(2)}</span>
      </div>
      <hr className="text-gray-300 border my-2" />
      <div className="flex justify-between font-semibold text-lg mt-3">
        <span className="text-secondary">Total</span>
        <span>{total.toFixed(2)}</span>
      </div>
      <Link href="/cart/address">
      <button className="axto-orange-btn w-full mt-3">
        Proceed to checkout
        </button>
      </Link>
    </div>
  );
};

export default OrderSummary;
