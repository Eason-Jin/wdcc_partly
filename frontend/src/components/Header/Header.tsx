import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">Taming the World Tree</h1>
        <p className="app-description">
          Explore the complete hierarchy of vehicle parts with intuitive navigation.
          Search, visualize, and understand how each part connects within a vehicle's assembly.
        </p>
      </div>
    </header>
  );
};

export default Header;