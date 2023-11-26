import React from 'react';
import ResultItem from './ResultItem';
import '../../Css/SearchResult.css'

export default function SearchResult({ results, clearResults }) {
    return (
        <div className="search-results">
            {results.map((product) => (
                <ResultItem key={product._id} product={product} clearResults={clearResults} />
            ))}
        </div>
    );
}
