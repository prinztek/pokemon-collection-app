import { createContext, useState } from 'react';

export const PokemonContext = createContext();

const PokemonProvider = ({children}) => {
  const [pokemon, setPokemon] = useState();
  return (
    <PokemonContext.Provider value={{pokemon, setPokemon}}>
      {children}
    </PokemonContext.Provider>
    );
};

export default PokemonProvider;