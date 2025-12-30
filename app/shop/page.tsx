"use client";

import { useState, useEffect } from "react";
import Sidebar from "./_partials/Sidebar";
import Topbar from "./_partials/Topbar";
import Content from "./_partials/Content";
import CommonBanners from "@/components/others/CommonBanners";
import { LeftArrowIcon, RightArrowIcon } from "@/components/all_icons";

type Product = {
  id: number;
  title: string;
  item_code?: string;
  ratings: number;
  sellingPrice: number;
  regularPrice: number;
  category: string;
  brand: string;
  discount: number;
  img: string;
};

type ShopPageProps = {
  initialCategory?: string;
  initialBrand?: string;
};


const ShopPage = ({ initialCategory, initialBrand }: ShopPageProps) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  type Filters = {
    category: string[];
    brand: string[];
    discount: string[];
    ratings: string[];
    price: number[];
    search: string;
    sort: string;
  };

  const [filters, setFilters] = useState<Filters>({
    category: initialCategory ? [initialCategory] : [],
    brand: initialBrand ? [initialBrand] : [],
    discount: [],
    ratings: [],
    price: [0, 0],
    search: "",
    sort: "",
  });


  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);

  /* Fetch products */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/product/list`)
        .then((res) => res.json())
        .then((res) => {
          setProducts(res.data || []);
          setFilteredProducts(res.data || []);
        })
        .finally(() => setLoading(false));
  }, []);

  /* Filtering */
  useEffect(() => {
    let temp = [...products];
    if (filters.discount.length > 0) {
      temp = temp.filter((p) =>
          filters.discount.some((d) => {
            const [min, max] = d
                .replace("%", "")
                .split("-")
                .map((v) => Number(v.trim()));

            return p.discount >= min && p.discount < max;
          })
      );
    }


    if (filters.category.length > 0) {
      temp = temp.filter((p) => filters.category.includes(p.category));
    }

    if (filters.brand.length > 0) {
      temp = temp.filter((p) => filters.brand.includes(p.brand));
    }


    if (filters.ratings.length) {

      temp = temp.filter((p) =>
          filters.ratings.includes(Math.floor(p.ratings).toString())
      );
    }

    if (filters.price[0] > 0)
      temp = temp.filter((p) => p.sellingPrice >= filters.price[0]);

    if (filters.price[1] > 0)
      temp = temp.filter((p) => p.sellingPrice <= filters.price[1]);

    if (filters.search) {
      const q = filters.search.toLowerCase();
      temp = temp.filter(
          (p) =>
              p.title.toLowerCase().includes(q) ||
              p.item_code?.toLowerCase().includes(q)
      );
    }

    if (filters.sort === "price-asc")
      temp.sort((a, b) => a.sellingPrice - b.sellingPrice);

    if (filters.sort === "price-desc")
      temp.sort((a, b) => b.sellingPrice - a.sellingPrice);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [filters, products]);

  /* Pagination */
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
      <>
        <CommonBanners />

        <div className="axto-container flex flex-col md:flex-row gap-6 my-10">
          <Sidebar filters={filters} setFilters={setFilters}  products={products}/>

          <div className="flex-1 space-y-4">
            <Topbar
                filters={filters}
                setFilters={setFilters}
                totalProducts={filteredProducts.length}
            />

            <Content products={currentProducts} />

            <div className="flex justify-center gap-2 mt-4">
              <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
              >
                {LeftArrowIcon}
              </button>

              <span>{currentPage} / {totalPages}</span>

              <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
              >
                {RightArrowIcon}
              </button>
            </div>
          </div>
        </div>
      </>
  );
};

export default ShopPage;
