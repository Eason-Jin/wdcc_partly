import React, { useState } from 'react';
import { GHCANode } from '../../services/api';
import ImageModal from '../ImageModal/ImageModal';
import './PartInfoPanel.css';

interface PartInfoProps {
  partInfo: GHCANode;
}

const PartInfoPanel: React.FC<PartInfoProps> = ({ partInfo }) => {
  // State for the image modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageDesc, setSelectedImageDesc] = useState<string>('');

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

  // Handler to open the image modal
  const openImageModal = (imageUrl: string, description: string = '') => {
    setSelectedImage(imageUrl);
    setSelectedImageDesc(description);
  };

  // Handler to close the image modal
  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedImageDesc('');
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
          <div className="image-links">
            {partInfo.representation.examples.map((example, index) => (
              <div key={index} className="image-link-item">
                <button 
                  className="image-link"
                  onClick={() => openImageModal(example.image_url, example.description)}
                >
                  <svg className="image-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19M19,19H5V5H19M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
                  </svg>
                  View Image {index + 1}
                  {example.description && (
                    <span className="image-description-inline">
                      - {example.description}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        imageUrl={selectedImage || ''}
        description={selectedImageDesc}
        altText={`${getName()} enlarged view`}
        isOpen={selectedImage !== null}
        onClose={closeImageModal}
      />
    </div>
  );
};

export default PartInfoPanel;