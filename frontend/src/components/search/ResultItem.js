import '../../Css/SearchResult.css'
import React from 'react';
import { Link } from 'react-router-dom';

export default function ResultItem({ product }) {
    return (
        <Link to={`/product/${product.slug}`} className="result-item" onClick={clearResults}>
            <span>{product.name}</span>
            <img src={product.image} alt={product.name} />
        </Link>
    );
}