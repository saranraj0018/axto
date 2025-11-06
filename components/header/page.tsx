import Nav from "./_partials/nav";
import IconNav from "./_partials/IconNav";

const page = () => {
  return (
    <>
      <header className="px-0 lg:px-[5em] xl:px-[5em] 2xl:px-[10em] py-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-8 lg:col-span-4">
            <img src="/img/axto_logo.png" alt="" className="w-3/5 md:w-2/5 lg:w-2/5 ps-3 md:px-0" />
          </div>
          <div className="col-span-4 lg:col-span-4 my-auto">
            <Nav />
          </div>
          <div className="col-span-12 lg:col-span-4 bg-zinc-200 md:bg-white p-1 md:p-2 lg:p-0">
          <IconNav/>

          </div>
        </div>
      </header>
    </>
  );
};

export default page;
