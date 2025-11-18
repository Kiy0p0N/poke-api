import Pokeball from "../../public/pokeball.svg";

function Logo() {
  return (
    <h1 className="flex text-xl font-bold text-white uppercase">
      P
      <img src={Pokeball} alt="pokeball" className="w-5" /> keList
    </h1>
  );
}

export default Logo;
