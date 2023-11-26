import React, { useState } from 'react';
import SearchResult from './SearchResult';
import axios from "axios";
import '../../Css/SearchResult.css'

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fetchResults = async (query) => {
    try {
      const response = await axios.get(`/api/products/search?query=${query}`);
      setResults(response.data.products);
    } catch (error) {
      console.error('Error searching products: ', error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);
    if (query) {
      fetchResults(query);
    } else {
      setResults([]);
    }
  };

  return (
      <div>
        <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search products..."
            className={'searchInput'}
        />
        {results.length > 0 && <SearchResult results={results} />}
      </div>
  );
}