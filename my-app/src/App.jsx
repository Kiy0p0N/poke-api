import { Routes, Route } from "react-router-dom";

import Header from "./layout/Header";
import Hero from "./pages/Hero";
import Pokemon from "./pages/Pokemon";

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
      </Routes>
    </>
  )
}

export default App
