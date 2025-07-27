import React, { useState } from 'react';
import { searchParts, GHCANode } from '../../services/api';
import './SearchBox.css';

interface SearchBoxProps {
  onSelectPart: (partId: string, partDetails?: GHCANode) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSelectPart }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<GHCANode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const searchResults = await searchParts(query);
      setResults(searchResults || []);
    } catch (err) {
      setError('Failed to search parts. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getName = (part: GHCANode): string => {
    const enName = part.names.find(n => n.language.startsWith('en'));
    return enName ? enName.value : 'Unknown Part';
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Find Parts</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for parts (e.g., 'Front Door', 'LFDSH')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button 
          type="submit" 
          className={`search-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          )}
        </button>
      </form>

      {error && <div className="search-error">{error}</div>}
      
      {results.length > 0 && (
        <div className="search-results">
          <h3>Results ({results.length})</h3>
          <div className="results-list">
            {results.map(part => (
              <div 
                key={part.id}
                className="result-item"
                onClick={() => onSelectPart(part.id, part)}
              >
                <div className="result-content">
                  <h4 className="result-title">{getName(part)}</h4>
                  {part.aliases && part.aliases.length > 0 && (
                    <p className="result-aliases">
                      Also known as: {part.aliases
                        .filter(a => a.language.startsWith('en'))
                        .map(a => a.value)
                        .join(', ')}
                    </p>
                  )}
                </div>
                {part.representation?.examples && part.representation.examples.length > 0 && (
                  <div className="result-thumbnail">
                    <img 
                      src={part.representation.examples[0].image_url} 
                      alt={getName(part)} 
                      className="thumbnail-image" 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;