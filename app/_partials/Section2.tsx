const BrandItems = [
  {
    id: 1,
    img: "/img/home/Brand1.png",
    url: "#",
  },
  {
    id: 2,
    img: "/img/home/Brand2.png",
    url: "#",
  },
  {
    id: 3,
    img: "/img/home/Brand3.png",
    url: "#",
  },
  {
    id: 4,
    img: "/img/home/Brand4.png",
    url: "#",
  },
];

const Section2 = () => {
  return (
    <>
      <div className="my-10 space-y-2 md:space-y-1">
        <h2 className="text-center text-md md:text-2xl font-medium">
          Shop by <span className="text-primary">Brand</span>
        </h2>
        <p className="text-center text-secondary font-medium text-[10px] md:text-lg">
          Find perfect scooter accessories in our categories.
        </p>
        <div className="grid grid-cols-12 gap-3 mt-8">
          {BrandItems.map((item) => (
            <div key={item.id} className="col-span-6">
              <img src={item.img} alt="" />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="axto-orange-btn mt-3">See More</button>
        </div>
      </div>
    </>
  );
};

export default Section2;
