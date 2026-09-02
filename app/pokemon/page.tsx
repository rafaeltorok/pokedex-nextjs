import Link from "next/link";

// Services
import { getPokemons } from "@/services/pokemons";

// Utils
import capitalize from "@/utils/capitalize";

export default async function PokemonList() {
  const pokemons = await getPokemons();

  return (
    <>
      <ul className="w-[300px] mx-auto text-center">
        {pokemons.map((p) => (
          <li
            key={p.name}
            className="border-1 border-gray-500 rounded bg-gray-900 p-2 m-2 font-bold hover:bg-gray-700"
          >
            <Link href={`/pokemon/${p.name}`}>
              <span className="[-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)]">
                {capitalize(p.name)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
