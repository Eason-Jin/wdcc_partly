import React from 'react';
import './SearchResults.css';

interface PartInfo {
  id: string;
  names: {
    language: string;
    value: string;
  }[];
  aliases?: {
    language: string;
    value: string;
  }[];
  representation?: {
    description?: {
      usage_notes?: string[];
      function_purpose?: string[];
      typical_material?: string[];
      typical_positioning?: string[];
    };
    examples?: {
      image_url: string;
      description: string;
    }[];
  };
}

interface SearchResultsProps {
  results: PartInfo[];
  onSelectPart: (partId: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelectPart }) => {
  if (!results || results.length === 0) {
    return null;
  }

  const getName = (part: PartInfo): string => {
    const enName = part.names.find(n => n.language.startsWith('en'));
    return enName ? enName.value : 'Unknown Part';
  };

  const getAliases = (part: PartInfo): string[] => {
    if (!part.aliases || part.aliases.length === 0) return [];
    return part.aliases
      .filter(a => a.language.startsWith('en'))
      .map(a => a.value);
  };

  return (
    <div className="search-results">
      <h3 className="results-title">Search Results</h3>
      <div className="results-list">
        {results.map((part) => (
          <div 
            key={part.id} 
            className="result-item"
            onClick={() => onSelectPart(part.id)}
          >
            <div className="result-main">
              <h4 className="part-name">{getName(part)}</h4>
              
              {getAliases(part).length > 0 && (
                <div className="part-aliases">
                  <span className="aliases-label">Also known as: </span>
                  {getAliases(part).join(', ')}
                </div>
              )}
              
              {part.representation?.description?.function_purpose && part.representation.description.function_purpose.length > 0 && (
                <div className="part-purpose">
                  <span className="purpose-label">Purpose: </span>
                  {part.representation.description.function_purpose.join(' ')}
                </div>
              )}
            </div>
            
            {part.representation?.examples && part.representation.examples.length > 0 && (
              <div className="result-images">
                {part.representation.examples.slice(0, 2).map((example, index) => (
                  <div key={index} className="example-image-container">
                    <img 
                      src={example.image_url} 
                      alt={`${getName(part)} example ${index + 1}`} 
                      className="example-image"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;