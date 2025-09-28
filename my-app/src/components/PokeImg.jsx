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
    <div
      className={`w-full md:w-5/6 rounded-2xl lg:w-96 ${typeColors[typeName]} flex justify-center`}
    >
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
        className="cursor-pointer object-cover drop-shadow-2xl drop-shadow-black"
      />
    </div>
  );
}

export default PokeImg;
