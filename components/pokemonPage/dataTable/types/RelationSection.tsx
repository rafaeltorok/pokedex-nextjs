// Utils
import capitalize from "@/utils/capitalize";

// TypeScript types
import type { DamageRelation } from "@/types/types";

interface RelationSectionProps {
  label: string;
  damageRelation: DamageRelation[];
}

export default function RelationSection({
  label,
  damageRelation,
}: RelationSectionProps) {
  const typeColor = (name: string) => `var(--type-${name})`;
  let bgSectionColor;

  if (label.includes("No")) {
    bgSectionColor = "500";
  } else if (label.includes("1/2")) {
    bgSectionColor = "600";
  } else {
    bgSectionColor = "700";
  }

  return (
    <div className={`bg-gray-${bgSectionColor} p-1 rounded`}>
      <p className="text-left [-webkit-text-stroke:0.35px_#303030]">{label}</p>

      {damageRelation.length === 0 ? (
        <p className="[-webkit-text-stroke:0.35px_#303030]">None</p>
      ) : (
        <div className="flex flex-wrap">
          {damageRelation.map((r) => (
            <div
              key={r.url}
              style={{
                backgroundImage: `linear-gradient(140deg, ${typeColor(r.name)} 65%, white 100%)`,
              }}
              className="
                p-2 m-1
                rounded-xl
                [-webkit-text-stroke:0.5px_#303030]
              "
            >
              {capitalize(r.name)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
