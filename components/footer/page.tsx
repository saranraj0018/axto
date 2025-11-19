import Section1 from './_partials/section1';
import Section2 from './_partials/section2';
import Section3 from './_partials/section3';
const page = () => {
  return (<>
    <footer className="space-y-7">
      <div className="axto-container">
      <Section1/>
      </div>
      <div className="axto-container bg-cover py-4" style={{ backgroundImage: "url('/img/footer/Footer-bg.png')" }}>
        <Section2/>
        <Section3/>
      </div>
    </footer>
    </>
  )
}

export default page
