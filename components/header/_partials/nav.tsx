"use client";
import { useState } from "react";
import { menuDownArrow, closeIcon } from "../../all_icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSub, setOpenSub] = useState<number | null>(null);
  const pathname = usePathname();

  const isActive = (url: string) => pathname === url;

  const menuItems = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Shop", url: "/shop" },
    {
      name: "Categories",
      url: "/shop",
      submenu: [
        { name: "Web Development", url: "/shop" },
        { name: "SEO", url: "/shop" },
        { name: "Graphic Design", url: "/shop" },
      ],
    },
    { name: "Contact", url: "/contact-us" },
  ];

  return (
    <nav className="w-full bg-white relative z-50">
      {/* DESKTOP MENU */}
      <div className="hidden lg:flex justify-end gap-10 px-4 md:px-8">
        <ul className="flex gap-10">
          {menuItems.map((item, i) => (
            <li key={i} className="relative group">
              {/* Parent text */}
              <div className="flex items-center gap-1 font-medium cursor-pointer text-black hover:text-[#FF6A00]">
                <Link
                  href={item.url}
                  className={`${
                    isActive(item.url) ? "text-[#FF6A00]" : "text-black"
                  }`}
                >
                  {item.name}
                </Link>

                {item.submenu && <span className="ps-1">{menuDownArrow}</span>}
              </div>

              {/* Desktop Submenu */}
              {item.submenu && (
                <ul className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white shadow-md rounded-2xl min-w-[180px] z-50">
                  {item.submenu.map((sub, j) => (
                    <li key={j}>
                      <Link
                        href={sub.url}
                        className={`block px-4 py-2 font-medium hover:bg-blue-50 hover:text-[#FF6A00] ${
                          isActive(sub.url) ? "text-[#FF6A00]" : "text-black"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* MOBILE TOGGLE */}
      <div className="lg:hidden flex justify-end px-4 md:px-8">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? closeIcon : "☰"}
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
          <img src="../img/axto_logo.png" className="w-2/5" />
          <button className="text-2xl" onClick={() => setIsOpen(false)}>
            {closeIcon}
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-4">
          {menuItems.map((item, i) => (
            <li key={i}>
              <div className="flex justify-between items-center">
                <Link
                  href={item.url}
                  className={`font-medium ${
                    isActive(item.url) ? "text-[#FF6A00]" : "text-black"
                  }`}
                  onClick={() => !item.submenu && setIsOpen(false)}
                >
                  {item.name}
                </Link>

                {item.submenu && (
                  <button
                    onClick={() => setOpenSub(openSub === i ? null : i)}
                    className="text-gray-600"
                  >
                    {openSub === i ? "▲" : menuDownArrow}
                  </button>
                )}
              </div>

              {item.submenu && openSub === i && (
                <ul className="pl-4 mt-2 flex flex-col gap-2">
                  {item.submenu.map((sub, j) => (
                    <li key={j}>
                      <Link
                        href={sub.url}
                        className={`font-medium ${
                          isActive(sub.url) ? "text-[#FF6A00]" : "text-black"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Nav;
