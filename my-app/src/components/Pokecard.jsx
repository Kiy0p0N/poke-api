import { useEffect, useState } from "react";
import { nextPokemon, prevPokemon } from "../services/pokeapi";
import PokemonTypes from "./PokemonTypes";
import PokeImg from "./PokeImg";
import PokeStats from "./PokeStats";
import PokeEvolution from "./PokeEvolution";

/**
 * Pokecard Component
 *
 * Displays a detailed Pokémon information card.
 * Includes image, types, flavor text, height, weight,
 * habitat, stats (radar chart), and evolution chain.
 * Also provides navigation to previous and next Pokémon.
 */
function Pokecard({ data }) {

  // State to store next and previous Pokémon data
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  /**
   * useEffect - Fetches next and previous Pokémon when the current Pokémon data changes.
   */
  useEffect(() => {
    if (!data) return;

    async function fetchNeighbors() {
      const nextP = await nextPokemon(data.pokemon.id);
      const prevP = await prevPokemon(data.pokemon.id);

      setNext(nextP);
      setPrev(prevP);
    }

    fetchNeighbors();
  }, [data]);

  // If next or previous Pokémon are not yet loaded, render empty div to avoid errors
  if (!next || !prev) {
    return <div></div>;
  }

  return (
    <div className="w-full flex justify-center lg:px-30">
      <div className="flex h-auto w-14/15 flex-col bg-white ">
        <div className="flex flex-col">
          {/* Navigation buttons for previous and next Pokémon */}
          <div className="flex h-auto w-full gap-1 uppercase">
            {/* Previous Pokémon Button */}
            <a
              href={`/pokemon/${prev.name}`}
              className="flex flex-1/2 flex-col items-center bg-zinc-300 p-4 font-semibold duration-500 hover:bg-red-400 hover:text-white"
            >
              <h3 className="text-sm font-bold">{prev.name}</h3>
              <h4 className="text-[12px] font-medium text-zinc-500">N° {prev.id}</h4>
            </a>

            {/* Next Pokémon Button */}
            <a
              href={`/pokemon/${next.name}`}
              className="flex flex-1/2 flex-col items-center bg-zinc-300 p-4 font-semibold duration-500 hover:bg-red-400 hover:text-white"
            >
              <h3 className="text-sm font-bold">{next.name}</h3>
              <h4 className="text-[12px] font-medium text-zinc-500">N° {next.id}</h4>
            </a>
          </div>

          {/* Pokémon Name and Pokédex Number */}
          <div className="flex w-full flex-col items-center justify-center uppercase">
            <h1 className="text-2xl font-bold">{data.pokemon.name}</h1>
            <h2 className="text-xl font-semibold text-gray-500">
              N° {data.pokemon.id}
            </h2>
          </div>
        </div>

        <div className="block h-full w-full justify-center md:flex md:h-96">
          {/* Pokémon Image Section */}
          <div className="flex h-auto w-full justify-center p-2 md:flex-1/2 md:justify-end">
            <PokeImg
              sprites={data.pokemon.sprites}
              name={data.pokemon.name}
              types={data.pokemon.types}
            />
          </div>

          {/* Pokémon Information Section */}
          <div className="flex w-full justify-start p-4 md:w-1/2">
            <div className="flex w-full flex-col gap-4 overflow-y-auto rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-md">
              {/* Flavor Text - Short description about the Pokémon */}
              <p className="rounded-xl bg-gradient-to-r from-zinc-600 to-zinc-500 p-3 text-center text-white italic shadow">
                "{data.species.englishFlavor}"
              </p>

              {/* Pokémon Types */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-zinc-700">Type:</h3>
                <PokemonTypes types={data.pokemon.types} />
              </div>

              {/* Pokémon Height (converted from decimetres to meters) */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-zinc-700">Height:</h3>
                <p className="text-zinc-800">{data.pokemon.height / 10} m</p>
              </div>

              {/* Pokémon Weight (converted from hectograms to kilograms) */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-zinc-700">Weight:</h3>
                <p className="text-zinc-800">{data.pokemon.weight / 10} kg</p>
              </div>

              {/* Pokémon Habitat */}
              {data.species.habitat ? (
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-zinc-700">Habitat:</h3>
                  <p className="text-zinc-800 capitalize">
                    {data.species.habitat.name}
                  </p>
                </div>
              ) : null}

              {/* Pokémon Base Stats (Radar Chart) */}
              <div className="rounded-xl bg-zinc-100 p-3 shadow-inner">
                <h3 className="mb-2 text-center font-semibold text-zinc-700">
                  Base Stats
                </h3>
                <PokeStats stats={data.pokemon.stats} />
              </div>

              {/* Pokémon Evolution Chain */}
              <div className="rounded-xl bg-zinc-100 p-3 shadow-inner">
                <PokeEvolution url={data.species.evolutionChain} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokecard;
