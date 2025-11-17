import { useEffect, useState } from "react";
import { fetchAllPokemon } from "../services/pokeapi";
import PokePrev from "../components/PokePrev";
import Pokeball from "../../public/pokeball.svg";

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
    <div className="flex w-screen flex-col items-center">
      <div className="flex w-full justify-center">
        <h1 className="flex text-xl font-bold text-white uppercase lg:text-6xl">
          P
          <img
            src={Pokeball}
            alt="Pokeball"
            className="flex w-[48px] items-center"
          />{" "}
          kedex
        </h1>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-4 p-3 lg:w-5/6">
        {pokedex.map((pokemon, index) => (
          <PokePrev key={index} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
