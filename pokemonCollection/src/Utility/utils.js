export async function getPokemon(pokemonId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pokemon');
    }
    const pokemon = await response.json();
    return pokemon;
  } catch (err) {
    console.error(err.message);
  }
}

export function upperCaseFirtLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function createPokemonTypesString(types) {
  const pokemonTypes = [];
  for (const type of types) {
    pokemonTypes.push(type.type.name);
  }
  let pokemonTypesString = "";
  for (const type of pokemonTypes) {
    pokemonTypesString += type;
  }
  return pokemonTypesString;
}
