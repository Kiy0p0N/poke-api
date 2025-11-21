import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

function FavoriteButton({ pokemonName }) {
  const [isFav, setIsFav] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pokemons")) || [];

    if (stored.includes(pokemonName)) {
      setIsFav(true);
    }
  }, [pokemonName]);

  const toggleFav = () => {
    const stored = JSON.parse(localStorage.getItem("pokemons")) || [];

    let updatedList;

    if (isFav) {
      // Remove Pokémon
      updatedList = stored.filter((p) => p !== pokemonName);
    } else {
      // Add Pokémon
      updatedList = [...stored, pokemonName];
    }

    localStorage.setItem("pokemons", JSON.stringify(updatedList));
    setIsFav(!isFav);
  };

  return (
    <button
      onClick={toggleFav}
      className="fixed right-10 bottom-20 cursor-pointer p-1 duration-500 ease-in-out hover:scale-125 lg:right-20 lg:bottom-40"
    >
      <Heart
        size={32}
        className={`transition-colors ${
          isFav ? "fill-red-400 text-red-400" : "text-white"
        }`}
      />
    </button>
  );
}

export default FavoriteButton;
