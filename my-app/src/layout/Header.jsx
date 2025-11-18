import Logo from "../components/Logo";
import PokeSearch from "../components/PokeSearch";
import { House, List, Star } from "lucide-react";

function Header() {
  return (
    // Main header container, fixed at the top of the screen
    <header className="fixed z-40 flex w-full items-center justify-center bg-zinc-800 py-3 md:px-3">
      {/* Inner wrapper controlling layout width */}
      <div className="flex w-14/15 items-center justify-center md:w-4/5">
        {/* Left section: Logo */}
        <div className="flex-1/3">
          <Logo />
        </div>

        {/* Center section: Navigation menu */}
        <div className="w-full flex-1/3">
          <ul className="flex w-full justify-center gap-4 text-white">
            {/* Home link */}
            <li>
              <a
                href="/"
                className="duration-500 ease-in-out hover:text-red-400"
              >
                <House />
              </a>
            </li>

            {/* Pokedex link */}
            <li>
              <a
                href="/pokedex "
                className="duration-500 ease-in-out hover:text-red-400"
              >
                <List />
              </a>
            </li>

            {/* Favorites page link */}
            <li>
              <a
                href="/favorites"
                className="duration-500 ease-in-out hover:text-red-400"
              >
                <Star />
              </a>
            </li>
          </ul>
        </div>

        {/* Right section: Search bar */}
        <div className="flex flex-1/3 justify-end text-white">
          <PokeSearch />
        </div>
      </div>
    </header>
  );
}

export default Header;
