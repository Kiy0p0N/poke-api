import { useEffect, useState } from "react";
import { nextPokemon, prevPokemon } from "../services/pokeapi";
import PokemonTypes from "./PokemonTypes";

function Pokecard({ data }) {
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
            <div className="relative w-96 rounded-2xl bg-zinc-100">
              <img
                src={
                  data.pokemon.sprites?.other?.["official-artwork"]
                    ?.front_default
                }
                alt={data.pokemon.name}
                className="absolute bottom-[-30px] object-cover drop-shadow-2xl drop-shadow-black"
              />
            </div>
          </div>

          {/* Pokemon informations */}
          <div className="flex min-h-full flex-1/2 justify-start p-2">
            <div className="flex h-full w-md flex-col gap-3 overflow-x-hidden overflow-y-auto">
              {/* Flavor Text */}
              <div>
                <p className="rounded-lg bg-zinc-500 p-2 text-center text-white italic">
                  {data.species.englishFlavor}
                </p>
              </div>

              {/* Type */}
              <div className="flex gap-3">
                <h3>Type:</h3>
                {<PokemonTypes types={data.pokemon.types} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokecard;
