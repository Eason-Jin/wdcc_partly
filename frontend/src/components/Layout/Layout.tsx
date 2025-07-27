import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import './Layout.css';

interface LayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, content }) => {
  return (
    <div className="app-container">
      <Header />
      <div className="layout">
        <div className="sidebar">
          {sidebar}
        </div>
        <div className="content">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Layout;