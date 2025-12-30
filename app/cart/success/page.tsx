import CommonBanners from "@/components/others/CommonBanners"


const page = () => {
  return (
    <div>
      <CommonBanners/>
      <section className="my-10 axto-container">
        <div className="mx-auto md:w-1/2 shadow-lg p-5 rounded-3xl space-y-3">
        <img src="/img/success.jpg" alt="" className="w-1/6 mx-auto"/>
        <h2 className="text-3xl font-bold text-center text-primary">
            Payment Successfull
        </h2>
        <p className="text-secondary text-center text-sm">
            We will process your order
        </p>
        </div>


      </section>
    </div>
  )
}

export default page
