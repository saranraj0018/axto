"use client";
import CommonBanners from "../../../components/others/CommonBanners";
import Sidebar from "../_partials/Sidebar";
import AddAddress from "./_partials/AddAddress";
import ManageAddress from "./_partials/ManageAddress";

const Page = () => {
  return (
    <>
      <CommonBanners />
      <div className="axto-container my-10">
        <div className="grid grid-cols-12 gap-3 lg:gap-8">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <Sidebar />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-5">
            <ManageAddress />
            <AddAddress />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
