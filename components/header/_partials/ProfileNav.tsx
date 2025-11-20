"use client";
import { useState } from "react";
import UserPopup from "./userPopup";
import { userIcon } from "../../all_icons";
import LoggedItems from "./LoggedItems";

const ProfileNav = () => {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="relative inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setIsUserPopupOpen(true)}
          className="focus:outline-none scale-75 md:scale-100 mb-0 md:-mt-1"
        >
          {userIcon}
        </button>

        {isHovered && (
          <div
            className="
              absolute top-4 -left-25 md:left-0 mt-2 bg-white shadow-lg rounded-lg p-3 transition-all duration-300 origin-top animate-slideDown w-max z-50"
          >
            <LoggedItems />
          </div>
        )}
      </div>

      {isUserPopupOpen && (
        <UserPopup onClose={() => setIsUserPopupOpen(false)} />
      )}
    </>
  );
};

export default ProfileNav;
