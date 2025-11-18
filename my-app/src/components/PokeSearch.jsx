import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pokeball from "../../public/pokeball.svg";
import { fetchAllPokemon } from "../services/pokeapi";
import { Search, X } from "lucide-react";

function PokeSearch() {
  const navigate = useNavigate();

  // User input (search query)
  const [query, setQuery] = useState("");

  // Full Pokédex list retrieved from the API
  const [pokedex, setPokedex] = useState([]);

  // Filtered Pokémon list based on user input
  const [filtered, setFiltered] = useState([]);

  // Controls whether the input is focused (suggestions only show on focus)
  const [isFocused, setIsFocused] = useState(false);

  // Controls opening/closing of the search overlay modal
  const [openSearch, setOpenSearch] = useState(false);

  /**
   * Initial fetch: load all Pokémon only once.
   * The API returns results inside "results", so we ensure it's always an array.
   */
  useEffect(() => {
    async function fetchAllData() {
      const response = await fetchAllPokemon();
      const pokemonList = Array.isArray(response)
        ? response
        : response?.results || [];

      setPokedex(pokemonList);
    }

    fetchAllData();
  }, []);

  /**
   * Filters Pokémon in real time as the user types.
   * - Only includes Pokémon whose names start with the typed text.
   * - Clears suggestions if input is empty.
   * - Displays a special "not_found" marker if no match is found.
   */
  useEffect(() => {
    if (!pokedex.length) return;

    const text = query.trim().toLowerCase();

    // If the user erased the input, clear suggestions
    if (!text) {
      setFiltered([]);
      return;
    }

    // Filter Pokémon by matching the first letters only
    const filteredResults = pokedex.filter((p) =>
      p.name.toLowerCase().startsWith(text),
    );

    // If no Pokémon matches the query
    if (!filteredResults.length) {
      setFiltered([{ name: "not_found" }]);
      return;
    }

    // Limit results to 8 for a cleaner UX
    setFiltered(filteredResults.slice(0, 8));
  }, [query, pokedex]);

  // Executes the search and navigates to the Pokémon details page
  function handleSearch() {
    if (!query.trim()) return;
    navigate(`/pokemon/${query.toLowerCase()}`);
    setOpenSearch(!openSearch);
  }

  // Allows pressing Enter to trigger search
  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  // Handles clicking on a suggestion item
  function handleSuggestionClick(name) {
    if (name === "not_found") return;
    setQuery(name);
    navigate(`/pokemon/${name.toLowerCase()}`);
    setOpenSearch(!openSearch);
  }

  return (
    <>
      {/* Search button (opens the modal/search overlay) */}
      <Search
        onClick={() => setOpenSearch(!openSearch)}
        className="cursor-pointer duration-500 ease-in-out hover:text-red-400"
      />

      {openSearch ? (
        <div className="fixed inset-0 flex h-screen w-screen flex-col items-center justify-start bg-zinc-950/95 p-4">
          {/* Close button */}
          <div className="mb-6 flex w-full justify-end">
            <X
              onClick={() => setOpenSearch(!openSearch)}
              className="cursor-pointer text-white duration-500 ease-in-out hover:text-red-400"
            />
          </div>

          {/* Search bar wrapper (centered) */}
          <div className="flex w-full justify-center">
            <div className="relative w-full max-w-md rounded-2xl bg-white shadow-md ring-1 ring-zinc-200 transition duration-300 focus-within:ring-2 focus-within:ring-red-400">
              <div className="flex">
                {/* Pokéball icon */}
                <img
                  src={Pokeball}
                  alt="Pokeball"
                  className="ml-3 w-6 opacity-70 transition duration-300 group-focus-within:rotate-180"
                />

                {/* Search input field */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 120)}
                  placeholder="Search Pokémon..."
                  className="w-full bg-transparent px-3 py-2 text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
                />
              </div>

              {/* Suggestions dropdown (visible only when focused and query exists) */}
              {isFocused && query && (
                <ul className="absolute right-0 left-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-b-2xl bg-white shadow-lg ring-1 ring-zinc-200">
                  {filtered.map((pokemon) =>
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
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PokeSearch;
