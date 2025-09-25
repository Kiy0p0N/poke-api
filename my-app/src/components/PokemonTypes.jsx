// Mapping of Pokémon types to Tailwind background classes
// This ensures each type has a distinct and consistent background color
import { typeColors } from "../utils/constats/typeColors";

/**
 * PokemonTypes component
 * Displays all Pokémon types with styled badges (different background for each type)
 * @param {Array} types - Array of Pokémon type objects (from API response)
 */
function PokemonTypes({ types }) {
  return (
    <div className="flex flex-wrap gap-2">
      {types.map((typeInfo) => {
        // Extract type name from API object
        const typeName = typeInfo.type.name;

        // Get background color based on type, fallback to gray if unknown type
        const colorClass = typeColors[typeName] || "bg-gray-300";

        return (
          <div
            key={typeName}
            // Dynamically apply color class and some common styling
            className={`${colorClass} rounded-xl px-3 py-1 text-sm font-semibold text-white capitalize shadow`}
          >
            {typeName}
          </div>
        );
      })}
    </div>
  );
}

export default PokemonTypes;
