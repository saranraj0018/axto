import { GreenOrderBoxIcon } from "../../../../../components/all_icons";
const ProductData = () => {
  return (
    <>
      <div className="flex gap-5">
        <div className="w-1/3 md:w-auto">
          <img
            src="/img/home/P1.png"
            alt=""
            className="w-full md:w-40 h-auto md:h-40 object-cover my-auto p-2 bg-[#F4F4F4] rounded-xl"
          />
        </div>

        <div className="w-2/3 my-auto">
          <div className="font-medium text-[12px] md:text-lg flex gap-1">
            <div className="scale-75 md:scale-100">{GreenOrderBoxIcon}</div>
            <div>Order Confirmed Mon, 3rd Nov '25</div>
          </div>
          <div className="my-1 md:my-3">   
            <h3 className="text-secondary text-[11px] md:text-[13px]">
              ITEM CODE : OLA000040
            </h3>
            <p className="font-medium text-[10px] md:text-[13px]">
              ROADWAY Retro Square, Wayfarer, Sports Sunglasses
            </p>
          </div>
          <p className="font-semibold mt-1">₹799</p>
          <button className="axto-white-btn mt-3">Track Order</button>
        </div>
      </div>
    </>
  );
};

export default ProductData;
