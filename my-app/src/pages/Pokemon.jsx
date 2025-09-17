import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../services/pokeapi";
import Pokecard from "../components/Pokecard";

function Pokemon() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!name) return;
      const currentPokemon = await getPokemon(name);
      setPokemon(currentPokemon);
    }
    fetchData();
  }, [name]);

  if (!pokemon)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black"></div>
    );

  return <Pokecard pokemon={pokemon} />;
}

export default Pokemon;
