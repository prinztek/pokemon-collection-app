import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { upperCaseFirtLetter } from "../../Utility/utils.js";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import "./PokemonDetails.css";
import { PokemonContext } from "../../PokemonProvider.jsx";

const PokemonDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { pokemon, setPokemon } = useContext(PokemonContext);
  const { pokemonId } = useParams();

  // FETCH FOR SELECTED POKEMON
  useEffect(() => {
    if (!pokemonId && !pokemon) {
      console.log("returning...");
      return;
    }

    // const controller = new AbortController();
    // const signal = controller.signal;

    async function getSelectedPokemon() {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `https://pokemon-collection-server.vercel.app/selected-pokemon/${pokemonId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(true);
          console.error("Error fetching Pokémon data:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    getSelectedPokemon();

    // return () => {
    //   controller.abort();
    // };
  }, [pokemonId, setPokemon]);

  return (
    <main>
      <div className="pokemon-detail">
        {error && <p>Error fetching Pokémon data</p>}
        {loading && !error && <LoadingComponent />}
        {pokemon && !loading && !error && (
          <>
            <div className="pokemon-detail-left">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.stats[0].stat.name}
              />
              <h1>
                {pokemon.id} {upperCaseFirtLetter(pokemon.name)}
              </h1>
            </div>
            <div className="pokemon-detail-right">
              {pokemon.stats.map((pokemonStat, index) => {
                const stat = upperCaseFirtLetter(pokemonStat.stat.name);
                const value = pokemonStat.base_stat;
                return (
                  <h2 key={index}>
                    {stat}: {value}
                  </h2>
                );
              })}
              <button onClick={() => navigate("/")}>Go Back</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default PokemonDetails;
