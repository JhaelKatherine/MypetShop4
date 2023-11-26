import '../../Css/SearchResult.css'
import React from 'react';

export default function ResultItem({ product }) {
    return (
        <div className="result-item">
            <span>{product.name}</span>
            <img src={product.image} alt={product.name} />
        </div>
    );
}
