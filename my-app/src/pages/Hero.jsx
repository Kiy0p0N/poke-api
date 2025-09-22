import { useEffect, useState } from "react";
import { randomPokemon } from "../services/pokeapi";
import Pokecard from "../components/Pokecard";

function Hero() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await randomPokemon();
      setPokemon(response);
    }
    fetchData();
  }, []);

  // if you haven't found a pokemon yet
  if (!pokemon)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black"></div>
    );

  return <Pokecard data={pokemon} />;
}

export default Hero;
