import { useEffect, useState } from "react";
import { fetchAllPokemon } from "../services/pokeapi";
import PokePrev from "../components/PokePrev";

function Pokedex() {
  const [pokedex, setPokedex] = useState(null);

  useEffect(() => {
    async function fetchAllData() {
      const response = await fetchAllPokemon();
      setPokedex(response);
    }

    fetchAllData();
  }, []);

  useEffect(() => {
    if (pokedex) {
      console.log(pokedex);
    }
  }, [pokedex]);

  if (!pokedex)
    return (
      <div>
        <p>Pokedex not found</p>
      </div>
    );

  return (
    <div className="flex max-w-screen flex-col items-center">
      <div className="w-full flex justify-center">
        <h1 className="uppercase text-white text-2xl lg:text-6xl font-bold">Pokédex</h1>
      </div>

      <div className="w-full p-3 lg:w-5/6 flex flex-wrap justify-between gap-4">
        {pokedex.map((pokemon, index) => (
          <PokePrev key={index} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
