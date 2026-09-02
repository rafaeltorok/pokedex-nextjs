// Next.js
import { notFound } from "next/navigation";
import Image from "next/image";

// Services
import { getPokemons, getPokemon } from "@/services/pokemons";

// Utils
import capitalize from "@/utils/capitalize";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemonList = await getPokemons();

  const pokemon = pokemonList.find((p) => p.name === name);

  if (!pokemon) {
    return notFound();
  }

  const pokemonData = await getPokemon(pokemon.url);

  return (
    <div className="flex justify-center flex-col mx-auto border-2 border-yellow bg-gray-900 rounded-xl mt-10 mb-5">
      <p className="text-center font-bold text-2xl [-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)] bg-black p-3 border-3 border-black rounded-xl">
        {capitalize(pokemonData.name)}
      </p>

      <Image
        src={pokemonData.sprites.other.home.front_default}
        width={300}
        height={300}
        alt="Pokémon picture"
        className="p-5"
      />

      <div className="flex">
        {pokemonData.types.length === 1 ? (
          <p
            key={pokemonData.types[0].type.name}
            className={`
              w-full
              text-center
              font-bold
              p-3
              border-1
              border-gray-600
              pokemonData-type-${pokemonData.types[0].type.name} bg-[var(--pokemon-type-color)]
              [-webkit-text-stroke:0.35px_#303030]
            `}
          >
            {capitalize(pokemonData.types[0].type.name)}
          </p>
        ) : (
          pokemonData.types.map((t) => (
            <p
              key={t.type.name}
              className={`
                w-1/2
                text-center
                font-bold
                p-3
                border-1
                border-gray-600
                pokemon-type-${t.type.name} bg-[var(--pokemon-type-color)]
                [-webkit-text-stroke:0.35px_#303030]
              `}
            >
              {capitalize(t.type.name)}
            </p>
          ))
        )}
      </div>

      <div>
        {pokemonData.stats.map((s) => (
          <div key={s.stat.name} className="flex text-center">
            <p className="w-1/2 text-left border-1 border-gray-600 p-3 bg-gray-700">
              {s.stat.name}
            </p>
            <p className="w-1/2 border-1 border-gray-600 p-3 bg-gray-800">
              {s.base_stat}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
