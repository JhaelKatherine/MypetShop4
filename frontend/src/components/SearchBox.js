// SearchBox.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          const response = await axios.get(`/api/products/search?query=${query}`);
          setResults(response.data.products);
        } catch (error) {
          console.error('Error searching products: ', error);
        }
      };
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
      <form onSubmit={submitHandler}>
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
        />
        <button type="submit">Search</button>
        {results.length > 0 && (
            <div className="search-results">
              {results.map((product) => (
                  <div key={product._id}>{product.name}</div>
              ))}
            </div>
        )}
      </form>
  );
}
