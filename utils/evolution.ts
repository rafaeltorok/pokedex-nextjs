// TypeScript types
import type { ChainLink } from "@/types/types"

interface EvolutionNode {
  current: ChainLink;
  parent: ChainLink | null;
}

// Recursively looks into the evolution chain
// to determine which form a Pokémon evolves to
export function findEvolutionNode(
  chain: ChainLink,
  targetName: string,
  parent: ChainLink | null = null,
): EvolutionNode | null {
  if (chain.species.name === targetName) {
    return { current: chain, parent };
  }

  // Determine if a Pokémon has yet another evolution
  for (const child of chain.evolves_to) {
    const found = findEvolutionNode(child, targetName, chain);
    if (found) return found;
  }

  // If it does not evolve, return
  return null;
}
