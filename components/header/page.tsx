import Nav from "./_partials/nav";

const page = () => {
  return (
    <>
      <header className="px-[1em] lg:px-[5em] xl:px-[5em] 2xl:px-[10em]">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-4">
            <img src="/img/axto_logo.png" alt="" className="w-1/3" />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Nav />
          </div>
          <div className="col-span-12 md:col-span-4"></div>
        </div>
      </header>
    </>
  );
};

export default page;
