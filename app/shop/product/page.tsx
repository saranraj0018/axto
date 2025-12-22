"use client";

import CommonBanners from "@/components/others/CommonBanners";
import ImageGallery from "./_partials/ImageGallery";
import ProductInfo from "./_partials/ProductInfo";
import RelatedProducts from "./_partials/RelatedProducts";
import FeatureDescription from "./_partials/FeatureDescription";
import Reviews from "./_partials/Reviews";
import { useState } from "react";

const ShopProductItems = [
  {
    id: 1,
    title:
      "Cushion Backrest Support Compatible with : OLA GEN2 & 3, S1 / S1 Pro / S1 Air / S1X Plus",
    description:
      "Add comfort and safety to every ride with this ergonomically designed Cushion Backrest Support for your Ola scooter. Perfect for long rides or daily commuting, it provides enhanced lumbar support for pillion riders, reducing fatigue and improving posture.",
    itemCode: "BCK1001",
    category: "OLA ACCESSORIES",
    brand: "OLA",
    ratings: 4.5,
    stock: "In Stock",
    img: ["/img/home/P1.png", "/img/home/B1.png"],

    variations: [
      {
        id: "Type A",
        label: "Type A",
        regularPrice: 1200,
        sellingPrice: 950,
      },
      {
        id: "Type B",
        label: "Type B",
        regularPrice: 1500,
        sellingPrice: 1180,
      },
    ],

    url: "#",
  },
];

const Page = () => {
  const product = ShopProductItems[0];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <CommonBanners />
      <div className="axto-container">
        <div className="grid grid-cols-12 gap-2 md:gap-8">
          {/* Product Images */}
          <div className="col-span-12 lg:col-span-5">
            <ImageGallery images={product.img} />
          </div>

          {/* Product Info */}
          <div className="col-span-12 lg:col-span-7">
            <ProductInfo product={product} />
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-center gap-3 mb-4">
            <button
              className={`px-4 py-2 -mb-px font-medium text-sm md:text-base transition ${
                activeTab === 0
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(0)}
            >
              Feature/Description
            </button>

            <button
              className={`px-4 py-2 -mb-px font-medium text-sm md:text-base transition ${
                activeTab === 1
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(1)}
            >
              Reviews
            </button>
          </div>

          <div className="text-sm md:text-base text-gray-700">
            {activeTab === 0 && <FeatureDescription />}
            {activeTab === 1 && <Reviews />}
          </div>
        </div>

        <RelatedProducts />
      </div>
    </>
  );
};

export default Page;
