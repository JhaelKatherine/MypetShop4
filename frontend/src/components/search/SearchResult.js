import React from 'react';
import ResultItem from './ResultItem';

export default function SearchResult({ results }) {
    return (
        <div className="search-results">
            {results.map((product) => (
                <ResultItem key={product._id} product={product} />
            ))}
        </div>
    );
}
