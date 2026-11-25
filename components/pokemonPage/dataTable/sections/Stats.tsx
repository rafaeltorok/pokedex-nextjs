import capitalize from "@/utils/capitalize";

// TypeScript types
import type { PokemonStats } from "@/types/pokemon";

interface StatsProps {
  stats: PokemonStats[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="flex lg:h-[435px] flex-col">
      <p className="text-center text-xl text-bold bg-gray-800 p-2 my-auto lg:h-[60px] lg:pt-3">
        Stats
      </p>
      {stats.map((s) => (
        <div
          key={s.stat.name}
          className="flex text-center lg:h-[70px]"
          aria-label="Stat row"
        >
          <p
            className="w-1/2 text-left border-1 border-gray-500 p-2 bg-gray-600"
            aria-label="Stat name"
          >
            {capitalize(s.stat.name)}
          </p>
          <p
            className="w-1/2 border-1 border-gray-500 p-2 bg-gray-800"
            aria-label="Stat value"
          >
            {s.base_stat}
          </p>
        </div>
      ))}
      <div className="flex text-center" aria-label="Stat row">
        <p
          className="w-1/2 text-left border-1 border-gray-500 p-2 bg-gray-600"
          aria-label="Stat name"
        >
          Total
        </p>
        <p
          className="w-1/2 border-1 border-gray-500 p-2 bg-gray-800"
          aria-label="Stat value"
        >
          {stats.reduce(calculateTotalStats, 0)}
        </p>
      </div>
    </div>
  );
}

// Helper function
// Calculate the total sum of all base stats
function calculateTotalStats(total: number, stat: { base_stat: number }) {
  return total + stat.base_stat;
}
