const DelieveryDetails = [
  {
    Name: "VasanthKumar S",
    Address:
      "No. 24, 2nd Floor, Green Park Avenue, Anna Nagar, Chennai – 600040, Tamil Nadu, India.",
    Mobile: "+91 9876543210",
  },
];

// Dummy data for the order summary
const totalItems = 5;
const subtotal = 799 + 799 + 799 + 799 + 8000; // sum of product prices
const shipping = 200;
const taxes = subtotal * 0.1; // 10% tax
const couponDiscount = subtotal * 0.1; // 10% coupon discount
const total = subtotal + shipping + taxes - couponDiscount;

const OrderSummary = () => {
  return (
    <>
      <div className="space-y-3">
        <div className="border border-gray-300 p-5 rounded-2xl space-y-3">
          <h2 className="text-md font-medium">Delievery Details</h2>
          <hr className="text-gray-300" />
          {DelieveryDetails.map((data, index) => (
            <div key={index} className="space-y-3">
              <p className="font-medium text-[15px]">{data.Name}</p>
              <p className="text-secondary text-sm">{data.Address}</p>
              <p className="text-secondary text-sm">
                Mobile :{" "}
                <span className="text-black font-medium">{data.Mobile}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="border border-gray-300 p-5 rounded-2xl space-y-3">
          <h2 className="text-md font-medium">Price Details</h2>
          <hr className="text-gray-300" />
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
          <div className="flex justify-between font-semibold text-[15px] mt-3">
            <span className="text-secondary">Total</span>
            <span>{total.toFixed(2)}</span>
          </div>
          <div className="bg-[#F4F4F4] p-2 rounded-md">
            <div className="flex justify-between font-semibold text-[15px]">
              <span className="text-secondary">Payment Method</span>
              <span className="text-secondary">UPI</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
