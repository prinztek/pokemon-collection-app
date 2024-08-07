import { useEffect, useState, useRef } from "react";
import "./PokemonGame.css";
import pokemonAudio from "../../assets/pokemon-audio.mp3"; // Import the audio file
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";

const PokemonGame = () => {
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [input, setinput] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [resultText, setResultText] = useState("Who's That Pokemon?");
  const imageRef = useRef();
  const audioRef = useRef(new Audio(pokemonAudio)); // Create a ref for the audio element

  useEffect(() => {
    handleRandomPokemon();
  }, []);

  function playAudio() {
    audioRef.current.play();
  }

  function muteAudio() {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted((prevState) => !prevState);
    }
  }

  function onInputChange(e) {
    const target = e.target.value;
    setinput(target);
  }

  async function handleRandomPokemon() {
    setLoading(true);
    fetch("https://pokemon-collection-server.vercel.app/random-pokemon")
      .then((response) => {
        // console.log(response);
        return response.json(); // Convert response to JSON
      })
      .then((data) => {
        setPokemon(data);
        setLoading(false);
        playAudio();
      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
      });
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
    if (!input) {
      alert("Pokemon name cannot be blank!!!");
      return;
    }
    const userInput = input.toLowerCase();
    const pokemonName = pokemon.name.toLowerCase();
    if (pokemonName === userInput) {
      imageRef.current.style.filter = "brightness(1)";
      setResultText("Correct!");
      setTimeout(() => {
        handleRandomPokemon();
        setResultText("Who's That Pokemon?");
      }, 3000);
      return;
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
        <audio ref={audioRef} src={pokemonAudio}></audio>
        {loading && <LoadingComponent />}
        {!loading && pokemon && (
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
              <input
                onKeyDown={onEnterDown}
                onChange={onInputChange}
                id="silhouette-input"
                type="text"
                placeholder="Enter the Pokemon name"
              />
              <div className="game-btns">
                <button className="btn" onClick={showImage}>
                  Show
                </button>
                <button className="btn" onClick={submitName}>
                  Submit
                </button>
                {!isMuted ? (
                  <button className="btn" onClick={muteAudio}>
                    Mute
                  </button>
                ) : (
                  <button className="btn" onClick={muteAudio}>
                    Unmute
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default PokemonGame;
