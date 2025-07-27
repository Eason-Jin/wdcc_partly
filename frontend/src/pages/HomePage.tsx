import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import SearchBox from '../components/SearchBox/SearchBox';
import WorldTree from '../components/WorldTree/WorldTree';
import CarViewer from '../components/CarViewer';
import PartInfoPanel from '../components/PartInfoPanel/PartInfoPanel';
import Modal from '../components/Modal/Modal'; 
import { getPartInfo, GHCANode } from '../services/api';

const HomePage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [modalPartInfo, setModalPartInfo] = useState<GHCANode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openPartModal = (partInfo: GHCANode) => {
    setModalPartInfo(partInfo);
    setIsModalOpen(true);
  };

  const closePartModal = () => {
    setIsModalOpen(false);
    setModalPartInfo(null);
  };

  const handleSelectNode = (nodeId: string) => {
    setSelectedNode(nodeId);
    
    getPartInfo(nodeId).then(openPartModal).catch(err => console.error(err));
  };

  const handleSelectPartFromSearch = (partId: string, partDetails?: GHCANode) => {
    setSelectedNode(partId); 
    if (partDetails) {
      openPartModal(partDetails);
    } else {
      getPartInfo(partId).then(openPartModal).catch(err => console.error(err));
    }
  };

  
  const sidebarContent = (
    <>
      <SearchBox onSelectPart={handleSelectPartFromSearch} />
      <div className="sidebar-divider"></div>
      <WorldTree onSelectNode={handleSelectNode} selectedNode={selectedNode} />
    </>
  );

  
  const mainContent = (
    <CarViewer selectedPart={selectedNode} />
  );

  return (
    <>
      <Layout 
        sidebar={sidebarContent}
        content={mainContent}
      />
      <Modal isOpen={isModalOpen} onClose={closePartModal}>
        {modalPartInfo && <PartInfoPanel partInfo={modalPartInfo} />}
      </Modal>
    </>
  );
};

export default HomePage;