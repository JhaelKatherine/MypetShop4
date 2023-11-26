import '../../Css/SearchResult.css'
import React from 'react';
import { Link } from 'react-router-dom';

export default function ResultItem({ product }) {
    return (
        <Link to={`/products/${product._id}`} className="result-item">
            <span>{product.name}</span>
            <img src={product.image} alt={product.name} />
        </Link>
    );
}
