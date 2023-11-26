// SearchBox.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          const response = await axios.get(`/api/products/search?query=${query}`);
          setResults(response.data.products);
          setModalIsOpen(true);
        } catch (error) {
          console.error('Error searching products: ', error);
        }
      };
      fetchResults();
    } else {
      setResults([]);
      setModalIsOpen(false);
    }
  }, [query]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
      <div>
        <form onSubmit={submitHandler}>
          <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
          />
          <button type="submit">Search</button>
        </form>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          {results.map((product) => (
              <div key={product._id}>{product.name}</div>
          ))}
        </Modal>
      </div>
  );
}
