"use client";
import React, { useEffect, useState } from "react";
import { shieldIcon, GearIcon, BoxIcon, closeIcon } from "../../all_icons";
import Userform from "./Userform";

interface UserPopupProps {
  onClose: () => void; // function to close the popup
}

const UserPopup: React.FC<UserPopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in animation after mount
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Trigger slide-out
    setIsVisible(false);
    // Wait for animation to finish before actually closing
    setTimeout(() => {
      onClose();
    }, 300); // match duration-300
  };

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-[#0a0a0a80] backdrop-blur-[2px] z-50 cursor-pointer transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Modal container */}
      <div
        className={`fixed top-1/2 left-1/2 w-8/9 md:w-5/9 bg-white rounded-3xl shadow-lg z-50 transform transition-all duration-300 ease-out`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translate(-50%, -50%)"
            : "translate(-50%, -60%)", // slide up on close
        }}
      >
        <div className="grid grid-cols-12">
          {/* Left image/info section */}
          <div
            className="col-span-12 lg:col-span-6 bg-cover bg-center p-8 my-auto rounded-tl-3xl rounded-bl-3xl space-y-4 h-full hidden lg:flex flex-col justify-center"
            style={{ backgroundImage: "url('/img/header/LoginFormbg.png')" }}
          >
            <h2 className="text-white text-[26px] font-medium">
              Accessories that Move You
            </h2>
            <p className="text-white text-sm">
              Your personalized store for accessories.
            </p>
            <div className="flex gap-3 mt-5">
              <div className="p-2 border border-white rounded-2xl bg-[#f9a043] h-max">
                {shieldIcon}
              </div>
              <div className="my-auto">
                <p className="font-medium text-white text-md">
                  Secure login & privacy-first
                </p>
                <p className="text-white text-[12px]">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 border border-white rounded-2xl bg-[#f9a043] h-max">
                {GearIcon}
              </div>
              <div className="my-auto">
                <p className="font-medium text-white text-md">
                  Personalized experience for your vehicles
                </p>
                <p className="text-white text-[12px]">
                  Get recommendations for your vehicle
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 border border-white rounded-2xl bg-[#f9a043] h-max">
                {BoxIcon}
              </div>
              <div className="my-auto">
                <p className="font-medium text-white text-md">
                  One account across web & mobile
                </p>
                <p className="text-white text-sm">
                  Seamless experience across all your devices
                </p>
              </div>
            </div>
          </div>

          {/* Right form section */}
          <div className="col-span-12 lg:col-span-6 p-3 md:p-5 space-y-5 my-auto">
            <div className="flex justify-end hover:cursor-pointer" onClick={handleClose}>
              {closeIcon}
            </div>
            <Userform onSuccess={handleClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPopup;
