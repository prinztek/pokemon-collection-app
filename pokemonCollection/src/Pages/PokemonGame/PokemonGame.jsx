import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPokemon, upperCaseFirtLetter, getRandomNumber } from '../../Utility/utils.js';
import BarLoader from "react-spinners/BarLoader";
import "./PokemonGame.css";

const PokemonGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    setIsLoading(true);
    async function handleRandomPokemon() {
      const pokemon = await getPokemon(getRandomNumber(1, 10));
      setPokemon(pokemon); //
      setIsLoading(false);
      console.log(pokemon.name);
    }
    handleRandomPokemon(setPokemon);
  }, [])

  async function getAnotherPokemon() {}

  return (
    <div className="pokemon-game">
      { isLoading ? (
          <BarLoader />
        ) : (
          <>
            { pokemon && (
                <div className="pokemon-game-image-container">
                  <img
                    id="silhouette"
                    src={pokemon.sprites.other["official-artwork"].front_default}
                  />
                </div>
            )}
          </>
      )}
    </div>
  );

};

export default PokemonGame;
