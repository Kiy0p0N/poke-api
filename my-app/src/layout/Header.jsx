import PokeSearch from "../components/PokeSearch";

function Header() {
  return (
    <header className="z-40 mb-8 flex w-full flex-col items-center justify-center gap-3 p-3">
      <div className="w-full px-3 lg:w-1/2">
        <ul className="flex justify-between font-bold text-white uppercase">
          <li>
            <a
              href="/"
              className="duration-500 ease-in-out hover:scale-110 hover:text-red-400"
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="/pokedex "
              className="duration-500 ease-in-out hover:scale-110 hover:text-red-400"
            >
              Pokédex
            </a>
          </li>

          <li>
            <a
              href="/favorites"
              className="duration-500 ease-in-out hover:scale-110 hover:text-red-400"
            >
              Favorites
            </a>
          </li>
        </ul>
      </div>
      <PokeSearch />
    </header>
  );
}

export default Header;
