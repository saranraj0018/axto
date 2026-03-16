"use client";
import {useState, useEffect} from "react";
import { useAuth } from "@/context/AuthContext";
import {searchIcon, heartIcon, cartIcon} from "../../all_icons";
import { useCart } from "@/context/CartContext";
import SearchDropdown from "./SearchDropdown";
import UserPopup from "./userPopup";
import Link from "next/link";
import ProfileNav from "./ProfileNav";


const IconNav = () => {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const { token } = useAuth();
  const isLoggedIn = !!token;
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const { cartTotalItem, fetchCartTotal } = useCart();

  useEffect(() => {
    const guestToken = localStorage.getItem("guest-token");
    if (token || guestToken) {
      fetchCartTotal();
    }
  }, [token, fetchCartTotal]);


  return (
      <>
        {isLoggedIn ? (
            <div className="flex justify-end items-center gap-6 h-full">
              <div className="my-auto">
                <div className="relative">
                  <button onClick={() => setShowSearch(!showSearch)}>
                    {searchIcon}
                  </button>

                  {showSearch && (
                      <div className="absolute right-0 bottom-0 mr-8">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-80 md:w-84 p-2 border rounded-lg shadow-lg"
                        />

                        <SearchDropdown
                            query={query}
                            onClose={() => {
                              setShowSearch(false);
                              setQuery("");
                            }}
                        />
                      </div>
                  )}
                </div>
              </div>
              <div className="my-auto">
                <ProfileNav/>
              </div>
              <Link href="/profile/wishlist" className="my-auto">
                {heartIcon}
              </Link>
              <Link href="/cart" className="my-auto relative">
              <span className="text-lg md:text-xl">
                {cartIcon}
              </span>

                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] md:text-xs rounded-full px-1">
                {cartTotalItem}
              </span>
              </Link>
              {/*<div>*/}
              {/*  <p className="text-[10px] md:text-[12px] text-secondary font-medium">*/}
              {/*    cart value*/}
              {/*  </p>*/}
              {/*  <p className="text-black font-semibold text-[12px] md:text-lg">*/}
              {/*    ₹{cartTotal}*/}
              {/*  </p>*/}
              {/*</div>*/}
            </div>
        ) : (
            <div className="flex justify-end gap-3 md:gap-8 h-full items-center">
              <div className="my-auto">
                <div className="relative">
                  <button onClick={() => setShowSearch(!showSearch)}>
                    {searchIcon}
                  </button>

                  {showSearch && (
                      <div className="absolute right-0 bottom-0 mr-8">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-80 md:w-82 p-2 border rounded-lg shadow-lg"
                        />

                        <SearchDropdown
                            query={query}
                            onClose={() => {
                              setShowSearch(false);
                              setQuery("");
                            }}
                        />
                      </div>
                  )}
                </div>
              </div>

              <Link href="/cart" className="my-auto relative">
              <span className="text-lg md:text-xl">
                {cartIcon}
              </span>

                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] md:text-xs rounded-full px-1">
                {cartTotalItem}
              </span>
              </Link>
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
