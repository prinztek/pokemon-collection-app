import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getPokemon, upperCaseFirtLetter, getRandomNumber } from '../../Utility/utils.js';
import ClipLoader from "react-spinners/ClipLoader";
import "./PokemonGame.css";

const PokemonGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [input, setinput] = useState();
  const [resultText, setResultText] = useState("Who's That Pokemon?");
  const imageRef = useRef();


  useEffect(() => {
    setIsLoading(true);
    handleRandomPokemon();
  }, [])

  function onInputChange(e) {
    const target = e.target.value;
    setinput(target);
  }

  async function handleRandomPokemon() {
    setIsLoading(true);
    const pokemon = await getPokemon(getRandomNumber(1, 493));
    setPokemon(pokemon); 
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
      setResultText("Correct!");
      setTimeout(() => {
        handleRandomPokemon();
        setResultText("Who's That Pokemon?");
      }, 3000);
    } else {
      alert("Wrong Answer!!!");
      console.log(pokemonName);
      setResultText("Incorrect!");
      setTimeout(() => {
        setResultText("Who's That Pokemon?");
      }, 2000);
    }
  }

  function onEnterDown(e) {
    const key = e.code;
    if (key === "Enter") {
      submitName();
    } else {
      return;
    }
  }

  return (
    <main>
      <div id="pokemon-game-container">
        { isLoading ? (
            <>
              <ClipLoader color={"#0000FF"} speedMultiplier={1.2}/>
              <p className="loading-text">Loading Pokemon</p>
            </>
          ) : (
            <>
              { pokemon && (
                <>
                  <h1>{resultText}</h1>
                  <div className="pokemon-game-image-container">
                    <img
                      ref={imageRef}
                      id="silhouette"
                      src={pokemon.sprites.other["official-artwork"].front_default}
                    />
                  </div>
                  <div className="game-controls">
                    <input onKeyDown={onEnterDown} onChange={onInputChange} id="silhouette-input" type="text" placeholder="Enter the Pokemon name" />
                    <div className="game-btns">
                      <button className="btn" onClick={showImage} >Show</button>
                      <button className="btn" onClick={submitName} >Submit</button>
                    </div>
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
