import type { Metadata } from "next";
import { PoweredByInnovationIcon, callIcon, orange_whatsapp, orange_mail } from "../../components/all_icons";
import ContactForm from "./ContactForm";
import { youtube_orange_icon, insta_orange_icon } from "../../components/all_icons";

export const metadata: Metadata = {
  title: "Contact us | Axto - Accessories That Move You",
  description:
    "Premium accessories for your EV scooters. Desired for style, safety, and everyday utility.",
};

const page = () => {
  return (
    <>
      <div className="axto-container">
        <div className="grid grid-cols-12 gap-5 my-12">
          <div className="order-2 lg:order-1 col-span-12 lg:col-span-4 bg-primary p-7 rounded-3xl">
            <ContactForm />
          </div>
          <div className="order-1 lg:order-1 col-span-12 lg:col-span-8 space-y-4 my-auto">
            <div className="flex gap-2 border border-primary rounded-full orange-gradient px-1.5 py-1 w-max my-auto mx-auto lg:mx-0">
              <div className="border-2 border-white p-1 rounded-full">
                {PoweredByInnovationIcon}
              </div>
              <div className="my-auto">Powered by Innovation</div>
            </div>
            <h2 className="font-medium text-xl md:text-4xl my-3 text-center lg:text-start">
                Get in Touch With Us <span className="text-primary italic">Today</span>
            </h2>
            <p className="text-center lg:text-start text-md text-secondary">
                Axto isn't just about accessories, it's about you. Whether you have a question, need
                help choosing, or simply want to share your journey, we're here to listen.
            </p>
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-4 orange-gradient p-2 rounded-2xl border border-primary flex gap-2">
                    <div className="bg-white p-3 rounded-full h-max my-auto">
                        {callIcon}
                    </div>
                    <div>
                        <h4 className="text-secondary font-medium text-md ">
                            Call us
                        </h4>
                        <p className="text-primary font-medium text-lg">
                            +91 98765 43210
                        </p>
                    </div>
                                        
                </div>
                <div className="col-span-12 md:col-span-4 orange-gradient p-2 rounded-2xl border border-primary flex gap-2">
                    <div className="bg-white p-3 rounded-full h-max my-auto">
                        {orange_whatsapp}
                    </div>
                    <div>
                        <h4 className="text-secondary font-medium text-sm ">
                            Whatsapp
                        </h4>
                        <p className="text-primary font-medium text-lg">
                            Start Chat
                        </p>
                    </div>
                                        
                </div>
                <div className="col-span-12 md:col-span-4 orange-gradient p-2 rounded-2xl border border-primary flex gap-2">
                    <div className="bg-white p-3 rounded-full h-max my-auto">
                        {orange_mail}
                    </div>
                    <div>
                        <h4 className="text-secondary font-medium text-sm ">
                            Email us
                        </h4>
                        <p className="text-primary font-medium text-lg">
                            support@axto.com
                        </p>
                    </div>
                                        
                </div>
            </div>
            <p className="text-md font-medium text-secondary text-center lg:text-start">
                Socail Media Link
            </p>
             <div className="flex gap-4 bg-primary rounded-full w-max p-2 mx-auto lg:mx-0">
                {youtube_orange_icon}
                {insta_orange_icon}
                {youtube_orange_icon}
                {insta_orange_icon}
                {youtube_orange_icon}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default page;
