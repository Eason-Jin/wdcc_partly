import React from 'react';
import './ImageModal.css';

interface ImageModalProps {
  imageUrl: string;
  description?: string;
  altText: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  imageUrl, 
  description, 
  altText,
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose}>
          &times;
        </button>
        <img 
          src={imageUrl} 
          alt={altText} 
          className="image-modal-img" 
        />
        {description && (
          <div className="image-modal-description">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;