import { useState, useEffect, useContext } from "react";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import PokemonCard from "../../Components/PokemonCard/PokemonCard.jsx";
import { upperCaseFirtLetter } from "../../Utility/utils.js";
import "./PokemonSearch.css";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { PokemonContext } from "../../PokemonProvider.jsx";

const PokemonSearch = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const navigate = useNavigate();
  const { pokemon, setPokemon } = useContext(PokemonContext);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokemon-collection-server.vercel.app/search?q=${searchTerm}`
        );
        const data = await response.json();
        setPokemons(data); // Wrap in array to match expected data structure
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchPokemons();
    }
  }, [searchTerm]);

  function handleSelectedPokemon(e) {
    let pokemonCard = e.target.closest(".pokemon-card");
    if (!pokemonCard) return;
    const pokemonId = Number(
      pokemonCard.querySelector(".pokemon-name").textContent.split(" ")[0]
    );
    console.log(pokemonId);
    for (const pokemon of pokemons) {
      if (pokemon.id === pokemonId) {
        setPokemon(pokemon);
        break;
      }
    }
    navigate(`/pokemon/${pokemonId}`);
  }

  return (
    <main>
      {loading && <LoadingComponent />}
      {!loading && pokemons.length === 0 && <p>No pokemons found</p>}
      {!loading && pokemons.length > 0 && (
        <>
          <p>{`Search results for "${searchTerm}"`}</p>
          <div id="pokemon-container" onClick={handleSelectedPokemon}>
            <PokemonCard
              currentItems={pokemons}
              upperCaseFirtLetter={upperCaseFirtLetter}
            />
          </div>
          <Link to="/">Back to Home</Link>
        </>
      )}
    </main>
  );
};

export default PokemonSearch;
