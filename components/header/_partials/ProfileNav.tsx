"use client";
import { useState, useRef, useEffect } from "react";
import { userIcon } from "../../all_icons";
import LoggedItems from "./LoggedItems";

const ProfileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="focus:outline-none"
      >
        {userIcon}
      </button>

      {isOpen && (
        <div
          className="
            absolute top-4 -left-25 md:right-25 mt-2 bg-white shadow-lg rounded-lg p-3
            transition-all duration-300 origin-top animate-slideDown w-max z-50
          "
        >
          <LoggedItems />
        </div>
      )}
    </div>
  );
};

export default ProfileNav;
