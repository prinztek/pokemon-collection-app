async function getPokemon(pokemonId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon with ID ${pokemonId}: ${response.status} ${response.statusText}`);
    }

    const pokemon = await response.json();
    return pokemon;
  } catch (err) {
    console.error('Error fetching Pokémon:', err.message);
    throw err;  // or return null;
  }
}

exports.getPokemon = getPokemon; // Exporting a function as a property
