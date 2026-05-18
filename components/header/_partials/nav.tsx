"use client";
import { useEffect, useState } from "react";
import { menuDownArrow, closeIcon } from "../../all_icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
  id: number;
  name: string;
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSub, setOpenSub] = useState<number | null>(null);
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/category/list`
        );
        const json = await res.json();

        if (json.status === 200) {
          setCategories(json.data);
        }
      } catch (error) {
        console.error("Category fetch error", error);
      }
    };

    fetchCategories();
  }, []);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Active menu checker
  const isActive = (item: any) => {
    // Shop active only for /shop
    if (item.name === "Shop") {
      return pathname === "/shop";
    }

    // Categories active only for category pages
    if (item.name === "Categories") {
      return pathname.startsWith("/shop/category");
    }

    return pathname === item.url;
  };

  const menuItems = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    {
      name: "Categories",
      url: "/shop",
      submenu: categories.map((cat) => ({
        name: cat.name,
        url: `/shop/category/${cat.name}`,
      })),
    },
    { name: "Contact", url: "/contact-us" },
    { name: "About", url: "/about" },
  ];

  return (
      <nav className="w-full relative z-50">

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex justify-end">
          <ul className="flex items-center gap-8">

            {menuItems.map((item, i) => (
                <li key={i} className="relative group">

                  {/* Parent Menu */}
                  <div className="flex items-center gap-1">

                    <Link
                        href={item.url}
                        className={`font-medium transition duration-200 hover:text-[#FF6A00]
                  ${
                            isActive(item)
                                ? "text-[#FF6A00]"
                                : "text-black"
                        }`}
                    >
                      {item.name}
                    </Link>

                    {item.submenu && (
                        <span className="cursor-pointer">
                    {menuDownArrow}
                  </span>
                    )}
                  </div>

                  {/* Desktop Dropdown */}
                  {item.submenu && (
                      <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl rounded-xl min-w-[220px] py-2 z-50">

                        {item.submenu.map((sub, j) => (
                            <li key={j}>
                              <Link
                                  href={sub.url}
                                  className={`block px-4 py-2 text-sm font-medium transition hover:bg-gray-100 hover:text-[#FF6A00]
                        ${
                                      pathname === sub.url
                                          ? "text-[#FF6A00]"
                                          : "text-black"
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

        {/* MOBILE MENU BUTTON */}
        <div className="lg:hidden flex justify-end">
          <button
              onClick={() => setIsOpen(true)}
              className="text-3xl text-black"
          >
            ☰
          </button>
        </div>

        {/* MOBILE SIDEBAR */}
        <div
            className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b">

            <img
                src="/img/axto_logo.png"
                alt="logo"
                className="w-28 object-contain"
            />

            <button
                className="text-2xl"
                onClick={() => setIsOpen(false)}
            >
              {closeIcon}
            </button>
          </div>

          {/* Mobile Menu */}
          <ul className="flex flex-col p-5 gap-5">

            {menuItems.map((item, i) => (
                <li key={i}>

                  <div className="flex items-center justify-between">

                    <Link
                        href={item.url}
                        className={`font-medium text-[16px]
                  ${
                            isActive(item)
                                ? "text-[#FF6A00]"
                                : "text-black"
                        }`}
                        onClick={() => !item.submenu && setIsOpen(false)}
                    >
                      {item.name}
                    </Link>

                    {item.submenu && (
                        <button
                            onClick={() =>
                                setOpenSub(openSub === i ? null : i)
                            }
                            className="text-lg"
                        >
                          {openSub === i ? "−" : "+"}
                        </button>
                    )}
                  </div>

                  {/* Mobile Submenu */}
                  {item.submenu && openSub === i && (
                      <ul className="mt-3 ml-3 flex flex-col gap-3 border-l pl-3">

                        {item.submenu.map((sub, j) => (
                            <li key={j}>
                              <Link
                                  href={sub.url}
                                  className={`text-sm font-medium
                        ${
                                      pathname === sub.url
                                          ? "text-[#FF6A00]"
                                          : "text-gray-700"
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
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
            />
        )}
      </nav>
  );
};

export default Nav;