import { Routes, Route } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./pages/Hero";
import Pokemon from "./pages/Pokemon";
import Pokedex from "./pages/Pokedex";

function App() {

  return (
    <div className="w-screen min-h-screen bg-zinc-800 flex flex-col justify-between gap-5">
      <Header />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
