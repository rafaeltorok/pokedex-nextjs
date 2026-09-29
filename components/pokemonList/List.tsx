"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// React
import { useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";

// Components
import Item from "./Item";

// TypeScript types
import type { PokemonApiResource } from "@/types/types";
import type { SwipeEventData } from "react-swipeable";

interface ListProps {
  paginatedData: PokemonApiResource[];
  regionName: string;
  searchQuery: string | undefined;
  totalPages: number;
  currentPage: number;
}

export default function List({
  paginatedData,
  regionName,
  searchQuery,
  totalPages,
  currentPage,
}: ListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Navigates to either the previous or next page within the Pokédex list
  const handlePageNavigation = useCallback(
    (direction: "prev" | "next") => {
      const params = new URLSearchParams(searchParams);
      let goToPage = 1;

      if (direction === "prev") {
        goToPage = currentPage - 1;
      } else if (direction === "next") {
        goToPage = currentPage + 1;
      }

      // Set the page number into the URL
      params.set("page", goToPage.toString());

      // If a search term is available, insert it into the URL
      if (searchQuery) params.set("query", searchQuery);

      // Navigate to the new route
      router.push(`${pathname}?${params.toString()}`);
    },
    [currentPage, pathname, searchParams, router, searchQuery],
  );

  // Handles keyboard navigation
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Left arrow key
      if (event.key === "ArrowLeft" && currentPage > 1) {
        handlePageNavigation("prev");
      }

      // Right arrow key
      if (event.key === "ArrowRight" && currentPage < totalPages) {
        handlePageNavigation("next");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentPage, totalPages, handlePageNavigation]);

  // Handles the Touch screen swipe to change the page
  const swipeHandler = useSwipeable({
    onSwiped: (eventData: SwipeEventData) => {
      // Previous page
      if (eventData.dir === "Right" && currentPage > 1) {
        handlePageNavigation("prev");
      }

      // Next page
      if (eventData.dir === "Left" && currentPage < totalPages) {
        handlePageNavigation("next");
      }
    },
    delta: 100, // Define the min amount of pixels before a swipe is registered
  });

  return (
    <div {...swipeHandler} className="w-[300px] mx-auto text-center">
      <ul>
        {paginatedData.map((p) => (
          <Item key={p.name} pokemon={p} regionName={regionName} />
        ))}
      </ul>
    </div>
  );
}
