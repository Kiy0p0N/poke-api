import { useEffect, useState } from "react";
import { nextPokemon, prevPokemon } from "../services/pokeapi";

function Pokecard({pokemon}) {
  console.log("pokecard:", pokemon)
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    if (!pokemon) return;

    async function fetchNeighbors() {
      const nextP = await nextPokemon(pokemon.id);
      const prevP = await prevPokemon(pokemon.id);

      setNext(nextP);
      setPrev(prevP);
    }

    fetchNeighbors();
    console.log("Next:", next);
    console.log("Prev:", prev);
  }, [pokemon]);

  if (!next || !prev) {
    return <div></div>
  }

  return (
    <div className="z-10 h-screen w-full px-40 py-30">
      <div className="flex min-h-full w-full flex-col gap-10">
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
            <h1 className="text-2xl font-bold">{pokemon.name}</h1>
            <h2 className="text-xl font-semibold text-gray-500">
              N° {pokemon.id}
            </h2>
          </div>
        </div>

        <div className="flex h-96 w-full justify-center bg-white">
          {/* Pokemon image */}
          <div className="flex flex-1/2 justify-end p-2">
            <div className="w-96 rounded-2xl bg-zinc-100 relative">
              <img
                src={
                  pokemon.sprites?.other?.["official-artwork"]?.front_default
                }
                alt={pokemon.name}
                className="object-cover drop-shadow-2xl drop-shadow-black absolute bottom-[-30px]"
              />
            </div>
          </div>

          {/* Pokemon informations */}
          <div className="flex min-h-full flex-1/2 justify-start p-2">
            <div className="h-full w-md overflow-y-auto">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eius aperiam at corrupti quia dolor similique aliquam rem maxime voluptates reprehenderit commodi perspiciatis libero omnis, facere illo ab. Hic, quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus excepturi magni impedit tempora labore. Numquam ad beatae doloribus assumenda est dolor asperiores neque, ipsum fuga tenetur, voluptas, maiores cupiditate incidunt! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse asperiores dolores eius tenetur minus eaque beatae magni, maiores facilis, ad ducimus repellat pariatur harum rem! Ducimus dolores omnis consectetur magnam.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eius aperiam at corrupti quia dolor similique aliquam rem maxime voluptates reprehenderit commodi perspiciatis libero omnis, facere illo ab. Hic, quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus excepturi magni impedit tempora labore. Numquam ad beatae doloribus assumenda est dolor asperiores neque, ipsum fuga tenetur, voluptas, maiores cupiditate incidunt! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse asperiores dolores eius tenetur minus eaque beatae magni, maiores facilis, ad ducimus repellat pariatur harum rem! Ducimus dolores omnis consectetur magnam.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokecard;
