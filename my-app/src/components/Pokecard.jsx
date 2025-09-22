import { useEffect, useState } from "react";
import { nextPokemon, prevPokemon } from "../services/pokeapi";
import PokemonTypes from "./PokemonTypes";
import PokeImg from "./PokeImg";
import PokeStats from "./PokeStats";

function Pokecard({ data }) {
  console.log(data);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

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

  if (!next || !prev) {
    return <div></div>;
  }

  return (
    <div className="z-10 h-screen w-full bg-zinc-800 px-40 py-30">
      <div className="flex min-h-full w-full flex-col gap-10 bg-white">
        <div className="relative">
          {/* Previous and next button's */}
          <div className="flex h-24 w-full gap-1 uppercase">
            <a
              href={`/pokemon/${prev.name}`}
              className="flex flex-1/2 flex-col items-center bg-zinc-300 p-4 font-semibold duration-500 hover:bg-red-400 hover:text-white"
            >
              <h3 className="text-lg font-semibold">{prev.name}</h3>
              <h4 className="text-sm font-medium">N° {prev.id}</h4>
            </a>

            <a
              href={`/pokemon/${next.name}`}
              className="flex flex-1/2 flex-col items-center bg-zinc-300 p-4 font-semibold duration-500 hover:bg-red-400 hover:text-white"
            >
              <h3 className="text-lg font-semibold">{next.name}</h3>
              <h4 className="text-sm font-medium">N° {next.id}</h4>
            </a>
          </div>

          {/* Pokemon name and pokedex number */}
          <div className="absolute right-1/3 bottom-[-25px] mx-auto flex w-96 flex-col items-center justify-center rounded-t-2xl bg-white py-1 uppercase">
            <h1 className="text-2xl font-bold">{data.pokemon.name}</h1>
            <h2 className="text-xl font-semibold text-gray-500">
              N° {data.pokemon.id}
            </h2>
          </div>
        </div>

        <div className="flex h-96 w-full justify-center bg-white">
          {/* Pokemon image */}
          <div className="flex flex-1/2 justify-end p-2">
            <PokeImg sprites={data.pokemon.sprites} name={data.pokemon.name} />
          </div>

          {/* Pokémon Information Section */}
          <div className="flex w-full justify-start p-4 md:w-1/2">
            <div className="flex max-h-[75vh] w-full flex-col gap-4 overflow-y-auto rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-md">
              {/* Flavor Text */}
              <p className="rounded-xl bg-gradient-to-r from-zinc-600 to-zinc-500 p-3 text-center text-white italic shadow">
                {data.species.englishFlavor}
              </p>

              {/* Type */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-zinc-700">Type:</h3>
                <PokemonTypes types={data.pokemon.types} />
              </div>

              {/* Height */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-zinc-700">Height:</h3>
                <p className="text-zinc-800">{data.pokemon.height / 10} m</p>
              </div>

              {/* Weight */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-zinc-700">Weight:</h3>
                <p className="text-zinc-800">{data.pokemon.weight / 10} kg</p>
              </div>

              {/* Stats */}
              <div className="rounded-xl bg-zinc-100 p-3 shadow-inner">
                <h3 className="mb-2 text-center font-semibold text-zinc-700">
                  Base Stats
                </h3>
                <PokeStats stats={data.pokemon.stats} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokecard;
