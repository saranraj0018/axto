import { youtube_icon, insta_icon, facebookIcon, LinkedinIcon, TwitterIcon } from "../../all_icons";
import Link from "next/link";

const Section2 = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-14 my-7">
        <div className="col-span-12 md:col-span-3">
          <Link href="/">
            <img
              src="/img/axto_logo.png"
              alt=""
              className="mx-auto md:mx-0 w-1/2 md:w-4/5"
            />
          </Link>
          <p className="text-secondary text-center md:text-start text-[12px] lg:text-[16px] mt-3">
            Premium accessories for your EV scooters. Desigred for style,
            safety, and e'.eryday utility.
          </p>
        </div>
        <div className="col-span-12 md:col-span-3 space-y-3">
          <h2 className="font-medium">Quick Links</h2>
          <ul className="list-disc space-y-1 mx-3 md:mx-0">
            <li className="text-secondary text-[12px] lg:text-[16px]">
              <Link href="/shop">Shop</Link></li>
            <li className="text-secondary text-[12px] lg:text-[16px]">
              <Link href="/about">About Us</Link>
            </li>
            <li className="text-secondary text-[12px] lg:text-[16px]">
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li className="text-secondary text-[12px] lg:text-[16px]">Blog</li>
            <li className="text-secondary text-[12px] lg:text-[16px]">FAQs</li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-3 space-y-3">
          <h2 className="font-medium">Legal</h2>
          <ul className="list-disc space-y-1 mx-3 md:mx-0">
            <li className="text-secondary text-[12px] lg:text-[16px]">
              Privacy Policy
            </li>
            <li className="text-secondary text-[12px] lg:text-[16px]">
              Terms & Conditions
            </li>
            <li className="text-secondary text-[12px] lg:text-[16px]">
              Warranty Policy
            </li>
            <li className="text-secondary text-[12px] lg:text-[16px]">
              Cancellation Policy
            </li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-3 space-y-3">
          <h2 className="font-medium">Stay Connected</h2>
          <div className="flex gap-2">
            {youtube_icon}
            {insta_icon}
            {facebookIcon}
            {LinkedinIcon}
            {TwitterIcon}
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
