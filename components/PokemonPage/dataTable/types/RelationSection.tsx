// Utils
import capitalize from "@/utils/capitalize";

// TypeScript types
import type { DamageRelation } from "@/types/types";

interface RelationSectionProps {
  label: string;
  damageRelation: DamageRelation[];
  classDefinition: string;
}

export default function RelationSection({ label, damageRelation, classDefinition }: RelationSectionProps) {
  const relationList = damageRelation.map((r) => capitalize(r.name)).join(", ");

  return (
    <div className={classDefinition}>
      <p className="text-left">{label}</p>
      {damageRelation.length === 0 ? (
        <p>None</p>
      ) : (
        <div>
          <p>{relationList}</p>
        </div>
      )}
    </div>
  );
}
