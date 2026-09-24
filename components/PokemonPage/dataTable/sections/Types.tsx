import capitalize from "@/utils/capitalize";

// TypeScript types
import { PokemonType } from "@/types/types";

interface TypesProps {
  types: PokemonType[];
}

export default function Types({ types }: TypesProps) {
  const typeColor = (name: string) => `var(--type-${name})`;

  return (
    <div className="flex">
      {types.length === 1 ? (
        <p
          key={types[0].type.name}
          style={{
            backgroundImage: `linear-gradient(140deg, ${typeColor(types[0].type.name)} 50%, white 100%)`,
          }}
          className="
            w-full
            text-center
            font-bold
            p-3
            border-1
            border-gray-600
            [-webkit-text-stroke:0.25px_#303030]
          "
        >
          {capitalize(types[0].type.name)}
        </p>
      ) : (
        types.map((t) => (
          <p
            key={t.type.name}
            style={{
              backgroundImage: `linear-gradient(140deg, ${typeColor(t.type.name)} 50%, white 100%)`,
            }}
            className="
              w-1/2
              text-center
              font-bold
              p-3
              border-1
              border-gray-600
              [-webkit-text-stroke:0.25px_#303030]
            "
          >
            {capitalize(t.type.name)}
          </p>
        ))
      )}
    </div>
  );
}
