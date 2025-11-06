import Section1 from './_partials/Section1';
import Section2 from './_partials/Section2';
import Section3 from './_partials/Section3';
import Section4 from './_partials/Section4';

const page = () => {
  return (
    <>
      <Section1 />
      <div className="px-[1em] lg:px-[5em] xl:px-[5em] 2xl:px-[10em]">
        <Section2/>
        <Section3/>
        <Section4/>

      </div>
    </>
  )
}

export default page
