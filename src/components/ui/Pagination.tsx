"use client";

import Link from "next/link";
import clsx from "clsx";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import { generatePaginationNumbers } from "@/utils/generatePaginationNumbers";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`; //   href="/kid";
    }

    if (+pageNumber > totalPages) {
      // Next >
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="">
      <nav aria-label="Pagicación">
        <ul className="flex items-center gap-2">
          <li className="">
            <Link
              className="py-1.5 px-1.5 bg-gray-200 block rounded text-gray-800 hover:bg-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={20} />
            </Link>
          </li>

          {allPages.map((page, index) => (
            <li key={page} className="page-item">
              <Link
                className={clsx(
                  "px-3 py-1.5 rounded hover:bg-indigo-700 transition-colors",
                  {
                    "bg-indigo-600 shadow-sm text-white hover:text-white ":
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="py-1.5 px-1.5 bg-gray-200 block rounded text-gray-800 hover:bg-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={20} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
