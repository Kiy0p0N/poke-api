import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pokeball from "../../public/pokeball.svg";
import { fetchAllPokemon } from "../services/pokeapi";

function PokeSearch() {
  const navigate = useNavigate();

  // State for user input (search query)
  const [query, setQuery] = useState("");

  // State holding the entire Pokédex fetched from API
  const [pokedex, setPokedex] = useState([]);

  // State holding Pokémon filtered based on user input
  const [filtered, setFiltered] = useState([]);

  // Controls if the input field is focused
  const [isFocused, setIsFocused] = useState(false);

  // Fetch all Pokémon names on initial render
  useEffect(() => {
    async function fetchAllData() {
      const response = await fetchAllPokemon();

      // Ensure the data structure is always an array
      const pokemonList = Array.isArray(response)
        ? response
        : response.results || [];

      setPokedex(pokemonList);
    }

    fetchAllData();
  }, []);

  // Filter Pokémon names dynamically as the user types
  useEffect(() => {
    if (!pokedex || pokedex.length === 0) return;

    // When input is empty, clear suggestions
    if (!query.trim()) {
      setFiltered([]);
      return;
    }

    // Filter only Pokémon whose name starts with the entered text
    const filteredResults = pokedex.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(query.toLowerCase()),
    );

    // If no Pokémon found, display a special marker object
    if (filteredResults.length === 0) {
      setFiltered([{ name: "not_found" }]);
      return;
    }

    // Limit to first 8 suggestions for better UX
    setFiltered(filteredResults.slice(0, 8));
  }, [query, pokedex]);

  // Navigate to Pokémon details page
  function handleSearch() {
    if (!query.trim()) return;
    navigate(`/pokemon/${query.toLowerCase()}`);
  }

  // Allow pressing Enter to trigger search
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  // Handle click on a suggestion
  function handleSuggestionClick(name) {
    if (name === "not_found") return;
    setQuery(name);
    navigate(`/pokemon/${name.toLowerCase()}`);
  }

  return (
    <div className="absolute top-12 w-full md:w-96">
      {/* Search container */}
      <div className="relative w-full rounded-2xl bg-white shadow-md ring-1 ring-zinc-200 transition duration-300 focus-within:ring-2 focus-within:ring-red-400">
        <div className="flex">
          {/* Pokéball icon (rotates slightly when focused) */}
          <img
            src={Pokeball}
            alt="Pokeball"
            className="ml-3 w-6 opacity-70 transition duration-300 group-focus-within:rotate-180"
          />

          {/* Search input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="Search Pokémon..."
            className="w-full bg-transparent px-3 py-2 text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
          />
        </div>

        {/* Suggestion dropdown (visible only if focused and results exist) */}
        {isFocused && query && (
          <ul className="absolute right-0 left-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-b-2xl bg-white shadow-lg ring-1 ring-zinc-200">
            {filtered.length > 0
              ? filtered.map((pokemon) =>
                  pokemon.name === "not_found" ? (
                    <li
                      key="not-found"
                      className="px-4 py-2 text-zinc-500 select-none"
                    >
                      Pokémon not found
                    </li>
                  ) : (
                    <li
                      key={pokemon.name}
                      onMouseDown={() => handleSuggestionClick(pokemon.name)}
                      className="cursor-pointer px-4 py-2 text-zinc-700 transition-colors hover:bg-red-100"
                    >
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </li>
                  ),
                )
              : null}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PokeSearch;
