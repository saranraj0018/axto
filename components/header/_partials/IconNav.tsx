"use client";
import React, { useState } from "react";
import { searchIcon, userIcon, heartIcon, cartIcon } from "../../all_icons";
import UserPopup from "./userPopup";
import SearchPopup from "./searchPopup";

const IconNav = () => {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);

  return (
    <div className="flex justify-end gap-3 md:gap-8 h-full">
      {/* User Icon */}
      <div className="my-auto">
        <button
          onClick={() => setIsSearchPopupOpen(true)}
          className="focus:outline-none scale-75 md:scale-100 mb-0 md:-mt-1"
        >
            {searchIcon}
        </button>

        {isSearchPopupOpen && (
          <SearchPopup onClose={() => setIsSearchPopupOpen(false)} />
        )}
      </div>
      {/* User Icon */}
      <div className="my-auto">
        <button
          onClick={() => setIsUserPopupOpen(true)}
          className="focus:outline-none scale-75 md:scale-100 mb-0 md:-mt-1"
        >
            {userIcon}
        </button>

        {isUserPopupOpen && (
          <UserPopup onClose={() => setIsUserPopupOpen(false)} />
        )}
      </div>

      <div className="my-auto scale-75 md:scale-100">{heartIcon}</div>
      <div className="my-auto scale-75 md:scale-100">{cartIcon}</div>

      <div>
        <p className="text-[10px] md:text-[12px] text-secondary font-medium">
          your cart value
        </p>
        <p className="text-black font-semibold text-[12px] md:text-lg">₹1,526</p>
      </div>
    </div>
  );
};

export default IconNav;
