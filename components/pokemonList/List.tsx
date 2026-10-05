"use client";

// React
import { useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { RotatingLines } from "react-loader-spinner";

// Components
import Item from "./Item";

// TypeScript types
import type { PokemonApiResource } from "@/types/pokemon";
import type { SwipeEventData } from "react-swipeable";

interface ListProps {
  paginatedData: PokemonApiResource[];
  regionName: string;
  totalPages: number;
  currentPage: number;
  isPending: boolean;
  navigate: (pageNumber: number) => void;
}

export default function List({
  paginatedData,
  regionName,
  totalPages,
  currentPage,
  isPending,
  navigate,
}: ListProps) {
  // Handles keyboard navigation
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Left arrow key
      if (event.key === "ArrowLeft" && currentPage > 1) {
        navigate(currentPage - 1);
      }

      // Right arrow key
      if (event.key === "ArrowRight" && currentPage < totalPages) {
        navigate(currentPage + 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentPage, totalPages, navigate]);

  // Handles the Touch screen swipe to change the page
  const swipeHandler = useSwipeable({
    onSwiped: (eventData: SwipeEventData) => {
      // Previous page
      if (eventData.dir === "Right" && currentPage > 1) {
        navigate(currentPage - 1);
      }

      // Next page
      if (eventData.dir === "Left" && currentPage < totalPages) {
        navigate(currentPage + 1);
      }
    },
    delta: 50, // Define the min amount of pixels before a swipe is registered
  });

  return (
    <div
      {...swipeHandler}
      className={`
        w-[300px]
        mx-auto
        text-center
        relative
        ${isPending && "opacity-40 pointer-events-none"}
      `}
    >
      <ul>
        {paginatedData.map((p) => (
          <Item key={p.name} pokemon={p} regionName={regionName} />
        ))}
      </ul>

      {/* Renders a loading spinner when navigating through pages */}
      {isPending && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="48"
            visible={true}
          />
        </div>
      )}
    </div>
  );
}
