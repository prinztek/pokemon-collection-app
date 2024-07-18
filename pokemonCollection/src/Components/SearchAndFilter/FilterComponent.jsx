import { useState, useEffect } from "react";

const FilterComponent = ({ searchInput, setSearchInput, setFilterArray, selectedTypes, setSelectedTypes }) => {
  const types = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy"
  ];
  const [isOpen, setIsOpen] = useState(false);


  function toggleFilterDropdown() {
    setIsOpen(!isOpen);
  }

  function handleFilterSelect(e) {
    const target = e.target.value;
    if (!selectedTypes.includes(target)) {
      setSelectedTypes([...selectedTypes, target]); // add type
    } else {
      // remove selected type
      const newTypes = selectedTypes.filter((type) => type != target);
      setSelectedTypes(newTypes);
    }
    // console.log(selectedTypes)
  }

  return (
    <>
      <div className="multipleSelection">
        <div className="selectBox" onClick={toggleFilterDropdown}>
          <select>
            <option>Filter by Type</option>
          </select>
        </div>
        {
          isOpen &&
          <div id="checkBoxes">
            { types && types.map((type, index) => (
              <label htmlFor={type} key={index}>
                <input onClick={handleFilterSelect} key={index} type="checkbox" id={type} name={type} value={type}/>
                {type}
              </label>
              ))}
          </div>
        }
      </div>
    </>
  );
};

export default FilterComponent;
