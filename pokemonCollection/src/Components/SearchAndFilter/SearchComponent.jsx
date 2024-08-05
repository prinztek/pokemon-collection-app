import { useNavigate } from "react-router-dom";
import "./SearchAndFilter.css";

const SearchAndFilter = ({
  searchInput,
  setSearchInput,
  sortBy,
  setSortBy,
}) => {
  const navigate = useNavigate();

  const onSearchChange = (e) => {
    const target = e.target.value;
    setSearchInput(target);
  };

  const onEnterPress = (e) => {
    const key = e.code;
    if (key === "Enter") {
      navigate(`/search?q=${searchInput}`);
    }
  };

  const onSortChange = (e) => {
    const target = e.target.value;
    setSortBy(target);
  };

  return (
    <>
      <input
        onKeyDown={onEnterPress}
        onChange={onSearchChange}
        className="search-input"
        type="text"
        placeholder="Type a pokemon name"
      />
      <select
        className="select-sortBy"
        onChange={onSortChange}
        name="sortBy"
        defaultValue=""
        value={sortBy}
      >
        <option value="" disabled>
          Sort by
        </option>
        <option value="name">Name</option>
        <option value="lowHp">Low Hp</option>
        <option value="highHp">High Hp</option>
      </select>
    </>
  );
};

export default SearchAndFilter;
