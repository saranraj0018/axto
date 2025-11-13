"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CommonBanners = () => {
  const pathname = usePathname();

  // Split and format path segments
  const segments = pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    );

  // Define breadcrumb items (fallback to "Home" if no path)
  const breadcrumbItems = segments.length ? segments : ["Home"];

  return (
    <div>
      <div className="py-8 font-semibold bg-[#FAFAFA] axto-container">
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
