import { RatingStarIcon, LikedIcon } from "../../../../components/all_icons";
const BSProductItems = [
  {
    id: 1,
    title: "Backrest Support..",
    itemCode: "OLA000040",
    ratings: 4.5,
    discount: "10%",
    img: "/img/home/P1.png",
    regularPrice: "999",
    sellingPrice: "799",
    url: "#",
  },
  {
    id: 2,
    title: "Cushion Backrest Support..",
    itemCode: "OLA000041",
    ratings: 4.5,
    discount: "10%",
    img: "/img/home/P1.png",
    regularPrice: "999",
    sellingPrice: "799",
    url: "#",
  },
  {
    id: 3,
    title: "Break Wire",
    itemCode: "OLA000042",
    ratings: 4.5,
    discount: "10%",
    img: "/img/home/P1.png",
    regularPrice: "999",
    sellingPrice: "799",
    url: "#",
  },
  {
    id: 4,
    title: "EV Battery",
    itemCode: "OLA000043",
    ratings: 4.5,
    discount: "10%",
    img: "/img/home/P1.png",
    regularPrice: "999",
    sellingPrice: "799",
    url: "#",
  },
  {
    id: 5,
    title: "Car Battery",
    itemCode: "OLA000043",
    ratings: 4.5,
    discount: "10%",
    img: "/img/home/P1.png",
    regularPrice: "999",
    sellingPrice: "8000",
    url: "#",
  },
];

const LikedProducts = () => {
  return (
    <div className="my-14 space-y-2 md:space-y-3">
      <h2 className="text-xl font-medium mb-4">Wishlist</h2>
      <div className="grid grid-cols-12 gap-3 md:gap-5 my-8">
        {BSProductItems.map((item) => (
          <div
            key={item.id}
            className="col-span-6 lg:col-span-3 flex"
          >
            {/* Make the card take full height */}
            <div className="shadow-md rounded-2xl overflow-hidden flex flex-col w-full">
              <div className="space-y-5 bg-[#F4F4F4] p-3">
                <div className="flex justify-between">
                  <p className="text-white bg-primary w-max px-3 py-1 text-[10px] md:text-sm rounded-3xl h-max">
                    {item.discount} OFF
                  </p>
                  <div className="p-1 rounded-3xl bg-white hover:bg-[#f3f3f3] hover:scale-125 transition cursor-pointer">
                    <LikedIcon />
                  </div>
                </div>
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-2xl w-full md:w-3/4 mx-auto"
                />
              </div>
              <div className="bg-[#fffffd] p-2 md:p-3 space-y-1 mt-auto flex flex-col justify-between flex-1">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <p className="text-secondary text-[9px] md:text-[12px]">
                      ITEM CODE : {item.itemCode}
                    </p>
                  </div>
                  <div className="flex gap-1 text-[10px] md:text-[13px] ">
                    <div className="-mt-0.5 md:mt-0.5 scale-75 md:scale-100">
                      <RatingStarIcon />
                    </div>
                    {item.ratings}
                  </div>
                </div>
                <h3 className="text-[11px] md:text-[16px] font-medium">
                  {item.title}
                </h3>
                <div className="flex flex-col md:flex-row gap-2 justify-between mt-auto">
                  <div className="flex gap-1 text-[13px] md:text-md font-medium text-[#332820] my-auto">
                    ₹{item.sellingPrice}{" "}
                    <div className="line-through text-sm my-auto text-secondary font-normal">
                      {item.regularPrice}
                    </div>
                  </div>
                  <button className="bg-primary hover:bg-white text-white hover:text-primary px-4 py-1 cursor-pointer rounded-3xl text-[10px] md:text-[15px] border border-white hover:border-primary transition font-medium">
                    + Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LikedProducts;
