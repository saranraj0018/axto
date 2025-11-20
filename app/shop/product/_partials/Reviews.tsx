import ReviewSlider from "./ReviewSlider";
import ProgressBar from "./ProgressBar";
import Link from "next/link";

const Reviews = () => {
  return (
    <>
    <div>
      <div className="my-5 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-6">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
              <h2 className="text-[180px] md:text-[200px] text-black font-medium flex">
                4.5<span className="text-[30px] mt-45 ">/5</span>
              </h2>
              <p className="text-secondary text-lg -mt-8">(50 New Reviews)</p>
            </div>
            <div className="w-full md:w-1/2 my-auto">
              <ProgressBar />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 my-auto">
          <ReviewSlider />
        </div>
      </div>
      <div>
        <Link href="/shop/product/all-reviews" className="flex justify-center">
        <button className="axto-white-btn">
          View More
        </button>
        </Link>
      </div>
      </div>
    </>
  );
};

export default Reviews;
