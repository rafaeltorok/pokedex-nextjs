// Utils
import capitalize from "@/utils/capitalize";

// TypeScript types
import type { EvolutionDetails } from "@/types/types";

interface EvolutionRowProps {
  label: string;
  name: string;
  details: EvolutionDetails[];
}

export default function EvolutionRow({ label, name, details }: EvolutionRowProps) {
  return (
    <div className="flex w-full">
      <p
        className="
          w-1/5
          text-center
          bg-gray-600
          p-1
          border-1 border-gray-500
        "
      >
        {label}
      </p>
      <p
        className="
          w-2/5
          text-center
          bg-gray-800
          p-1
          border-1 border-gray-500
        "
      >
        {capitalize(name)}
      </p>
      <p
        className="
          w-2/5
          text-center
          bg-gray-700
          p-1
          border-1 border-gray-500
        "
      >
        {describeEvolution(details)}
      </p>
    </div>
  );
}

// Define a custom naming scheme to each evolution type
function describeEvolution(details: EvolutionDetails[]): string {
  const detail = details[0];

  // If it does not evolve, return
  if (!detail) return "";

  // Level-up evolution type
  if (detail.min_level) return `Lv. ${detail.min_level}`;

  // Trade evolution type
  if (detail.trigger?.name === "trade") return "Trade";

  // Item evolution
  if (detail.item) return capitalize(detail.item.name);

  // Other types
  return capitalize(detail.trigger?.name ?? "");
}
