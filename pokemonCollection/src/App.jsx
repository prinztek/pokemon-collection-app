import Navigation from "./Components/Navigation/Navigation.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import PokemonDetails from "./Pages/PokemonDetails/PokemonDetails.jsx";
import PokemonGame from "./Pages/PokemonGame/PokemonGame.jsx";
import PokemonProvider from "./PokemonProvider.jsx";
import { Route, Routes } from "react-router-dom";
import { useContext } from 'react';

function App() {
  return (
    <PokemonProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
        <Route path="/pokemon-game" element={<PokemonGame />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h1>This page do not exists</h1>} />
      </Routes>
    </PokemonProvider>
  );
}

export default App;
