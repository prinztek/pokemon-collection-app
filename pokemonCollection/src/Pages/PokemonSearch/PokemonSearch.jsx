import { useState, useEffect, useContext } from "react";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import PokemonCard from "../../Components/PokemonCard/PokemonCard.jsx";
import { upperCaseFirtLetter } from "../../Utility/utils.js";
import "./PokemonSearch.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PokemonContext } from "../../PokemonProvider.jsx";

const PokemonSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const navigate = useNavigate();
  const { setPokemon } = useContext(PokemonContext);

  // FETCH FOR POKEMON BASED ON THE SEARCH TERM
  useEffect(() => {
    if (!searchTerm) return;

    // const controller = new AbortController();
    // const signal = controller.signal;

    const fetchPokemons = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `https://pokemon-collection-server.vercel.app/search?q=${searchTerm}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemons(data); // Wrap in array to match expected data structure
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching Pokémon data:", error);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();

    // return () => {
    //   controller.abort();
    // };
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
      {!loading && pokemons.length > 0 && !error && (
        <p>{`Search results for "${searchTerm}"`}</p>
      )}
      <div id="pokemon-container" onClick={handleSelectedPokemon}>
        {error && <p>Error fetching Pokémon data</p>}
        {loading && !error && <LoadingComponent />}
        {!loading && pokemons.length === 0 && !error && (
          <p>No pokemons found</p>
        )}
        {!loading && pokemons.length > 0 && !error && (
          <PokemonCard
            currentItems={pokemons}
            upperCaseFirtLetter={upperCaseFirtLetter}
          />
        )}
      </div>
      {!loading && pokemons.length > 0 && !error && (
        <button onClick={() => navigate(-1)}>Back to Home</button>
      )}
    </main>
  );
};

export default PokemonSearch;
