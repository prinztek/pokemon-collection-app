import Navigation from "./Components/Navigation/Navigation.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import PokemonDetails from "./Pages/PokemonDetails/PokemonDetails.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<h1>This page do not exists</h1>} />
    </Routes>
  </>
  );
}

export default App;
