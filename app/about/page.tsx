import Link from "next/link";
import CommonBanners from "../../components/others/CommonBanners";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us | Axto - Accessories That Move You",
  description:
    "Premium accessories for your EV scooters. Desired for style, safety, and everyday utility.",
};
const Page = () => {
  return (
    <>
      <CommonBanners />

      <div className="space-y-5 my-5">
        <div className="grid grid-cols-12 gap-5 md:gap-3 axto-container">
          <div className="col-span-12 md:col-span-6 space-y-3">
            <h2 className="text-2xl font-medium text-center md:text-start">
              <span className="text-primary">Begin</span>ning
            </h2>
            <p className="text-justify text-secondary text-[12px] md:text-sm">
              Axto started from chai breaks and endless rides, not from
              air-conditioned offices, It began with one question — why is it so
              hard to find authentic, future-ready accessories for our rides?
              Every rider knows this struggle, searching for something reliable
              and never fully sure. That moment sparked what Axto stands for
              today. From the start, our focus has been simple. We handpick the
              right accessories, test them for quality, and make them easy for
              every rider to access.
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="axto-orange-btn font-medium text-md">
                Explore Our Story
              </button>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 my-auto">
            <img src="/img/axto_logo.png" alt="" className="mx-auto w-2/3" />
          </div>
        </div>

        <div className="bg-[#FFF0E5] py-6 text-center space-y-3 axto-container">
          <h2 className="text-2xl font-medium">
            Mission in <span className="text-primary">Action</span>
          </h2>
          <p className="text-secondary text-[12px] md:text-sm w-full md:w-2/3 mx-auto text-justify md:text-center">
            At Axto, our mission has never been just words. Every product we
            offer goes through a simple process — we look for the right fit. we
            test it for quality. and only then does it reach you. For us. the
            real success is when a rider can buy with confidence knowing what
            they get is trusted and ready for the road.
          </p>
          <img
            src="/img/about/mia.png"
            alt=""
            className="w-full md:w-1/2 mx-auto"
          />
        </div>
        <div className="my-6 text-center space-y-3 axto-container">
          <h2 className="text-2xl font-medium">
            The <span className="text-primary">Axto </span>Way
          </h2>
          <p className="text-secondary text-[12px] md:text-sm w-full md:w-2/3 mx-auto text-justify md:text-center">
            At Axto, our mission has never been just words. Every product we
            offer goes through a simple process — we look for the right fit. we
            test it for quality. and only then does it reach you. For us. the
            real success is when a rider can buy with confidence knowing what
            they get is trusted and ready for the road.
          </p>
          <img
            src="/img/about/axto-way.png"
            alt=""
            className="w-full md:w-2/3 mx-auto"
          />
        </div>
        <div className="my-6 py-6 text-center space-y-3 axto-container bg-[#f6f6f6]">
          <h2 className="text-2xl font-medium">
            Our <span className="text-primary">Commitment </span>
          </h2>
          <p className="text-secondary text-[12px] md:text-sm w-full md:w-2/3 mx-auto text-justify md:text-center">
            At Axto, we believe every ride should be safe. simple, and trusted
            Our focus is to bring riders accessories that are tested for quality
            and easy to choose. We are here to make riding better every day.
          </p>
          <div className="flex justify-center gap-2">
            <Link href="/shop">
            <button className="axto-orange-btn">Shop Now</button>
            </Link>
            <Link href="/contact-us">
              <button className="axto-white-btn">Contact Us</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
