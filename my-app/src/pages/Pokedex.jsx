import { useEffect, useState } from "react";
import { fetchAllPokemon } from "../services/pokeapi";
import PokePrev from "../components/PokePrev";
import Pokeball from "../../public/pokeball.svg";

function Pokedex() {
  // Holds the full Pokédex list retrieved from the API
  const [pokedex, setPokedex] = useState(null);

  /**
   * Fetch all Pokémon when the component loads (runs once).
   * The result is stored in state so the UI can render once data is available.
   */
  useEffect(() => {
    async function fetchAllData() {
      const response = await fetchAllPokemon();
      setPokedex(response);
    }

    fetchAllData();
  }, []);

  /**
   * Debug effect (optional).
   * Logs the Pokédex list whenever it changes.
   */
  useEffect(() => {
    if (pokedex) {
      console.log(pokedex);
    }
  }, [pokedex]);

  /**
   * If the Pokédex is still null (data not loaded yet), display a fallback UI.
   * You could later replace this with a loading spinner.
   */
  if (!pokedex)
    return (
      <div>
        <p>Pokedex not found</p>
      </div>
    );

  return (
    <div className="mt-20 flex w-full flex-col items-center">
      {/* Title Section */}
      <div className="flex w-full justify-center">
        <h1 className="flex text-xl font-bold text-white uppercase md:text-6xl">
          P
          <img
            src={Pokeball}
            alt="Pokeball"
            className="flex w-[20px] items-center md:w-[50px]"
          />{" "}
          kedex
        </h1>
      </div>

      {/* Pokémon Grid */}
      <div className="grid w-full grid-cols-3 gap-3 p-3 md:grid-cols-4 lg:flex lg:w-5/6 lg:flex-wrap lg:justify-center">
        {pokedex.map((pokemon, index) => (
          // Renders a Pokémon preview card (name is passed to the component)
          <PokePrev key={index} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
