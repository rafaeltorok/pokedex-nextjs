// Utils
import { findEvolutionNode } from "@/utils/evolution";

// Components
import EvolutionRow from "./EvolutionRow";

// TypeScript types
import type { EvolutionChain } from "@/types/types";

interface EvolutionProps {
  evolutionChain: EvolutionChain | null;
  currentName: string;
}

export default function Evolution({ evolutionChain, currentName }: EvolutionProps) {
  // Find the current Pokémon position inside of the evolution chain
  // to define if a Pokémon has any previous or next evolutions
  const node = evolutionChain
    ? findEvolutionNode(evolutionChain.chain, currentName)
    : null;

  if (!node) return null;

  // Isolate the previous and next evolutions of the Pokémon
  const { current, parent } = node;
  const evolvesTo = current.evolves_to;

  // Check if the Pokémon has no evolution chain
  // to display a custom UI message
  const doesNotEvolveAtAll = !parent && evolvesTo.length === 0;

  return (
    <div className="w-full">
      <p className="text-center text-xl text-bold bg-gray-800 p-2">Evolution</p>

      {doesNotEvolveAtAll ? (
        <p
          className="
            w-full
            text-center
            bg-gray-600
            p-1
            border-1 border-gray-500
            rounded-br-xl rounded-bl-xl
          "
        >
          Does not evolve
        </p>
      ) : (
        <>
          {parent && (
            <EvolutionRow
              label="From"
              name={parent.species.name}
              details={current.evolution_details}
            />
          )}

          {evolvesTo.map((e) => (
            <EvolutionRow
              key={e.species.name}
              label="To"
              name={e.species.name}
              details={e.evolution_details}
            />
          ))}
        </>
      )}
    </div>
  );
}
