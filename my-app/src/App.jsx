import { Routes, Route } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./pages/Hero";
import Pokemon from "./pages/Pokemon";
import Pokedex from "./pages/Pokedex";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col justify-between gap-5 bg-zinc-800">
      <Header />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
