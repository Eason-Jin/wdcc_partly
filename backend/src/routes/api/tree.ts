import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

const PARTLY_URL = process.env.PARTLY_URL;
const PARTLY_API_KEY = process.env.PARTLY_API_KEY;

// Define TypeScript interfaces for the API data structures
interface Name {
  language: string;
  value: string;
}

interface Description {
  usage_notes?: string[];
  typical_shape?: string[];
  function_purpose?: string[];
  typical_material?: string[];
  typical_positioning?: string[];
}

interface Example {
  image_url: string;
  description: string;
}

interface Representation {
  description?: Description;
  examples?: Example[];
}

interface GHCANode {
  id: string;
  gapc_part_type_id: string;
  gapc_position_id: string;
  names: Name[];
  aliases?: Name[];
  children?: string[];
  parent?: string;
  order?: number;
  representation?: Representation;
}

interface GAPCPartType {
  id: string;
  created_at: string;
  updated_at: string;
  names: Name[];
  aliases: Name[];
  descriptions: any[];
  department: string;
  is_multi_purpose: boolean;
  assembly_classification: string;
  position_classification: string;
  primary_fitment_classification: string;
  uvdb_property_id_prefixes: string[];
  recommended_attributes: string[];
  categorizations: any[];
  positions: any[];
}

interface GAPCPosition {
  id: string;
  created_at: string;
  updated_at: string;
  names: Name[];
  aliases: Name[];
}

interface WorldTreeResponse {
  root_nodes: string[];
  nodes: Record<string, GHCANode>;
  gapc_part_types: Record<string, GAPCPartType>;
  gapc_positions: Record<string, GAPCPosition>;
}

// Get World Tree data with specified number of layers
router.get("/world", async (req: Request, res: Response) => {
  try {
    // Default to 2 layers if not specified
    const numLayers = req.query.numLayers ? parseInt(req.query.numLayers as string) : 2;
    
    const requestBody = {
      num_layers: numLayers,
      tree_root_ghca_id: null, // Get full tree from root
      languages: ["en-NZ", "en"]
    };
    
    const response = await axios.post<WorldTreeResponse>(
      `https://${PARTLY_URL}/api/v1/world-tree.search`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${PARTLY_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching world tree:", error);
    res.status(500).json({ error: "Failed to fetch World Tree data" });
  }
});

// Get specific node information by GHCA ID
router.get("/node/:ghcaId", async (req: Request, res: Response) => {
  try {
    const { ghcaId } = req.params;
    
    // Request the tree with the specific node as the root to get its subtree
    const requestBody = {
      num_layers: 1, // Just get the node and its immediate children
      tree_root_ghca_id: ghcaId,
      languages: ["en-NZ", "en"]
    };
    
    const response = await axios.post<WorldTreeResponse>(
      `https://${PARTLY_URL}/api/v1/world-tree.search`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${PARTLY_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    // Extract just the requested node
    const nodeData = response.data.nodes[ghcaId];
    
    if (!nodeData) {
      return res.status(404).json({ error: "Node not found" });
    }
    
    res.status(200).json(nodeData);
  } catch (error) {
    console.error(`Error fetching node ${req.params.ghcaId}:`, error);
    res.status(500).json({ error: "Failed to fetch node data" });
  }
});

// Search for parts by name or alias
router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = (req.query.query as string)?.toLowerCase();
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: "Search query is required" });
    }
    
    // Get a broader tree to search through
    const requestBody = {
      num_layers: 3, // Get first few layers for efficient searching
      tree_root_ghca_id: null,
      languages: ["en-NZ", "en"]
    };
    
    const response = await axios.post<WorldTreeResponse>(
      `https://${PARTLY_URL}/api/v1/world-tree.search`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${PARTLY_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    const worldTreeData = response.data;
    const searchResults: GHCANode[] = [];
    
    // Search through all nodes in the tree
    for (const nodeId in worldTreeData.nodes) {
      const node = worldTreeData.nodes[nodeId];
      
      // Check node names
      const nameMatch = node.names.some(name => 
        name.language.startsWith("en") && 
        name.value.toLowerCase().includes(query)
      );
      
      // Check node aliases
      const aliasMatch = node.aliases?.some(alias => 
        alias.language.startsWith("en") && 
        alias.value.toLowerCase().includes(query)
      );
      
      if (nameMatch || aliasMatch) {
        searchResults.push(node);
      }
    }
    
    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching parts:", error);
    res.status(500).json({ error: "Failed to search parts" });
  }
});

export default router;