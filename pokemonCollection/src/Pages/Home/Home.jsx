import { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import Pagination from "../../Components/Pagination/Pagination.jsx";
import SearchComponent from "../../Components/SearchAndFilter/SearchComponent.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import PokemonCard from "../../Components/PokemonCard/PokemonCard.jsx";
import FilterComponent from "../../Components/SearchAndFilter/FilterComponent.jsx";
import { upperCaseFirtLetter, getRandomNumber } from "../../Utility/utils.js";
import "./Home.css";

const Home = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pokemonContainer, setPokemonContainer] = useState([]);
  const [pokemon, setPokemon] = useState();
  const [filteredPokemonContainer, setFilteredPokemonContainer] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy ] = useState();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const navigate = useNavigate();

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredPokemonContainer?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredPokemonContainer?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPokemonContainer?.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  // handle search
  useEffect(() => {
    const findSearchPokemon = async () => {
      const searchQuery = new URLSearchParams(location.search).get('q');
      if (searchQuery !== null) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("https://pokemon-collection-server.vercel.app/search", {
          method: "Post",
          body: JSON.stringify({ searchQuery: searchQuery }),
          headers: myHeaders,
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setFilteredPokemonContainer(data); // Update state with fetched data
          setLoading(false);
          // console.log(data);
        })
        .catch((err) => {
          console.error('Error fetching or processing data:', error);
          setLoading(false);
          setError(true);
        })
      }
    }

    if (searchInput === ""){
      setFilteredPokemonContainer(pokemonContainer);
      setLoading(false);
      return;
    } else {
      setLoading(true);
      findSearchPokemon();
    }
  }, [searchInput]);

   // handle sort by
  useEffect(() => {
    setLoading(true);
    if (sortBy === "") {
      setFilteredPokemonContainer(pokemonContainer);
      setLoading(false);
      return;
    }

    // console.log(sortBy);
    if (sortBy === "name") {
      const sortedPokemonContainer = [...filteredPokemonContainer].sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0; // names must be equal
      })
      setFilteredPokemonContainer(sortedPokemonContainer);
    }

    if (sortBy === "lowHp") {
      const sortedPokemonContainer = [...filteredPokemonContainer].sort((a, b) => {
        const hpA = a.stats[0].base_stat;
        const hpB = b.stats[0].base_stat;
          if (hpA < hpB) {
            return -1;
          }
          if (hpA > hpB) {
          return 1;
          }
          return 0; // hp must be equal
      })
      setFilteredPokemonContainer(sortedPokemonContainer);
    }

    if (sortBy === "highHp") {
      const sortedPokemonContainer = [...filteredPokemonContainer].sort((a, b) => {
        const hpA = a.stats[0].base_stat;
        const hpB = b.stats[0].base_stat;
        if (hpA > hpB) {
          return -1;
        }
        if (hpA < hpB) {
          return 1;
        }
        return 0; // hp must be equal
      })
      setFilteredPokemonContainer(sortedPokemonContainer);
    }

    setLoading(false);
  }, [sortBy])

  // handle filter type
  useEffect(() => {
    setLoading(true);
    if (selectedTypes.length === 0) {
      setFilteredPokemonContainer(pokemonContainer);
      setLoading(false);
      return;
    }

    const filteredPokemons = pokemonContainer?.filter((pokemon) => {
      return isPokemonSelectedType(createPokemonTypesString(pokemon.types), selectedTypes)
    })
    setFilteredPokemonContainer(filteredPokemons);
    setLoading(false);
  }, [selectedTypes])

  // handle filter type helpers
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

  // handle filter type helpers
  function isPokemonSelectedType(pokemonTypesString, selectedTypes) {
    let isPokemonSelectedType = false;
    for (const type of selectedTypes) {
      if (pokemonTypesString.includes(type)) {
        isPokemonSelectedType = true;
      } else {
        return false;
      }
    }
    return isPokemonSelectedType;
  }

  // handle pokemon cards
  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      fetch("https://pokemon-collection-server.vercel.app/partial-pokemon") // partial - pokemon
        .then((response) => {
          return response.json(); // Convert response to JSON
        })
        .then((data) => {
          // console.log(data);
          setPokemonContainer(data);
          setFilteredPokemonContainer(data);
          setLoading(false);
        })
        .catch((error) => {
          // Handle any errors from the fetch or subsequent operations
          console.error('Error fetching or processing data:', error);
          setLoading(false); // Ensure loading state is set to false in case of error
          setError(true);
        });
    };
    fetchPokemonData();
  }, []); // run once on mount

  async function getRandomPokemon() {
    const pokemonId = getRandomNumber(1, 1026);
    navigate(`pokemon/${pokemonId}`);
  }

  function handleSelectedPokemon(e) {
    let pokemonCard = e.target.closest(".pokemon-card");
    if (!pokemonCard) return;
    const pokemonId = Number(pokemonCard.querySelector(".pokemon-name").textContent.split(" ")[0]);
    navigate(`/pokemon/${pokemonId}`);
  }

  async function loadMorePokemon() {
    const lastPokemonId = pokemonContainer.length;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    setLoading(true);
    fetch("https://pokemon-collection-server.vercel.app/more-pokemon", {
      method: "POST",
      body: JSON.stringify({ index: lastPokemonId }),
      headers: myHeaders,
    })
      .then((response) => {
        return response.json(); // Convert response to JSON
      })
      .then((data) => {
        // console.log(data);
        setPokemonContainer((prevPokemonContainer) => [...prevPokemonContainer, ...data]);
        setFilteredPokemonContainer((prevFilteredPokemonContainer) => [...prevFilteredPokemonContainer, ...data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching or processing data:', error);
        setLoading(false);
        setError(true);
      });
  }

  return (
    <>
      { loading ? (
        <></>
      ) : (
        <div id="search-filter-container">
          <SearchComponent searchInput={searchInput} setSearchInput={setSearchInput} sortBy={sortBy} setSortBy={setSortBy}/>
          <FilterComponent selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}/>
        </div>
      )}
      <main>
        <div id="pokemon-container" onClick={handleSelectedPokemon}>
          {loading ? (
            <LoadingComponent />
          ) : error ? (
            <p>Error fetching Pokemon data. Please try again later.</p>
          ) : filteredPokemonContainer.length === 0 ? (
            <p>No Pokemon found</p>
          ) : (
            <PokemonCard currentItems={currentItems} upperCaseFirtLetter={upperCaseFirtLetter} />
          )}
        </div>
        { loading ? (
            <></>
          ) : (
            <>
              <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
              <div className="more-btns-container">
                <button onClick={getRandomPokemon} className="random-pokemon-btn">Get Random Pokemon</button>
                <button onClick={loadMorePokemon} className="laod-more-pokemon-btn">Load More Pokemon</button>
              </div>
            </>
        )}
      </main>
    </>
  );
};

export default Home;