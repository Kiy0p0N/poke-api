// Mapping of Pokémon types to Tailwind background classes
const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-orange-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-sky-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-600",
  rock: "bg-stone-500",
  ghost: "bg-indigo-700",
  dragon: "bg-indigo-500",
  dark: "bg-gray-800 text-white",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

function PokemonTypes({ types }) {
  return (
    <div className="flex flex-wrap gap-2">
      {types.map((typeInfo) => {
        const typeName = typeInfo.type.name;
        const colorClass = typeColors[typeName] || "bg-gray-300";

        return (
          <div
            key={typeName}
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
