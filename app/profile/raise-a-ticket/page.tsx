import CommonBanners from "../../../components/others/CommonBanners";
import Sidebar from "../_partials/Sidebar";

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
            <form>
              <label className="text-sm font-medium">Subject</label>
              <br />
              <input
                type="text"
                className="my-2 w-full lg:w-1/2 outline-1 text-sm outline-gray-300 hover:outline-orange-300 p-2 rounded-md"
                placeholder="Enter your Subject"
              />
              <br />
              <label className="text-sm font-medium">Description</label>
              <br />
              <textarea
                className="my-2 w-full lg:w-1/2 h-50 outline-1 text-sm outline-gray-300 hover:outline-orange-300 p-2 rounded-md"
                placeholder="Enter your Subject"
              />
              <br />
              <input
                type="submit"
                className="axto-orange-btn text-sm my-2"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
