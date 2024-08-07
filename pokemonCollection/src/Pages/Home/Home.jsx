import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination.jsx";
import SearchComponent from "../../Components/SearchAndFilter/SearchComponent.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import PokemonCard from "../../Components/PokemonCard/PokemonCard.jsx";
import FilterComponent from "../../Components/SearchAndFilter/FilterComponent.jsx";
import { upperCaseFirtLetter } from "../../Utility/utils.js";
import "./Home.css";
import { PokemonContext } from "../../PokemonProvider.jsx";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { pokemon, setPokemon } = useContext(PokemonContext);
  const [pokemonContainer, setPokemonContainer] = useState([]);
  const [filteredPokemonContainer, setFilteredPokemonContainer] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState();
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
    const newOffset =
      (event.selected * itemsPerPage) % filteredPokemonContainer?.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  // handle sort by
  useEffect(() => {
    setLoading(true);
    if (sortBy === "") {
      setFilteredPokemonContainer(pokemonContainer);
      setLoading(false);
      return;
    }

    const sortedPokemonContainer = [...filteredPokemonContainer].sort(
      (a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else {
          const hpA = a.stats[0].base_stat;
          const hpB = b.stats[0].base_stat;
          if (sortBy === "lowHp") {
            return hpA - hpB;
          } else if (sortBy === "highHp") {
            return hpB - hpA;
          }
        }
        return 0;
      }
    );

    setFilteredPokemonContainer(sortedPokemonContainer);
    setLoading(false);
  }, [sortBy]);

  // handle filter type
  useEffect(() => {
    setLoading(true);
    if (selectedTypes.length === 0) {
      setFilteredPokemonContainer(pokemonContainer);
      setLoading(false);
      return;
    }

    const filteredPokemons = pokemonContainer?.filter((pokemon) => {
      return isPokemonSelectedType(
        createPokemonTypesString(pokemon.types),
        selectedTypes
      );
    });
    setFilteredPokemonContainer(filteredPokemons);
    setLoading(false);
  }, [selectedTypes]);

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
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPokemonData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch("http://localhost:3000/partial-pokemon", {
          signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemonContainer(data);
        setFilteredPokemonContainer(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(true);
          console.error("Error fetching or processing data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();

    return () => {
      controller.abort();
    };
  }, []); // run once on mount

  async function getRandomPokemon() {
    fetch("http://localhost:3000/random-pokemon")
      .then((response) => {
        console.log(response);
        return response.json(); // Convert response to JSON
      })
      .then((data) => {
        setPokemon(data);
        return data;
      })
      .then((pokemon) => {
        navigate(`pokemon/${pokemon.id}`);
      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
        setError(true);
      });
  }

  function handleSelectedPokemon(e) {
    let pokemonCard = e.target.closest(".pokemon-card");
    if (!pokemonCard) return;
    const pokemonId = Number(
      pokemonCard.querySelector(".pokemon-name").textContent.split(" ")[0]
    );
    // setPokemon(filteredPokemonContainer[pokemonId - 1]);
    navigate(`/pokemon/${pokemonId}`);
  }

  async function loadMorePokemon() {
    const lastPokemonId = pokemonContainer.length;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    setLoading(true);
    fetch("http://localhost:3000/more-pokemon", {
      method: "POST",
      body: JSON.stringify({ index: lastPokemonId }),
      headers: myHeaders,
    })
      .then((response) => {
        return response.json(); // Convert response to JSON
      })
      .then((data) => {
        setPokemonContainer((prev) => [...prev, ...data]);
        setFilteredPokemonContainer((prev) => [...prev, ...data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
        setLoading(false);
        setError(true);
      });
  }

  return (
    <>
      {!loading && (
        <div id="search-filter-container">
          <SearchComponent
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <FilterComponent
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />
        </div>
      )}
      <main>
        <div id="pokemon-container" onClick={handleSelectedPokemon}>
          {error && <p>Error fetching Pokemon data. Please try again later.</p>}
          {loading && <LoadingComponent />}
          {!error && !loading && filteredPokemonContainer.length !== 0 && (
            <PokemonCard
              currentItems={currentItems}
              upperCaseFirtLetter={upperCaseFirtLetter}
            />
          )}
        </div>
        {!loading && (
          <>
            <Pagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
              currentPage={currentPage}
            />
            <div className="more-btns-container">
              <button onClick={getRandomPokemon} className="random-pokemon-btn">
                Get Random Pokemon
              </button>
              <button
                onClick={loadMorePokemon}
                className="laod-more-pokemon-btn"
              >
                Load More Pokemon
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
