const CategoryItems = [
  {
    img: "/img/home/C1.png",
    url: "#",
  },
  {
    img: "/img/home/C2.png",
    url: "#",
  },
  {
    img: "/img/home/C3.png",
    url: "#",
  },
  {
    img: "/img/home/C4.png",
    url: "#",
  },
  {
    img: "/img/home/C1.png",
    url: "#",
  },
  {
    img: "/img/home/C1.png",
    url: "#",
  },
];
const Section3 = () => {
  return (
    <>
      <div className="my-10 space-y-2 md:space-y-3">
        <h2 className="text-center text-md md:text-2xl font-semibold">
          Shop by <span className="text-primary">Category</span>
        </h2>
        <p className="text-center text-secondary font-semibold text-[10px] md:text-lg">
          Find perfect scooter accessories in our categories.
        </p>
        <div className="grid grid-cols-12 gap-3">
          {CategoryItems.map((item, index) => (
            <div key={index} className="col-span-6 md:col-span-4">
              <img src={item.img} alt="" />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="axto-orange-btn ">See More</button>
        </div>
      </div>
    </>
  );
};

export default Section3;
