"use client";

import useNavigation from "@/hooks/useNavigation";
import { RotatingLines } from "react-loader-spinner";

// Components
import List from "./List";
import Pagination from "./pagination/Pagination";
import Limit from "./Limit";

// TypeScript type
import type { PokemonApiResource } from "@/types/pokemon";

interface ListContainerProps {
  paginatedData: PokemonApiResource[];
  regionName: string;
  totalPages: number;
  currentPage: number;
}

export default function ListContainer({
  paginatedData,
  regionName,
  totalPages,
  currentPage,
}: ListContainerProps) {
  const { isPending, navigate } = useNavigation();

  return (
    <div>
      {/* Controls the amount of Pokémons per page */}
      <Limit />

      {/* Paginated Pokémons list */}
      <List
        paginatedData={paginatedData}
        regionName={regionName}
        totalPages={totalPages}
        currentPage={currentPage}
        isPending={isPending}
        navigate={navigate}
      />

      {/* Page navigation controls */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        isPending={isPending}
        navigate={navigate}
      />

      {/* Renders a loading spinner when navigating through pages */}
      {isPending && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100">
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
