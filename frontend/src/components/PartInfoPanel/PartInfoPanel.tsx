import React from 'react';
import { GHCANode } from '../../services/api';
import './PartInfoPanel.css';

interface PartInfoProps {
  partInfo: GHCANode;
}

const PartInfoPanel: React.FC<PartInfoProps> = ({ partInfo }) => {
  const getName = (): string => {
    const enName = partInfo.names.find(n => n.language.startsWith('en'));
    return enName ? enName.value : 'Unknown Part';
  };

  const getAliases = (): string[] => {
    if (!partInfo.aliases || partInfo.aliases.length === 0) return [];
    return partInfo.aliases
      .filter(a => a.language.startsWith('en'))
      .map(a => a.value);
  };

  return (
    <div className="part-info-panel">
      <h2 className="part-title">{getName()}</h2>
      
      <div className="part-id">
        <span className="label">Part ID:</span>
        <span className="value">{partInfo.id}</span>
      </div>

      {getAliases().length > 0 && (
        <div className="part-section">
          <h3 className="section-title">Also Known As</h3>
          <ul className="aliases-list">
            {getAliases().map((alias, index) => (
              <li key={index}>{alias}</li>
            ))}
          </ul>
        </div>
      )}

      {partInfo.representation?.description?.function_purpose && 
       partInfo.representation.description.function_purpose.length > 0 && (
        <div className="part-section">
          <h3 className="section-title">Function & Purpose</h3>
          <p>{partInfo.representation.description.function_purpose.join(' ')}</p>
        </div>
      )}

      {partInfo.representation?.description?.typical_material && 
       partInfo.representation.description.typical_material.length > 0 && (
        <div className="part-section">
          <h3 className="section-title">Material</h3>
          <p>{partInfo.representation.description.typical_material.join(' ')}</p>
        </div>
      )}

      {partInfo.representation?.examples && 
       partInfo.representation.examples.length > 0 && (
        <div className="part-section">
          <h3 className="section-title">Images</h3>
          <div className="example-images">
            {partInfo.representation.examples.map((example, index) => (
              <div key={index} className="example-image-container">
                <img 
                  src={example.image_url} 
                  alt={`${getName()} example ${index + 1}`}
                  className="example-image"
                />
                {example.description && (
                  <div className="image-description">{example.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartInfoPanel;