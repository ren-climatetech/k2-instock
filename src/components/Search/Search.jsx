import "./Search.scss";
import { useState } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
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
        <img src="../../../src/assets/icons/search-icon.svg" alt="search icon" className="search__icon"/> {/* Использование символа поиска */}
    </div>
    );
};

export default Search;