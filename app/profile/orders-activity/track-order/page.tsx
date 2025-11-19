import Commonbanner from "../../../../components/others/CommonBanners";
import ProductData from "./_partials/ProductData";
import OrderSummary from "./_partials/OrderSummary";
const page = () => {
  return (
    <>
      <Commonbanner />
      <div className="axto-container my-10">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-8">
            <ProductData/>
          </div>
        <div className="col-span-12 md:col-span-4">
          <OrderSummary/>
        </div>
        </div>
      </div>
    </>
  );
};

export default page;
