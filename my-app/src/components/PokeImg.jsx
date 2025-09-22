import { useState } from "react";

function PokeImg({ sprites, name }) {
  console.log(sprites);
  const [shiny, setShiny] = useState(false);

  return (
    <div className="relative w-96 rounded-2xl bg-zinc-100">
      <img
        onClick={() => setShiny(!shiny)}
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
