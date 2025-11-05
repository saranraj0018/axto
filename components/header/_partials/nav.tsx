"use client";
import React, { useState } from "react";
import Link from "next/link";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Menu items array
  const menuItems = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200 relative z-50">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Toggle button (mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.url} className="hover:text-blue-600">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Sidebar Menu (mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            className="text-2xl focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.url}
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)} // close sidebar when link clicked
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Overlay background when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Nav;
