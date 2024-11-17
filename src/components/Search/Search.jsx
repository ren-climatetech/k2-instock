import { useState } from "react";
import "./Search.scss";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // here we are notifying parent component about the updated query
  };

  return (
    <div className="search__container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="search__input"
      />
      <img
        src="../../../src/assets/icons/search-icon.svg"
        alt="search icon"
        className="search__icon"
      />
    </div>
  );
};

export default Search;
