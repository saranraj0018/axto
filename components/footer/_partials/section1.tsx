const Section1 = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-2 md:gap-4 lg:mx-20">
        <div className="col-span-12 md:col-span-4">
          <div className="flex md:justify-center gap-3">
            <div className="w-1/7">
              <img src="/img/footer/fi1.png" alt="" />
            </div>
            <div className="my-auto">
              <h2 className="font-medium">Free Shipping</h2>
              <p className="text-secondary text-[11px] md:text-sm">On all orders above ₹999</p>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="flex md:justify-center gap-3">
            <div className="w-1/7">
              <img src="/img/footer/fi1.png" alt="" />
            </div>
            <div className="my-auto">
              <h2 className="font-medium">Secure Payments</h2>
              <p className="text-secondary text-[11px] md:text-sm">Trusted checkout with UPI, cards</p>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="flex md:justify-center gap-3">
            <div className="w-1/7">
              <img src="/img/footer/fi1.png" alt="" />
            </div>
            <div className="my-auto">
              <h2 className="font-medium">24x7 Support</h2>
              <p className="text-secondary text-[11px] md:text-sm">Help whenever you need</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;
