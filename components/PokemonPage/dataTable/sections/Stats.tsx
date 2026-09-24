import capitalize from "@/utils/capitalize";

// TypeScript types
import type { PokemonStats } from "@/types/types";

interface StatsProps {
  stats: PokemonStats[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div>
      <p className="text-center text-xl text-bold bg-gray-800 p-2">Stats</p>
      {stats.map((s) => (
        <div key={s.stat.name} className="flex text-center">
          <p className="w-1/2 text-left border-1 border-gray-500 p-2 bg-gray-600">
            {capitalize(s.stat.name)}
          </p>
          <p className="w-1/2 border-1 border-gray-500 p-2 bg-gray-800">
            {s.base_stat}
          </p>
        </div>
      ))}
      <div className="flex text-center">
        <p className="w-1/2 text-left border-1 border-gray-500 p-2 bg-gray-600">
          Total
        </p>
        <p className="w-1/2 border-1 border-gray-500 p-2 bg-gray-800">
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
};
