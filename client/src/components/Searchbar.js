import React, { useState } from "react";
import { ReactComponent as Search } from "../SearchIco.svg";
import { useNavigate } from "react-router-dom";

export default function Searchbar({ products }) {
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);

  function handleChange(e) {
    setSearch(e.target.value);

    const results = products.filter((item) => {
      return (
        e.target.value &&
        item &&
        item.name &&
        item.name.toLowerCase().includes(e.target.value)
      );
    });
    setSearchResults(results);
  }

  const navigate = useNavigate();

  const searchItems = searchResults.map((item) => {
    return (
      <div
        className="search-details"
        key={item.id}
        onClick={() => navigate(`/products/${item.id}`)
        }
      >
        <img src={item.imageUrl} alt={item.name} />
        <span>{item.name}</span>
      </div>
    );
  });
  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Search here"
          value={search}
          onChange={handleChange}
          type="search"
        />
        <Search />
      </div>
      <div className="search-results">{searchItems}</div>
    </div>
  );
}
