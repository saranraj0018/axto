"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CommonBanners = () => {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    );

  const breadcrumbItems = segments.length ? segments : ["Home"];

  return (
    <div className="sticky top-0 z-20 bg-[#FAFAFA]">
      <div className="py-5 font-medium axto-container">
        <div className="text-lg text-gray-700">
          <Link href="/" className="hover:underline text-gray-500">
            Home
          </Link>

          {breadcrumbItems.map((item, index) => (
            <span key={index}>
              {" / "}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-900">{item}</span>
              ) : (
                <Link
                  href={
                    "/" +
                    breadcrumbItems
                      .slice(0, index + 1)
                      .join("/")
                      .toLowerCase()
                  }
                  className="hover:underline text-gray-500"
                >
                  {item}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonBanners;
