import CommonBanners from "@/components/others/CommonBanners";
import ProgressBar from "../_partials/ProgressBar";
import ReviewCards from "./ReviewCards";

const page = () => {
  return (
    <>
      <div>
        <CommonBanners />
        <div className="axto-container space-y-4">
          <div className="grid grid-cols-12 gap-3 md:gap-10">
            <div className="col-span-12 md:col-span-6">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-1/2">
                  <h2 className="text-[180px] md:text-[200px] text-black font-medium flex">
                    4.5<span className="text-[30px] mt-45 ">/5</span>
                  </h2>
                  <p className="text-secondary text-lg -mt-8">
                    (50 New Reviews)
                  </p>
                </div>
                <div className="w-full md:w-1/2 my-auto">
                  <ProgressBar />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 my-auto">
              <form className="space-y-4">
                <div className="flex flex-col text-left">
                  <label className="text-sm font-medium mb-1">
                    Write a Review
                  </label>
                  <textarea
                    className="border border-gray-300 rounded-lg p-2 resize-none"
                    rows={3}
                  />
                </div>
                <input
                  type="submit"
                  className="axto-orange-btn transition"
                  value="Submit"
                />
              </form>
            </div>
          </div>
          <ReviewCards />
        </div>
      </div>
    </>
  );
};

export default page;
