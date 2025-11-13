"use client";
import { useState } from "react";
import { menuDownArrow } from "../../all_icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 
  
  // Menu items with optional submenu
  const menuItems = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Shop", url: "/shop" },
    {
      name: "Services",
      url: "/services",
      submenu: [
        { name: "Web Development", url: "/services/web-development" },
        { name: "SEO", url: "/services/seo" },
        { name: "Graphic Design", url: "/services/graphic-design" },
      ],
    },
    { name: "Contact", url: "/contact-us" },
  ];

  
  const isActive = (url: string) => pathname === url;

  return (
    <nav className="w-full bg-white relative z-50">
      <div className="flex items-center justify-end lg:justify-between px-4 md:px-8">
        {/* Mobile toggle */}
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Desktop menu */}
        <ul className="hidden lg:flex gap-10">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group">
              {/* Parent text + arrow */}
              <div className="flex items-center gap-1 cursor-pointer font-semibold text-black hover:text-[#FF6A00]">
                <Link
                  href={item.url}
                  className={`${
                    isActive(item.url) ? "text-[#FF6A00]" : "text-black"
                  }`}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <span className="text-sm ps-2 -mb-0.5">{menuDownArrow}</span>
                )}
              </div>

              {/* Submenu */}
              {item.submenu && (
                <ul className="absolute left-0 top-full mt-1 hidden group-hover:block bg-zinc-50 shadow-md rounded-2xl min-w-[180px] z-50">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={subItem.url}
                        className={`block px-4 py-2 font-semibold hover:text-[#FF6A00] hover:bg-blue-50 ${
                          isActive(subItem.url)
                            ? "text-[#FF6A00]"
                            : "text-black"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
          <img src="../img/axto_logo.png" alt="Logo" className="w-2/5" />
          <button className="text-2xl" onClick={() => setIsOpen(false)}>
            ✖
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-4">
          {menuItems.map((item, index) => {
            const [isSubOpen, setIsSubOpen] = useState(false);

            return (
              <li key={index}>
                <div className="flex justify-between items-center">
                  <Link
                    href={item.url}
                    className={`block font-semibold ${
                      isActive(item.url) ? "text-[#FF6A00]" : "text-black"
                    } hover:text-[#FF6A00]`}
                    onClick={() => {
                      if (!item.submenu) setIsOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>

                  {/* Mobile submenu toggle */}
                  {item.submenu && (
                    <button
                      className="text-gray-500 focus:outline-none"
                      onClick={() => setIsSubOpen(!isSubOpen)}
                    >
                      {isSubOpen ? "▲" : menuDownArrow}
                    </button>
                  )}
                </div>

                {/* Mobile submenu */}
                {item.submenu && isSubOpen && (
                  <ul className="pl-4 mt-2 flex flex-col gap-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.url}
                          className={`block font-semibold ${
                            isActive(subItem.url)
                              ? "text-[#FF6A00]"
                              : "text-black"
                          } hover:text-[#FF6A00]`}
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0a0a0ad6] z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Nav;