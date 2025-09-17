import { useState } from "react";
import Pokeball from "../../public/pokeball.svg";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="fixed flex h-12 w-full items-center justify-end px-3 z-40">
      <img
        src={Pokeball}
        alt="Pokeball"
        className="z-50 w-7 cursor-pointer duration-300 hover:w-7.5"
        onClick={handleClick}
      />
    </header>
  );
}

export default Header;
