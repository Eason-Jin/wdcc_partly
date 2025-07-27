import React, { useEffect, useState } from 'react';
import './WorldTree.css';
import { dummyParts } from '../../assets/data';
import type { Part } from '../../types/part';

interface WorldTreeProps {
  onSelectNode: (nodeId: string) => void;
  selectedNode: string | null;
}

const WorldTree: React.FC<WorldTreeProps> = ({ onSelectNode, selectedNode }) => {
  const [treeData, setTreeData] = useState<Part[]>(dummyParts);
  const [rootNodes, setRootNodes] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        setLoading(true);
        setTreeData(dummyParts);
        setRootNodes(treeData.filter(part => !part.parent).map(part => part.id));
        setLoading(false);
      } catch (err) {
        setError('Failed to load World Tree data');
        setLoading(false);
        console.error('Error fetching world tree:', err);
      }
    };

    fetchTree();
  }, [treeData]);

  const toggleNode = (nodeId: string) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId);
    } else {
      newExpandedNodes.add(nodeId);
    }
    setExpandedNodes(newExpandedNodes);
  };

  const getNodeName = (node: Part): string => {
    return node.names;
  };

  const renderNode = (nodeId: string, level: number = 0) => {
    const node = treeData.find(part => part.id === nodeId);
    if (!node) return null;

    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(nodeId);
    const isSelected = selectedNode === nodeId;

    return (
      <div key={nodeId} className="tree-node-container" style={{ paddingLeft: `${level * 16}px` }}>
        <div
          className={`tree-node ${isSelected ? 'selected' : ''}`}
          onClick={() => onSelectNode(nodeId)}
        >
          {hasChildren && (
            <span
              className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
              onClick={(e) => { e.stopPropagation(); toggleNode(nodeId); }}
            >
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          <span className="node-name">{getNodeName(node)}</span>
        </div>

        {isExpanded && hasChildren && (
          <div className="node-children">
            {node.children!.map(childId => renderNode(childId, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="tree-loading">Loading World Tree...</div>;
  }

  if (error) {
    return <div className="tree-error">{error}</div>;
  }

  return (
    <div className="world-tree">
      <h2 className="tree-title">World Tree</h2>
      <div className="tree-container">
        {rootNodes.map(nodeId => renderNode(nodeId))}
      </div>
    </div>
  );
};

export default WorldTree;