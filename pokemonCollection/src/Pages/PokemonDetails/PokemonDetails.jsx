import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { upperCaseFirtLetter } from "../../Utility/utils.js";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import "./PokemonDetails.css";
import { PokemonContext } from "../../PokemonProvider.jsx";

const PokemonDetails = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { pokemon, setPokemon } = useContext(PokemonContext);
  const { pokemonId } = useParams();

  useEffect(() => {
    // fetch for specific pokemon
    async function getSelectedPokemon() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/selected-pokemon/${pokemonId}`
        );
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    if (pokemonId) {
      getSelectedPokemon();
    }
  }, [pokemonId]);

  return (
    <main>
      <div className="pokemon-detail">
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            {pokemon && (
              <>
                <div className="pokemon-detail-left">
                  <img
                    src={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
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
                  <button
                    onClick={() => {
                      navigate(`/`);
                    }}
                  >
                    Go Back
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default PokemonDetails;
