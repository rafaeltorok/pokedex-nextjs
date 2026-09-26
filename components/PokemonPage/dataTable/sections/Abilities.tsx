// Components
import AbilityRow from "./AbilityRow";

// TypeScript types
import type { AbilityData } from "@/types/types";

interface AbilitiesProps {
  normalAbility: AbilityData;
  hiddenAbility: AbilityData;
  setShowMessage: (show: boolean) => void;
  setMessage: (message: string) => void;
}

export default function Abilities({ normalAbility, hiddenAbility, setShowMessage, setMessage }: AbilitiesProps) {
  return (
    <div className="w-full">
      <p className="text-center text-xl text-bold bg-gray-800 p-2">Abilities</p>
      <div className="flex flex-col">
        {normalAbility &&
          <AbilityRow
            label="Normal ability"
            name={normalAbility.name}
            setShowMessage={setShowMessage}
            setMessage={setMessage}
            description={normalAbility.description}
          />
        }
        {hiddenAbility &&
          <AbilityRow
            label="Hidden ability"
            name={hiddenAbility.name}
            setShowMessage={setShowMessage}
            setMessage={setMessage}
            description={hiddenAbility.description}
          />
        }
      </div>
    </div>
  );
}
