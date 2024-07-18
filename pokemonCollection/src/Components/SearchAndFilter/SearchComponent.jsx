import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const SearchAndFilter = ({ searchInput, setSearchInput, sortBy, setSortBy }) => {
  const onSearchChange = (e) => {
    const target = e.target.value;
    const debouncedSetSearchInput = debounce(() => {
      setSearchInput(target)
      // console.log(target)
    }, 450);
    debouncedSetSearchInput();
  }

  const onSortChange = (e) => {
    const target = e.target.value;
    setSortBy(target);
  }

  return (
    <>
      <input
        onChange={onSearchChange}
        className="search-input"
        type="text"
        placeholder="Type a pokemon name"
      />
      <select className="select-sortBy" onChange={onSortChange} name="sortBy" defaultValue="" value={sortBy}>
        <option value="" disabled>Sort by</option>
        <option value="name">Name</option>
        <option value="lowHp">Low Hp</option>
        <option value="highHp">High Hp</option>
      </select>
    </>
  );
};

export default SearchAndFilter;

