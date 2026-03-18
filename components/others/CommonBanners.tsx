"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const CommonBanners = () => {
  const pathname = usePathname();
  const [validPaths, setValidPaths] = useState<string[]>([]);

  const segments = pathname.split("/").filter(Boolean);

  useEffect(() => {
    const checkPaths = async () => {
      const paths: string[] = [];
      let currentPath = "";

      for (let i = 0; i < segments.length; i++) {
        currentPath += "/" + segments[i];

        try {
          const res = await fetch(currentPath, {
            method: "HEAD",
          });

          if (res.ok) {
            paths.push(currentPath);
          } else {
            break; // stop if invalid path
          }
        } catch {
          break;
        }
      }

      setValidPaths(paths);
    };

    if (segments.length) {
      checkPaths();
    }
  }, [pathname]);

  return (
      // <div className="sticky top-28 md:top-36 lg:top-20 z-10 bg-[#FAFAFA]">
        <div className="sticky z-10 bg-[#FAFAFA]">
        <div className="py-5 font-medium axto-container">
          <div className="text-lg text-gray-700">
            <Link href="/" className="hover:underline text-gray-500">
              Home
            </Link>

            {segments.map((segment, index) => {
              const label =
                  segment.charAt(0).toUpperCase() +
                  segment.slice(1).replace(/-/g, " ");

              const href =
                  "/" + segments.slice(0, index + 1).join("/");

              const isValid = validPaths.includes(href);
              const isLast = index === segments.length - 1;

              return (
                  <span key={index}>
                {" / "}
                    {isLast || !isValid ? (
                        <span className="text-gray-900">
                    {label}
                  </span>
                    ) : (
                        <Link
                            href={href}
                            className="hover:underline text-gray-500"
                        >
                          {label}
                        </Link>
                    )}
              </span>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default CommonBanners;