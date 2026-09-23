"use client";

import generatePagination from "@/utils/generatePagination";
import { usePathname, useSearchParams } from "next/navigation";
import PaginationNumber from "./PaginationNumber";
import PaginationArrow from "./PaginationArrow";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // If the page number is not present on the URL, default to 1
  const currentPage = Number(searchParams.get("page")) || 1;

  // Insert the page number into the URL
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  const allPages = generatePagination(Number(currentPage), totalPages);

  return (
    <>
      <div className="inline-flex mt-3 mb-5">
        {/* Render the left navigation arrow */}
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        {/* Render all of the page numbers */}
        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        {/* Render the right navigation arrow */}
        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}
