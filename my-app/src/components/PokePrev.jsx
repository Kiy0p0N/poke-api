import { useEffect, useState } from "react";
import { getPokemon } from "../services/pokeapi";
import { useNavigate } from "react-router-dom";

function PokePrev({ name }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function fetchPokemon() {
      setLoading(true);
      try {
        if (!name) return;
        const response = await getPokemon(name);
        if (isMounted) {
          setPokemon(response);
        }
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPokemon();

    return () => {
      isMounted = false;
    };
  }, [name]);

  if (!pokemon) return null;

  const imageUrl =
    !imageError && pokemon.sprites.other?.["official-artwork"]?.front_default
      ? pokemon.sprites.other?.["official-artwork"]?.front_default
      : "/fallback-pokeball.png";

  return (
    <div
      onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      className="h-auto w-24 md:w-44 cursor-pointer rounded-lg bg-white p-3 duration-500 ease-in-out hover:scale-105"
    >
      <div className="w-full bg-zinc-100 rounded-lg flex items-center justify-center relative">
        {/* Placeholder shimmer effect while loading */}
        {loading && (
          <div className="absolute h-32 w-32 animate-pulse rounded-lg bg-zinc-300" />
        )}

        <img
          src={imageUrl}
          alt={pokemon.name}
          className={`drop-shadow-2xl object-contain transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setLoading(false)}
          onError={() => {
            console.warn(`Image failed to load for ${pokemon.name}`);
            setImageError(true);
            setLoading(false);
          }}
        />
      </div>

      <div className="w-full flex items-center flex-col uppercase">
        <h1 className="font-bold text-[10px] md:text-sm">{pokemon.name}</h1>
        <h2 className="font-semibold text-zinc-500 text-[8px] md:text-[12px]">N° {pokemon.id}</h2>
      </div>
    </div>
  );
}

export default PokePrev;
