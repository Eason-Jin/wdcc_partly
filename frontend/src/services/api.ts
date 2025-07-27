import axios from 'axios';

// Define types for the API responses
export interface Name {
  language: string;
  value: string;
}

export interface Description {
  usage_notes?: string[];
  typical_shape?: string[];
  function_purpose?: string[];
  typical_material?: string[];
  typical_positioning?: string[];
}

export interface Example {
  image_url: string;
  description: string;
}

export interface Representation {
  description?: Description;
  examples?: Example[];
}

export interface GHCANode {
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

export interface GAPCPartType {
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

export interface GAPCPosition {
  id: string;
  created_at: string;
  updated_at: string;
  names: Name[];
  aliases: Name[];
}

export interface WorldTreeResponse {
  root_nodes: string[];
  nodes: Record<string, GHCANode>;
  gapc_part_types: Record<string, GAPCPartType>;
  gapc_positions: Record<string, GAPCPosition>;
}

const API_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : 'http://localhost:3000/api';

// Get World Tree data with a specific number of layers
export const getWorldTree = async (numLayers = 2): Promise<WorldTreeResponse> => {
  try {
    const response = await axios.get<WorldTreeResponse>(`${API_URL}/tree/world`, {
      params: { numLayers }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching world tree data:', error);
    throw error;
  }
};

// Get information about a specific part by GHCA ID
export const getPartInfo = async (ghcaId: string): Promise<GHCANode> => {
  try {
    const response = await axios.get<GHCANode>(`${API_URL}/tree/node/${ghcaId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching part info for ${ghcaId}:`, error);
    throw error;
  }
};

// Search for parts by name or alias
export const searchParts = async (query: string): Promise<GHCANode[]> => {
  try {
    const response = await axios.get<GHCANode[]>(`${API_URL}/tree/search`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching parts:', error);
    throw error;
  }
};