import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getPokemon, upperCaseFirtLetter, getRandomNumber } from '../../Utility/utils.js';
import BarLoader from "react-spinners/BarLoader";
import "./PokemonGame.css";

const PokemonGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [input, setinput] = useState();
  const imageRef = useRef();


  useEffect(() => {
    setIsLoading(true);
    async function handleRandomPokemon() {
      // should be a fetch request
      const pokemon = await getPokemon(getRandomNumber(1, 1025));
      setPokemon(pokemon); //
      setIsLoading(false);
      console.log(pokemon.name);
    }
    handleRandomPokemon(setPokemon);
  }, [])

  function onInputChange(e) {
    const target = e.target.value;
    setinput(target);
  }

  async function getAnotherPokemon() {
    setIsLoading(true);
    const pokemon = await getPokemon(getRandomNumber(1, 1025));
    setPokemon(pokemon); //
    setIsLoading(false);
  }

  function showImage() {
    let value = imageRef.current.style.filter;
    if (value === "") {
      imageRef.current.style.filter = "brightness(1)";
    } else {
      imageRef.current.style.filter = "";
    }
  }

  function submitName() {
    const userInput = input.toLowerCase();
    const pokemonName = pokemon.name.toLowerCase();
    if (pokemonName === userInput) {
      imageRef.current.style.filter = "brightness(1)";
      setTimeout(() => {
        getAnotherPokemon();
      }, 5000);
    } else {
      alert("Wrong Answer!!!");
      console.log(pokemonName);
    }
  }

  return (
    <main>
      <div id="pokemon-game-container">
        { isLoading ? (
            <BarLoader />
          ) : (
            <>
              { pokemon && (
                <>
                  <h1>Who's That Pokemon?</h1>
                  <div className="pokemon-game-image-container">
                    <img
                      ref={imageRef}
                      id="silhouette"
                      src={pokemon.sprites.other["official-artwork"].front_default}
                    />
                  </div>
                  <div className="game-btns">
                    <button className="btn" onClick={showImage} >Show</button>
                    <input onChange={onInputChange} id="silhouette-input" type="text" placeholder="Enter the Pokemon name" />
                    <button className="btn" onClick={submitName} >Submit</button>
                  </div>
                </>
              )}
            </>
        )}
      </div>
    </main>
  );

};

export default PokemonGame;
