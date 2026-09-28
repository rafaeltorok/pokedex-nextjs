import capitalize from "@/utils/capitalize";

// TypeScript types
import type { TypeDetails, DamageRelations } from "@/types/types";

interface TypesProps {
  types: TypeDetails[];
  setDamageRelations: (relations: DamageRelations) => void;
  setShowDamageRelations: (show: boolean) => void;
}

export default function Types({
  types,
  setDamageRelations,
  setShowDamageRelations,
}: TypesProps) {
  const typeColor = (name: string) => `var(--type-${name})`;

  return (
    <div className="flex">
      {types.length === 1 ? (
        <button
          type="button"
          style={{
            backgroundImage: `linear-gradient(140deg, ${typeColor(types[0].name)} 50%, white 100%)`,
          }}
          className="
            w-full
            text-center
            font-bold
            p-3
            border-2
            border-gray-600
            [-webkit-text-stroke:0.25px_#303030]
            hover:border-white active:border-black
          "
          onClick={() => {
            setDamageRelations(types[0].damage_relations);
            setShowDamageRelations(true);
          }}
        >
          {capitalize(types[0].name)}
        </button>
      ) : (
        types.map((t) => (
          <button
            key={t.name}
            type="button"
            style={{
              backgroundImage: `linear-gradient(140deg, ${typeColor(t.name)} 50%, white 100%)`,
            }}
            className="
              w-1/2
              text-center
              font-bold
              p-3
              border-1
              border-gray-600
              [-webkit-text-stroke:0.25px_#303030]
              hover:border-white active:border-black
            "
            onClick={() => {
              setDamageRelations(t.damage_relations);
              setShowDamageRelations(true);
            }}
          >
            {capitalize(t.name)}
          </button>
        ))
      )}
    </div>
  );
}
