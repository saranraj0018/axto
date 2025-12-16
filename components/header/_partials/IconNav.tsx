"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { searchIcon, userIcon, heartIcon, cartIcon } from "../../all_icons";
import SearchPopup from "./searchPopup";
import UserPopup from "./userPopup";
import Link from "next/link";
import ProfileNav from "./ProfileNav";

const IconNav = () => {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const { token, user, logout } = useAuth();
  const isLoggedIn = !!token;


  return (
      <>
        {isLoggedIn ? (
            <div className="flex justify-end items-center gap-6 h-full">
              <div className="my-auto">
                    <button
                        onClick={() => setIsSearchPopupOpen(true)}
                        className="focus:outline-none"
                    >
                      {searchIcon}
                    </button>
                    {isSearchPopupOpen && (
                        <SearchPopup onClose={() => setIsSearchPopupOpen(false)} />
                    )}
              </div>
              <div className="my-auto">
                <ProfileNav/>
              </div>
              <Link href="/profile/wishlist" className="my-auto">
                {heartIcon}
              </Link>
              <Link href="/cart" className="my-auto">
                {cartIcon}
              </Link>
              <div>
                <p className="text-[10px] md:text-[12px] text-secondary font-medium">
                  cart value
                </p>
                <p className="text-black font-semibold text-[12px] md:text-lg">
                  ₹1,526 
                </p>
              </div>
            </div>
        ) : (
            <div className="flex justify-end gap-3 md:gap-8 h-full items-center">
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
              <button
                  onClick={() => setIsUserPopupOpen(true)}
                  className="axto-orange-btn h-max"
              >
                Login / Signup
              </button>
              {isUserPopupOpen && (
                  <UserPopup onClose={() => setIsUserPopupOpen(false)} />
              )}
            </div>
        )}
        
      </>
  );
};

export default IconNav;
