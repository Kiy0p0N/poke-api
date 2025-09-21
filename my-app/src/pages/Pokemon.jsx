import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemon } from "../services/pokeapi";
import Pokecard from "../components/Pokecard";

function Pokemon() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!name) return;
      const response = await fetchPokemon(name);
      setPokemon(response);
    }
    fetchData();
  }, [name]);

  if (!pokemon) return;

  return <Pokecard data={pokemon} />;
}

export default Pokemon;
