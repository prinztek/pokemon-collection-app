import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPokemon, upperCaseFirtLetter } from '../../Utility/utils.js';
import BarLoader from "react-spinners/BarLoader";
import "./PokemonDetails.css";

const PokemonDetails = () => {
  // should accept a children props(pokemon object)
  // only function goBack(button)

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState();
  const { pokemonId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    async function handleRandomPokemon() {
      const pokemon = await getPokemon(pokemonId);
      setPokemon(pokemon); //
      setIsLoading(false);
    }
    handleRandomPokemon(setPokemon);
  }, [pokemonId])

  return (
    <div className="pokemon-detail">
    { isLoading ? (
        <BarLoader />
      ) : (
        <>
          { pokemon && (
            <>
              <div className="pokemon-detail-left">
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.stats[0].stat.name}
                />
                <h1>{pokemon.id} {upperCaseFirtLetter(pokemon.name)}</h1>
              </div>
              <div className="pokemon-detail-right">
                {pokemon.stats.map((pokemonStat, index) => {
                  const stat = upperCaseFirtLetter(pokemonStat.stat.name);
                  const value = pokemonStat.base_stat;
                  return <h2 key={index}>{stat}: {value}</h2>;
                })}
                <button onClick={() => { navigate(`/`) }}>Go Back</button>
              </div>
            </>
          )}
        </>
        )}
    </div>
  );

};

export default PokemonDetails;


{/*<h2>{pokemon.stats[0].stat.name}: {pokemon.stats[0].base_stat}</h2>
<h2>{pokemon.stats[1].stat.name}: {pokemon.stats[1].base_stat}</h2>
<h2>{pokemon.stats[2].stat.name}: {pokemon.stats[2].base_stat}</h2>
<h2>{pokemon.stats[3].stat.name}: {pokemon.stats[3].base_stat}</h2>
<h2>{pokemon.stats[4].stat.name}: {pokemon.stats[4].base_stat}</h2>
<h2>{pokemon.stats[5].stat.name}: {pokemon.stats[5].base_stat}</h2>*/}