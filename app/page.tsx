import Section1 from "./_partials/Section1";
import Section2 from "./_partials/Section2";
import Section3 from "./_partials/Section3";
import Section4 from "./_partials/Section4";

const Page = () => {
  return (
    <>
      <Section1 />
      <div className="axto-container">
        <Section2 />
        <Section3 />
        <Section4 />
      </div>
    </>
  );
};

export default Page;
