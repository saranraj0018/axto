import CommonBanners from "../../../components/others/CommonBanners";
import Sidebar from "../_partials/Sidebar";
import OrderData from "./_partials/OrderData";
const page = () => {
  return (
    <>
      <CommonBanners />
      <div className="axto-container my-10">
        <div className="grid grid-cols-12 gap-3 lg:gap-8">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <Sidebar />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            <OrderData />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
