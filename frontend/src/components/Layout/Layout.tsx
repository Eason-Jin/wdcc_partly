import React, { ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, content }) => {
  return (
    <div className="app-layout">
      <div className="sidebar">
        {sidebar}
      </div>
      <div className="main-content">
        {content}
      </div>
    </div>
  );
};

export default Layout;