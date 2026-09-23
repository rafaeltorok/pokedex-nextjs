// Next.js
import { notFound } from "next/navigation";
import Image from "next/image";

// Services
import { getPokemons, getPokemon } from "@/services/pokemons";

// Utils
import capitalize from "@/utils/capitalize";

// Components
import SpritePicture from "@/components/PokemonPage/SpritePicture";

// Helper function
// Calculate the total sum of all base stats
const calculateTotalStats = (total: number, stat: { base_stat: number }) => {
  return total + stat.base_stat;
};

interface PokemonPageProps {
  pokeName: string;
  baseUrl: string;
};

export default async function Data({ pokeName, baseUrl }: PokemonPageProps) {
  const pokemonList = await getPokemons(baseUrl);
  const pokemon = pokemonList.find((p) => p.name === pokeName);

  if (!pokemon) {
    return notFound();
  }

  const pokemonData = await getPokemon(pokemon.url);

  return (
    <div
      className="
        flex flex-col
        mx-auto
        border-2 border-black
        bg-gradient-to-br from-red-700 via-red-600 to-white
        rounded-xl
        mt-10 mb-5
        justify-center
        p-1
        relative
      "
    >
      {/* Corner icons */}
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute top-[-8] left-[-8]"
      />
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute top-[-8] right-[-8]"
      />
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute bottom-[-8] left-[-8]"
      />
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute bottom-[-8] right-[-8]"
      />

      {/* Table title */}
      <div
        className="
          flex
          items-center
          text-center font-bold
          [-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)]
          bg-black
          py-4
          rounded-tl-xl rounded-tr-xl
        "
      >
        <span className="w-2/8 text-xl">
          {`# ${pokemonData.id}`}
        </span>
        <span className="w-6/8 text-2xl">
          {capitalize(pokemonData.name)}
        </span>
      </div>

      <SpritePicture url={pokemonData.sprites.other.home.front_default} />

      {/* Pokémon types section */}
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
              pokemon-type-${pokemonData.types[0].type.name} bg-[var(--pokemon-type-color)]
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

      {/* Stats section */}
      <div>
        {pokemonData.stats.map((s) => (
          <div key={s.stat.name} className="flex text-center">
            <p className="w-1/2 text-left border-1 border-gray-600 p-3 bg-gray-700">
              {capitalize(s.stat.name)}
            </p>
            <p className="w-1/2 border-1 border-gray-600 p-3 bg-gray-800">
              {s.base_stat}
            </p>
          </div>
        ))}
        <div className="flex text-center">
          <p className="w-1/2 text-left border-1 border-gray-600 p-3 bg-gray-700 rounded-bl-xl">
              Total
            </p>
            <p className="w-1/2 border-1 border-gray-600 p-3 bg-gray-800 rounded-br-xl">
              {pokemonData.stats.reduce(calculateTotalStats, 0)}
            </p>
        </div>
      </div>
    </div>
  );
}
