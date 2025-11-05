import Section1 from './_partials/section1';
import Section2 from './_partials/section2';
import Section3 from './_partials/section3';
const page = () => {
  return (<>
    <footer className="px-[1em] lg:px-[5em] xl:px-[5em] 2xl:px-[10em]">
      <Section1/>
      <Section2/>
      <Section3/>
    </footer>
    </>
  )
}

export default page
