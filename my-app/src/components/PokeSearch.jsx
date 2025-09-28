import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pokeball from "../../public/pokeball.svg";

function PokeSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (!query.trim()) return;
    navigate(`/pokemon/${query.toLowerCase()}`);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="relative flex w-full items-center rounded-2xl bg-white shadow-md ring-1 ring-zinc-200 transition duration-300 focus-within:ring-2 focus-within:ring-red-400 md:w-96">
      <img
        src={Pokeball}
        alt="Pokeball"
        className="ml-3 w-6 opacity-70 transition duration-300 group-focus-within:rotate-180"
      />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Pokémon..."
        className="w-full bg-transparent px-3 py-2 text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
      />
    </div>
  );
}

export default PokeSearch;
