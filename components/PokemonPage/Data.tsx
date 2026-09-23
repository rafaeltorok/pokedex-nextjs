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

  // Get the Pokémon data from the API
  const pokemonData = await getPokemon(pokemon.url);

  // Define the gradient colors based on the Pokémon types
  const typeNames = pokemonData.types.map((t) => t.type.name);
  const typeColor = (name: string) => `var(--type-${name})`;
  const strong = (name: string) =>
    `color-mix(in srgb, var(--type-${name}), black 15%)`;

  const gradient = typeNames[1]
    ? `linear-gradient(to bottom right, ${strong(typeNames[0])} 40%, ${strong(typeNames[1])} 60%)`
    : `linear-gradient(to bottom right, ${strong(typeNames[0])} 50%, white 100%)`;

  return (
    <div
      style={{ backgroundImage: gradient }}
      className={`
        flex flex-col
        mx-auto
        rounded-xl
        mt-10 mb-5
        justify-center
        p-1
        relative
      `}
    >
      {/* Corner icons */}
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute -top-2 -left-2"
      />
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute -top-2 -right-2"
      />
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute -bottom-2 -left-2"
      />
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute -bottom-2 -right-2"
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
            style={{
              backgroundImage: `linear-gradient(140deg, ${typeColor(pokemonData.types[0].type.name)} 50%, white 100%)`,
            }}
            className="
              w-full
              text-center
              font-bold
              p-3
              border-1
              border-gray-600
              [-webkit-text-stroke:0.35px_#303030]
            "
          >
            {capitalize(pokemonData.types[0].type.name)}
          </p>
        ) : (
          pokemonData.types.map((t) => (
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
                [-webkit-text-stroke:0.35px_#303030]
              "
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
