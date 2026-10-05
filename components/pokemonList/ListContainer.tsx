"use client";

import useNavigation from "@/hooks/useNavigation";

// Components
import List from "./List";
import Pagination from "./pagination/Pagination";

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
      <List
        paginatedData={paginatedData}
        regionName={regionName}
        totalPages={totalPages}
        currentPage={currentPage}
        isPending={isPending}
        navigate={navigate}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        isPending={isPending}
        navigate={navigate}
      />
    </div>
  );
}
