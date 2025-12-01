import CommonBanners from "@/components/others/CommonBanners";

const page = () => {
  return (
    <>
      <CommonBanners />
      <div className="axto-container space-y-4 my-8">
        <h2 className="text-primary text-lg font-medium">
          Cancellation Policy
        </h2>
        <p className="text-secondary text-sm text-justify">
          Last updated: 16/11/2025
          <br /> At Axto, we understand that plans can change. Our cancellation
          policy is designed to be simple and transparent while ensuring timely
          order processing and delivery.
        </p>
        <h2 className="text-primary text-lg font-medium">
          1. Order Cancellation Before Dispatch
        </h2>
        <p className="text-secondary text-sm text-justify">
          You can cancel your order any time before it is dispatched. To cancel,
          message or WhatsApp us at +91-9994117793 or email
          axtoaccesories@gmail.com with your order number and reason for
          cancellation. Once cancelled, a full refund will be issued to your
          original payment method within 5–7 working days.
        </p>
        <h2 className="text-primary text-lg font-medium">
          2. Order Cancellation After Dispatch
        </h2>
        <p className="text-secondary text-sm text-justify">
          Once your order has been shipped, it cannot be cancelled. You may
          still return the product after receiving it by following our Return &
          Refund Policy. In such cases, return shipping charges may apply if the
          cancellation is not due to damage or defect.
        </p>
        <h2 className="text-primary text-lg font-medium">
          3. Partial Cancellations
        </h2>
        <p className="text-secondary text-sm text-justify">
          If your order contains multiple items, you may request cancellation of
          specific items only (provided they haven’t been dispatched). Refunds
          for the cancelled items will follow the same process as above.
        </p>
        <h2 className="text-primary text-lg font-medium">
          4. Auto-Cancellation by Axto
        </h2>
        <p className="text-secondary text-sm text-justify">
          Axto reserves the right to cancel any order under the following
          circumstances: Payment not received or transaction declined Invalid or
          incomplete shipping address Unavailability of the product Technical
          error in pricing or product details In such cases, you will be
          notified immediately and issued a full refund.
        </p>
        <h2 className="text-primary text-lg font-medium">5. Refund Timeline</h2>
        <p className="text-secondary text-sm text-justify">
          Approved cancellations are processed within 5–7 business days after
          confirmation. Refunds will be credited to the original payment method
          used during purchase.
        </p>
        <h2 className="text-primary text-lg font-medium">
          6. For Cash-on-Delivery (COD) Orders
        </h2>
        <p className="text-secondary text-sm text-justify">
          If your order was placed using Cash-on-Delivery, refunds (if
          applicable) will be issued via bank transfer upon sharing your account
          details securely with our support team.
        </p>
        <h2 className="text-primary text-lg font-medium">7. Contact Us</h2>
        <p className="text-secondary text-sm text-justify">
          For any cancellation-related assistance, please reach us at: Email:
          axtoaccesories@gmail.com Message / WhatsApp: +91-9994117793
        </p>
      </div>
    </>
  );
};

export default page;
