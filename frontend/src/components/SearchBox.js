// SearchBox.js
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
  <FormControl
  type="text"
  name="q"
  id="q"
  onChange={(e) => setQuery(e.target.value)}
  placeholder="search products..."
  aria-label="Search Products"
  aria-describedby="button-search"
  className="w-100"
  style={{
    borderRadius: '20px',
    maxWidth: '950px', // Modifica el maxWidth según tu preferencia
    width: 'calc(100% - 44px)', // Ancho restante luego de considerar el botón
  }}
/>

  );
}
