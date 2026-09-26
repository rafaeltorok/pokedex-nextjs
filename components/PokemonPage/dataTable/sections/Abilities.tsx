// Services
import { getAbilityDescription } from "@/lib/data";

// Components
import AbilityRow from "./AbilityRow";

// TypeScript types
import type { PokemonAbility } from "@/types/types";

interface AbilitiesProps {
  abilities: PokemonAbility[];
}

export default function Abilities({ abilities }: AbilitiesProps) {
  // Handle the Pokémon abilities
  const normalAbility = abilities.find((ability) => !ability.is_hidden);
  const hiddenAbility = abilities.find((ability) => ability.is_hidden === true);

  return (
    <div className="w-full">
      <p className="text-center text-xl text-bold bg-gray-800 p-2">Abilities</p>
      <div className="flex flex-col">
        {normalAbility &&
          <AbilityRow
            label="Normal ability"
            name={normalAbility.ability.name}
            url={normalAbility.ability.url}
            showDescription={showDescription}
          />
        }
        {hiddenAbility &&
          <AbilityRow
            label="Hidden ability"
            name={hiddenAbility.ability.name}
            url={hiddenAbility.ability.url}
            showDescription={showDescription}
          />
        }
      </div>
    </div>
  );
}

async function showDescription(url: string) {
  const abilityDescription = await getAbilityDescription(url);
  const entry = abilityDescription.flavor_text_entries.find((entry) => {
    return entry.language.name === "en";
  });
  
  if (entry) {
    alert(`${entry.flavor_text}`);
  } else {
    alert("No description available");
  }
}
