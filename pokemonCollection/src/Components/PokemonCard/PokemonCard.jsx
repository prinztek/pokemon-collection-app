import "./PokemonCard.css";

function PokemonCard(props) {
  const { currentItems, upperCaseFirtLetter } = props;
  return (
    <>
      {currentItems &&
        currentItems.map((pokemon, index) => (
          <div
            className="pokemon-card"
            id={`pokemon-card-${index + 1}`}
            key={index + 1}
          >
            <div className="pokemon-image-container">
              <img
                className="pokemon-image"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            </div>
            <div className="pokemon-info-container">
              <p className="pokemon-name">
                {pokemon.id} {upperCaseFirtLetter(pokemon.name)}{" "}
                {pokemon.stats[0].base_stat}
              </p>
              <p className="pokemon-type">
                {pokemon.types.map((type, slot) => (
                  <span className={type.type.name} key={slot}>
                    {upperCaseFirtLetter(type.type.name)}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
    </>
  );
}

export default PokemonCard;
