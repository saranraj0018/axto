"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { searchIcon, heartIcon, cartIcon } from "../../all_icons";
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
                <div className="absolute right-0 top-0 md:top-0 mr-8">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="h-[29px] lg:h-auto w-[135px] md:w-50 p-2 border rounded-lg shadow-lg outline-gray-200 focus:outline-none"
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
            <ProfileNav />
          </div>
          <Link href="/profile/wishlist" className="my-auto">
            {heartIcon}
          </Link>
          <Link href="/cart" className="my-auto relative">
            <span className="text-lg md:text-xl">{cartIcon}</span>

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
                    className="h-[29px] md:h-auto w-[150px] md:w-50 p-2 border rounded-lg shadow-lg outline-gray-200 focus:outline-none"
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
            <span className="text-lg md:text-xl">{cartIcon}</span>

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] md:text-xs rounded-full px-1">
              {cartTotalItem}
            </span>
          </Link>
          <button onClick={() => setIsUserPopupOpen(true)} className="h-max">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
            >
              <path
                d="M8.07692 8.76923C10.4954 8.76923 12.4615 6.80308 12.4615 4.38462C12.4615 1.96615 10.4954 0 8.07692 0C5.65846 0 3.69231 1.96615 3.69231 4.38462C3.69231 6.80308 5.65846 8.76923 8.07692 8.76923ZM8.07692 1.38462C9.72923 1.38462 11.0769 2.73231 11.0769 4.38462C11.0769 6.03692 9.72923 7.38462 8.07692 7.38462C6.42462 7.38462 5.07692 6.03692 5.07692 4.38462C5.07692 2.73231 6.42462 1.38462 8.07692 1.38462ZM10.8462 10.1538H5.30769C2.38154 10.1538 0 12.5354 0 15.4615C0 16.8646 1.13538 18 2.53846 18H13.6154C15.0185 18 16.1538 16.8646 16.1538 15.4615C16.1538 12.5354 13.7723 10.1538 10.8462 10.1538ZM13.6154 16.6154H2.53846C1.90154 16.6154 1.38462 16.0985 1.38462 15.4615C1.38705 14.4218 1.80116 13.4254 2.53635 12.6902C3.27154 11.955 4.26798 11.5409 5.30769 11.5385H10.8462C11.8859 11.5409 12.8823 11.955 13.6175 12.6902C14.3527 13.4254 14.7668 14.4218 14.7692 15.4615C14.7692 16.0985 14.2523 16.6154 13.6154 16.6154Z"
                fill="#202020"
              />
            </svg>
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
