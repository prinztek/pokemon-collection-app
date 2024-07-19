import { useState, useEffect } from "react";
import { useSearchParams  } from "react-router-dom";
import debounce from "lodash.debounce";

const SearchAndFilter = ({ searchInput, setSearchInput, sortBy, setSortBy }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearchChange = (e) => {
    const target = e.target.value;

    if (target.length === 0) {
      searchParams.delete('q');
      setSearchParams(searchParams);
    } else {
      searchParams.set("q", target);
      setSearchParams(searchParams);
    }
  }

  const onEnterPress = (e) => {
    const key = e.code;
    if (key === "Enter") {
      console.log(e.target.value);
      setSearchInput(e.target.value);
    }
  }

  const onSortChange = (e) => {
    const target = e.target.value;
    setSortBy(target);
  }

  return (
    <>
      <input
        onKeyDown={onEnterPress}
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

