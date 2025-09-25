import { useEffect, useState } from "react";
import { fetchPokemon, getEvolutions } from "../services/pokeapi";

/**
 * PokeEvolution component
 * Fetches and displays a Pokémon's evolution chain with their images
 * @param {string} url - Evolution chain URL from the API
 */
function PokeEvolution({ url }) {
  const [evolutions, setEvolutions] = useState([]);
  const [evolutionData, setEvolutionData] = useState([]); // { name, image }

  useEffect(() => {
    async function fetchEvolution() {
      try {
        const response = await getEvolutions(url); // ['pichu', 'pikachu', 'raichu']
        setEvolutions(response);
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
        setEvolutions([]);
      }
    }

    if (url) fetchEvolution();
  }, [url]);

  useEffect(() => {
    async function fetchAllData() {
      if (evolutions.length === 0) return;

      try {
        // Fetches data for each Pokémon in parallel
        const data = await Promise.all(
          evolutions.map(async (name) => {
            const response = await fetchPokemon(name);
            return {
              name,
              image:
                response.pokemon.sprites.other?.["official-artwork"]
                  ?.front_default,
            };
          }),
        );

        setEvolutionData(data);
      } catch (error) {
        console.error("Error fetching evolution images:", error);
      }
    }

    fetchAllData();
  }, [evolutions]);

  return (
    <div className="flex w-full flex-col items-center">
      <h3 className="mb-2 text-center font-semibold text-zinc-700">
        Evolutions
      </h3>

      {/* Evolutions */}
      <div className="flex flex-wrap justify-center gap-4">
        {evolutionData.length > 0 ? (
          evolutionData.map(({ name, image }, index) => (
            <a
              key={index}
              href={`/pokemon/${name}`}
              className={`flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-zinc-700 bg-zinc-500 text-sm font-medium text-zinc-800 shadow-sm duration-500 ease-linear hover:scale-110 hover:bg-zinc-300`}
            >
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-contain drop-shadow-2xl drop-shadow-black"
                />
              ) : (
                <span className="text-xs text-zinc-500">No image</span>
              )}
            </a>
          ))
        ) : (
          <p className="text-sm text-zinc-500">No evolutions found.</p>
        )}
      </div>
    </div>
  );
}

export default PokeEvolution;
