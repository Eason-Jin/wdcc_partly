import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import SearchBox from '../components/SearchBox/SearchBox';
import WorldTree from '../components/WorldTree/WorldTree';
import CarViewer from '../components/CarViewer';
import PartInfoPanel from '../components/PartInfoPanel/PartInfoPanel';
import { getPartInfo, GHCANode } from '../services/api';

const HomePage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedPartInfo, setSelectedPartInfo] = useState<GHCANode | null>(null);

  // Handle selection from World Tree
  const handleSelectNode = async (nodeId: string) => {
    setSelectedNode(nodeId);
    
    try {
      const partInfo = await getPartInfo(nodeId);
      setSelectedPartInfo(partInfo);
    } catch (error) {
      console.error('Error fetching part info:', error);
    }
  };

  // Handle selection from Search results
  const handleSelectPart = async (partId: string, partDetails?: GHCANode) => {
    setSelectedNode(partId);
    
    if (partDetails) {
      // If part details already available from search, use them directly
      setSelectedPartInfo(partDetails);
    } else {
      // Otherwise fetch part details
      try {
        const partInfo = await getPartInfo(partId);
        setSelectedPartInfo(partInfo);
      } catch (error) {
        console.error('Error fetching part info:', error);
      }
    }
  };

  // Sidebar content with search, world tree and part info
  const sidebarContent = (
    <>
      {/* Search box at the top of sidebar */}
      <SearchBox onSelectPart={handleSelectPart} />
      
      {/* Part info panel shown when a part is selected */}
      {selectedPartInfo && (
        <>
          <div className="sidebar-divider"></div>
          <PartInfoPanel partInfo={selectedPartInfo} />
        </>
      )}
      
      {/* World Tree component at the bottom of sidebar */}
      <div className="sidebar-divider"></div>
      <WorldTree onSelectNode={handleSelectNode} selectedNode={selectedNode} />
    </>
  );

  // Main content with 3D car model
  const mainContent = (
    <CarViewer selectedPart={selectedNode} />
  );

  return (
    <Layout 
      sidebar={sidebarContent}
      content={mainContent}
    />
  );
};

export default HomePage;