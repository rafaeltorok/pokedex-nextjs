import Link from "next/link";
import Image from "next/image";

// Utils
import capitalize from "@/utils/capitalize";

// TypeScript types
import type { PokemonApiResource } from "@/types/types";

interface ItemProps {
  pokemon: PokemonApiResource;
  regionName: string;
}

export default function Item({ pokemon, regionName }: ItemProps) {
  return (
    <Link
      href={`/${regionName}/${pokemon.name}`}
      className="
        flex
        border-1 border-gray-500 rounded
        bg-gray-900
        p-2 m-2
        font-bold
        hover:bg-gray-700
        items-center
        h-[50px]
      "
    >
      <Image
        src={"/pokeball_icon.png"}
        alt="Pokéball logo"
        width={50}
        height={50}
        className="w-1/6 h-[30px] w-[30px]"
      />
      <li className="w-5/6">
        <span className="[-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)] text-xl">
          {capitalize(pokemon.name)}
        </span>
      </li>
    </Link>
  );
}
