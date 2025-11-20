"use client";
import { useState } from "react";
import { searchIcon, userIcon, heartIcon, cartIcon } from "../../all_icons";
import SearchPopup from "./searchPopup";
import Link from "next/link";
import ProfileNav from "./ProfileNav";

const IconNav = () => {
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
        <ProfileNav/>
      </div>
      <Link href="/profile/wishlist" className="my-auto scale-75 md:scale-100">
        <div>{heartIcon}</div>
      </Link>
      <Link href="/cart" className="my-auto scale-75 md:scale-100">
        <div className="flex justify-end -mb-2 -me-2">
          <div className="text-white rounded-full text-[9px] bg-primary px-[5px] py-0.5 text-center z-100">
            2
          </div>
        </div>

        <div>{cartIcon}</div>
      </Link>

      <div>
        <p className="text-[10px] md:text-[12px] text-secondary font-medium">
          your cart value
        </p>
        <p className="text-black font-semibold text-[12px] md:text-lg">
          ₹1,526
        </p>
      </div>
    </div>
  );
};

export default IconNav;
