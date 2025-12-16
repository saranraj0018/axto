"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { searchIcon, userIcon, heartIcon, cartIcon } from "../../all_icons";
import SearchPopup from "./searchPopup";
import UserPopup from "./userPopup";
import Link from "next/link";

const IconNav = () => {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const { token, user, logout } = useAuth();
  const isLoggedIn = !!token;


  return (
      <>
        {isLoggedIn ? (
            // AUTHENTICATED: Profile, Wishlist, Cart
            <div className="flex justify-end items-center gap-3 h-full">
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
              <Link href="/profile/wishlist" className="my-auto scale-75 md:scale-100">
                {heartIcon}
              </Link>
              <Link href="/cart" className="my-auto scale-75 md:scale-100">
                {cartIcon}
              </Link>
              <div>
                <p className="text-[10px] md:text-[12px] text-secondary font-medium">
                  cart value
                </p>
                <p className="text-black font-semibold text-[12px] md:text-lg">
                  ₹1,526 {/* Replace with cart total from context */}
                </p>
              </div>
            </div>
        ) : (
            // NOT AUTHENTICATED: Search + Login/Signup
            <div className="flex justify-end gap-3 md:gap-8 h-full">
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
