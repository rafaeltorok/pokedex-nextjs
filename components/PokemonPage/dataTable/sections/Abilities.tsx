import capitalize from "@/utils/capitalize";

// TypeScript types
import type { PokemonAbility } from "@/types/types";

interface AbilitiesProps {
  abilities: PokemonAbility[];
}

export default function Abilities({ abilities }: AbilitiesProps) {
  // Handle the Pokémon abilities
  const normalAbility = abilities.find((ability) => !ability.is_hidden);
  const hiddenAbility = abilities.find(
    (ability) => ability.is_hidden === true,
  );

  return (
    <div className="w-full">
      <p className="text-center text-xl text-bold bg-gray-800 p-2">Abilities</p>
      <div className="flex flex-col">
        {normalAbility && renderRow("Normal ability", normalAbility.ability.name, !hiddenAbility)}
        {hiddenAbility && renderRow("Hidden ability", hiddenAbility.ability.name, true)}
      </div>
    </div>
  );
}

// Render each ability row when available
function renderRow(label: string, ability: string, isLast: boolean) {
  return (
    <div className="flex w-full">
      <p
        className={`
          w-1/2
          bg-gray-600
          p-2
          border-1 border-gray-500
          ${isLast ? "rounded-bl-xl" : ""}
        `}
      >
        {label}
      </p>
      <p
        className={`
          w-1/2
          bg-gray-800
          p-2
          text-center
          border-1 border-gray-500
          ${isLast ? "rounded-br-xl" : ""}
        `}
      >
        {capitalize(ability)}
      </p>
    </div>
  );
}
