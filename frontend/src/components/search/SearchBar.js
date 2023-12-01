import React, {useEffect, useRef, useState} from 'react';
import SearchResult from './SearchResult';
import axios from "axios";
import '../../Css/SearchResult.css'

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const fetchResults = async (query) => {
    try {
      const response = await axios.get(`/api/products/search?query=${query}`);
      const products = response.data.products;
      const availableProducts = products.filter(product => product.status === true);
      setResults(availableProducts);
    } catch (error) {
      console.error('Error searching products: ', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    if(/[^\w\s]/gi.test(query)){
      setError('No special characters allowed');
      return;
    }
    setError(null);
    const sanitizedQuery = query.replace(/[^\w\s]/gi, '');
    setQuery(sanitizedQuery);
    if (sanitizedQuery && sanitizedQuery!=="") {
      fetchResults(sanitizedQuery);
    } else {
      setResults([]);
    }
  };

  const clearResults = () => setResults([]);

  return (
      <div>
        <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search products..."
            className={'searchInput'}
            maxLength={30}
        />
        {error && <div className="error">{error}</div>}
        {results.length > 0 && <div ref={resultsRef}><SearchResult results={results} clearResults={clearResults} /></div>}
      </div>
  );
}