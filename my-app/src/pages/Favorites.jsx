import { useState, useEffect } from "react";
import PokePrev from "../components/PokePrev";
import Pokeball from "../../public/pokeball.svg";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pokemons")) || [];
    setFavorites(stored);
  }, []);

  return (
    <div className="mt-20 flex w-full flex-col items-center">
      {/* Title Section */}
      <div className="flex w-full justify-center">
        <h1 className="flex text-xl font-bold text-white uppercase md:text-6xl">
          P
          <img
            src={Pokeball}
            alt="Pokeball"
            className="flex w-[20px] items-center md:w-[50px]"
          />{" "}
          ke favorites
        </h1>
      </div>

      {/* Pokémon Grid */}
      <div className="grid w-full grid-cols-3 gap-3 p-3 md:grid-cols-4 lg:flex lg:w-5/6 lg:flex-wrap lg:justify-center">
        {favorites.length > 0 ? (
          favorites.map((name, index) => <PokePrev key={index} name={name} />)
        ) : (
          <p className="mt-10 text-lg text-white">
            Nenhum favorito salvo ainda.
          </p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
