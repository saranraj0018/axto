import CommonBanners from "@/components/others/CommonBanners";

const page = () => {
  return (
    <>
      <CommonBanners />
      <div className="axto-container space-y-4 my-8">
        <h2 className="text-primary text-lg font-medium">Shipping Policy</h2>
        <p className="text-secondary text-sm text-justify">
          Last updated: 16/11/2025
        </p>
        <p className="text-secondary text-sm text-justify">
          At Axto, we aim to deliver your orders quickly, safely, and at the
          lowest possible cost. This policy explains how we handle order
          processing, delivery timelines, and shipping charges across India.
        </p>
        <h2 className="text-primary text-lg font-medium">
          1. Shipping Coverage
        </h2>
        <p className="text-secondary text-sm text-justify">
          We currently ship across India only through trusted courier and
          logistics partners. International shipping is not available at this
          time.
        </p>
        <h2 className="text-primary text-lg font-medium">
          2. Order Processing Time
        </h2>
        <p className="text-secondary text-sm text-justify">
          Orders are processed within 1–3 business days after payment
          confirmation. Orders placed on weekends or public holidays will be
          processed on the next working day. You will receive an order
          confirmation email and WhatsApp message once your order is placed,
          followed by a shipping confirmation when it is dispatched.
        </p>
        <h2 className="text-primary text-lg font-medium">
          3. Delivery Timelines
        </h2>
        <p className="text-secondary text-sm text-justify">
          Delivery usually takes 3–7 business days depending on your location.
          Remote or interior areas may take longer (up to 10 business days). A
          tracking link will be shared via email or WhatsApp once the shipment
          is dispatched.
        </p>
        <h2 className="text-primary text-lg font-medium">
          4. Shipping Charges
        </h2>
        <p className="text-secondary text-sm text-justify">
          Free shipping for all orders above ₹499. For orders below ₹499, a
          nominal shipping fee will be displayed at checkout. Certain heavy or
          oversized items may carry an additional handling charge, which will be
          clearly mentioned on the product page.
        </p>
        <h2 className="text-primary text-lg font-medium">
          5. Tracking Your Order
        </h2>
        <p className="text-secondary text-sm text-justify">
          You can track your order through the tracking link sent via email or
          WhatsApp. If you face any issues tracking your shipment, please
          message or WhatsApp us at +91-9994117793 or email
          axtoaccesories@gmail.com.
        </p>
        <h2 className="text-primary text-lg font-medium">
          6. Delivery Attempts
        </h2>
        <p className="text-secondary text-sm text-justify">
          Our courier partners will make up to two delivery attempts. If you are
          unavailable, the order may be returned to us. In such cases,
          re-delivery can be arranged upon payment of additional shipping
          charges.
        </p>
        <h2 className="text-primary text-lg font-medium">
          7. Delays & Exceptions
        </h2>
        <p className="text-secondary text-sm text-justify">
          While we strive for timely delivery, delays may occur due to
          unforeseen events such as weather conditions, strikes, or logistic
          partner delays. We will notify you promptly in such cases.
        </p>
        <h2 className="text-primary text-lg font-medium">
          8. Damaged or Missing Items
        </h2>
        <p className="text-secondary text-sm text-justify">
          Please inspect your order upon delivery. If you notice any damage,
          missing item, or tampering, contact us within 24 hours of receipt with
          clear photos and order details. Our support team will assist with
          replacement or refund as per our Return & Refund Policy.
        </p>
        <h2 className="text-primary text-lg font-medium">9. Contact Us</h2>
        <p className="text-secondary text-sm text-justify">
          For shipping-related queries, please reach us at: Email:
          axtoaccesories@gmail.com Message / WhatsApp: +91-9994117793
        </p>
      </div>
    </>
  );
};

export default page;
