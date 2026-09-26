// Components
import Item from "./Item";

// TypeScript types
import type { PokemonApiResource } from "@/types/types";

interface ListProps {
  paginatedData: PokemonApiResource[];
  regionName: string;
}

export default function List({ paginatedData, regionName }: ListProps) { 
  return (
    <div
      className="w-[300px] mx-auto text-center"
    >
      <ul>
        {paginatedData.map((p) => (
          <Item key={p.name} pokemon={p} regionName={regionName} />
        ))}
      </ul>
    </div>
  );
}
