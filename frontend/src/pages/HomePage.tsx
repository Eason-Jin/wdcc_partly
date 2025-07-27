import { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import SearchBox from '../components/SearchBox/SearchBox';
import WorldTree from '../components/WorldTree/WorldTree';
import CarViewer from '../components/CarViewer';
import { PartContext } from "../context/PartContext";
import { dummyParts } from "../assets/data";
import type { Part } from "../types/part";

import PartInfoPanel from '../components/PartInfoPanel/PartInfoPanel';


export default function HomePage() {
    const { defaultParts, setDefaultParts, initaliseDefaultParts } = useContext(PartContext);
    const USE_LOCAL_DATA = true;
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [selectedPartInfo, setSelectedPartInfo] = useState<Part | null>(null);

    // Handle selection from World Tree
    const handleSelectNode = async (nodeId: string) => {
        setSelectedNode(nodeId);

        try {
            const partInfo = defaultParts.find(part => part.id === nodeId) || null;
            setSelectedPartInfo(partInfo);
        } catch (error) {
            console.error('Error fetching part info:', error);
        }
    };

    // Handle selection from Search results
    const handleSelectPart = async (partId: string, partDetails?: Part) => {
        setSelectedNode(partId);

        if (partDetails) {
            // If part details already available from search, use them directly
            setSelectedPartInfo(partDetails);
        } else {
            // Otherwise fetch part details
            try {
                const partInfo = defaultParts.find(part => part.id === partId) || null;
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

    useEffect(() => {
        if (!USE_LOCAL_DATA) {
            initaliseDefaultParts();
        } else {
            setDefaultParts(dummyParts);
        }
    })

    return (
        <Layout
            sidebar={sidebarContent}
            content={mainContent}
        />
    );
}