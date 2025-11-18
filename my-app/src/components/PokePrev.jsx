import { useEffect, useState } from "react";
import { getPokemon } from "../services/pokeapi";
import { useNavigate } from "react-router-dom";

function PokePrev({ name }) {
  // Stores Pokémon data returned by the API
  const [pokemon, setPokemon] = useState(null);

  // Indicates loading state (used for shimmer effect & fade-in)
  const [loading, setLoading] = useState(true);

  // Tracks image loading failure, triggering a fallback asset
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();

  /**
   * Fetch individual Pokémon data when the component first renders
   * or when the "name" prop changes.
   *
   * "isMounted" prevents updating state after component unmounts,
   * avoiding memory leaks and React warnings.
   */
  useEffect(() => {
    let isMounted = true;

    async function fetchPokemon() {
      setLoading(true);
      try {
        if (!name) return;

        const response = await getPokemon(name);

        // Update only if component is still mounted
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

    // Cleanup function: prevents updates after unmount
    return () => {
      isMounted = false;
    };
  }, [name]);

  // If Pokémon data hasn't loaded yet, do not render anything
  if (!pokemon) return null;

  /**
   * Determines the image to display:
   * - Tries the official artwork first
   * - If the image fails to load (imageError === true), use a fallback icon
   */
  const imageUrl =
    !imageError && pokemon.sprites.other?.["official-artwork"]?.front_default
      ? pokemon.sprites.other?.["official-artwork"]?.front_default
      : "/fallback-pokeball.png";

  return (
    <div
      onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      className="h-auto w-full cursor-pointer rounded-lg bg-white p-3 duration-500 ease-in-out hover:scale-105 md:w-full lg:w-48"
    >
      {/* Pokémon artwork container */}
      <div className="relative flex w-full items-center justify-center rounded-lg bg-zinc-100">
        {/* Shimmer placeholder while image is loading */}
        {loading && (
          <div className="absolute h-32 w-32 animate-pulse rounded-lg bg-zinc-300" />
        )}

        {/* Pokémon image */}
        <img
          src={imageUrl}
          alt={pokemon.name}
          className={`object-contain drop-shadow-2xl transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setLoading(false)} // Fade-in when loaded
          onError={() => {
            console.warn(`Image failed to load for ${pokemon.name}`);
            setImageError(true); // Use fallback
            setLoading(false);
          }}
        />
      </div>

      {/* Pokémon name + ID */}
      <div className="flex w-full flex-col items-center uppercase">
        <h1 className="text-[10px] font-bold md:text-sm">{pokemon.name}</h1>
        <h2 className="text-[8px] font-semibold text-zinc-500 md:text-[12px]">
          N° {pokemon.id}
        </h2>
      </div>
    </div>
  );
}

export default PokePrev;
