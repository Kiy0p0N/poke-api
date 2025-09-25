import { useState } from "react";
import { typeColors } from "../utils/constats/typeColors";

/**
 * PokeImg component
 * Displays a Pokémon image with the ability to toggle between normal and shiny version
 * @param {object} sprites - Pokémon sprites object from the API
 * @param {string} name - Pokémon name (used for alt text)
 */
function PokeImg({ sprites, name, types }) {
  // State to control whether the shiny version is being displayed
  const [shiny, setShiny] = useState(false);

  const typeName = types[0].type.name || "bg-zinc-100";

  return (
    <div className={`relative w-96 rounded-2xl ${typeColors[typeName]}`}>
      <img
        // Toggles shiny state when clicked
        onClick={() => setShiny(!shiny)}
        // Selects the correct image based on shiny state
        src={
          shiny
            ? sprites.other?.["official-artwork"]?.front_shiny
            : sprites.other?.["official-artwork"]?.front_default
        }
        alt={name}
        className="absolute bottom-[-30px] cursor-pointer object-cover drop-shadow-2xl drop-shadow-black"
      />
    </div>
  );
}

export default PokeImg;
