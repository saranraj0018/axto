"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CommonBanners from "@/components/others/CommonBanners";
import ImageGallery from "./_partials/ImageGallery";
import ProductInfo from "./_partials/ProductInfo";
import RelatedProducts from "./_partials/RelatedProducts";
import FeatureDescription from "./_partials/FeatureDescription";
import Reviews from "./_partials/Reviews";
const Page = () => {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!slug) return;
    const match = slug.match(/(.+)-(\d+)$/);
    if (!match) {

      setLoading(false);
      return;
    }

    fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/product/${slug}`
    )
        .then((res) => res.json())
        .then((res) => {
          setProduct(res.data);
        })
        .catch(() => setProduct(null))
        .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <>
      <CommonBanners />
      <div className="axto-container">
        <div className="grid grid-cols-12 gap-2 md:gap-8">
          {/* Product Images */}
          <div className="col-span-12 lg:col-span-5">
            <ImageGallery
                images={[product.cover_image, ...(product.list_image || [])]}
            />
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
            {activeTab === 0 && (
                <FeatureDescription features={product.features} />
            )}
            {activeTab === 1 && <Reviews reviews={product.reviews} />}
          </div>
        </div>

        <RelatedProducts products={product.related_products} />
      </div>
    </>
  );
};

export default Page;
