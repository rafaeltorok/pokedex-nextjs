"use client";

import { useEffect, useRef } from "react";

// Components
import RelationSection from "./RelationSection";

// TypeScript types
import type { DamageRelations } from "@/types/types";

interface RelationsProps {
  showDamageRelations: boolean;
  setShowDamageRelations: (show: boolean) => void;
  damageRelations: DamageRelations | null;
}

export default function Relations({
  showDamageRelations,
  setShowDamageRelations,
  damageRelations,
}: RelationsProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showDamageRelations) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [showDamageRelations]);

  return (
    <dialog
      ref={ref}
      className="
        justify-center
        align-center
        p-5
        bg-gray-800
        text-center text-yellow-300
        border-2 border-gray-600 rounded-xl
        mx-auto
        my-auto sm:my-5
        backdrop:bg-black/50
        backdrop:backdrop-blur-[3px]
      "
      onCancel={() => setShowDamageRelations(false)}
    >
      {damageRelations ? (
        <div className="min-w-[300px] max-w-[400px]">
          <div className="flex flex-col gap-2 mb-5">
            <p className="text-xl p-2 bg-gray-900">Attack</p>
            <RelationSection
              label="No damage to:"
              damageRelation={damageRelations.no_damage_to}
              classDefinition="bg-gray-500 p-1"
            />
            <RelationSection
              label="1/2 damage to:"
              damageRelation={damageRelations.half_damage_to}
              classDefinition="bg-gray-600 p-1"
            />
            <RelationSection
              label="2x damage to:"
              damageRelation={damageRelations.double_damage_to}
              classDefinition="bg-gray-700 p-1"
            />
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <p className="text-xl p-2 bg-gray-900">Defense</p>
            <RelationSection
              label="No damage from:"
              damageRelation={damageRelations.no_damage_from}
              classDefinition="bg-gray-500 p-1"
            />
            <RelationSection
              label="1/2 damage from:"
              damageRelation={damageRelations.half_damage_from}
              classDefinition="bg-gray-600 p-1"
            />
            <RelationSection
              label="2x damage from:"
              damageRelation={damageRelations.double_damage_from}
              classDefinition="bg-gray-700 p-1"
            />
          </div>
        </div>
      ) : (
        <p>No damage relations available.</p>
      )}
      
      <button
        className="
          border-1 border-gray-700 rounded
          bg-gray-900
          p-2
          hover:bg-gray-700 active:bg-gray-600
        "
        onClick={() => setShowDamageRelations(false)}
      >
        Close
      </button>
    </dialog>
  );
}
