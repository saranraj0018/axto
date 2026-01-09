"use client";
import { useState,useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {searchIcon, heartIcon, cartIcon, userIcon} from "../../all_icons";
import SearchPopup from "./searchPopup";
import UserPopup from "./userPopup";
import Link from "next/link";
import ProfileNav from "./ProfileNav";


const IconNav = () => {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const { token,user } = useAuth();
  const [cartTotal, setCartTotal] = useState(0);
  const isLoggedIn = !!token;


  useEffect(() => {
    const fetchCart = () => {
      const headers: any = { Accept: "application/json" };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/cart/total`, { headers })
          .then(res => res.json())
          .then(res => setCartTotal(res.totalAmount || 0))
          .catch(console.error);
    };

    fetchCart(); // initial load

    window.addEventListener("cart-refresh", fetchCart);
    return () => window.removeEventListener("cart-refresh", fetchCart);
  }, [token]);


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
                <Link href="/profile" className="my-auto">
                  {userIcon}
                </Link>
                {/*<ProfileNav/>*/}
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
                  ₹{cartTotal}
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
