import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { PartContext } from "./PartContext";
import type { Part } from "../types/part";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

interface TreeJson {
    root_nodes: string[];
    nodes: Record<string, {
        id: string;
        gapc_part_type_id: string;
        gapc_position_id: string;
        names: { language: string; value: string }[];
        children: string[];
        parent: string | null;
        representation: {
            examples: { image_url: string }[];
        };
    }>;
    gapc_part_types: Record<string, {
        id: string;
        names: { language: string; value: string }[];
        is_multi_purpose: boolean;
    }>;
    gapc_positions: Record<string, {
        id: string;
        names: { language: string; value: string }[];
    }>;
}

export interface PartContextType {
    convertJson: (json: TreeJson) => Part;
    defaultParts: Part[];
}

export const PartContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [defaultParts, setDefaultParts] = useState<Part[]>([]);

    function convertJson(json: TreeJson): Part {
        const rootId = json.root_nodes[0];
        const rootNode = json.nodes[rootId];

        return {
            id: rootNode.id,
            type: {
                id: rootNode.gapc_part_type_id,
                name: json.gapc_part_types[rootNode.gapc_part_type_id]?.names[0]?.value || "",
                is_multi_purpose: json.gapc_part_types[rootNode.gapc_part_type_id]?.is_multi_purpose || false,
            },
            position: {
                id: rootNode.gapc_position_id,
                position: json.gapc_positions[rootNode.gapc_position_id]?.names[0]?.value || "",
            },
            names: rootNode.names[0]?.value || "", // Use the first name's value
            children: rootNode.children.map((childId) => {
                const childNode = json.nodes[childId];
                return {
                    id: childNode.id,
                    type: {
                        id: childNode.gapc_part_type_id,
                        name: json.gapc_part_types[childNode.gapc_part_type_id]?.names[0]?.value || "",
                        is_multi_purpose: json.gapc_part_types[childNode.gapc_part_type_id]?.is_multi_purpose || false,
                    },
                    position: {
                        id: childNode.gapc_position_id,
                        position: json.gapc_positions[childNode.gapc_position_id]?.names[0]?.value || "",
                    },
                    names: childNode.names[0]?.value || "",
                    children: [], // Assume no deeper nesting for simplicity
                    parent_id: childNode.parent,
                    example_images: childNode.representation.examples.map((example) => example.image_url),
                };
            }),
            parent_id: rootNode.parent,
            example_images: rootNode.representation.examples.map((example) => example.image_url),
        };
    }

    async function fetchPart(id: string): Promise<Part | null> {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/tree/${id}`);
            return convertJson(response.data);
        } catch (error) {
            console.error("Error fetching part:", error);
            return null;
        }
    }

    async function initaliseDefaultParts() {
        const root = "GHCA47";
        try {
            const rootPart = await fetchPart(root);
            if (!rootPart) {
                console.error("Failed to fetch root part.");
                return;
            }

            const queue: Part[] = [rootPart];
            const visited = new Set<string>();
            const parts: Part[] = [];

            while (queue.length > 0 && parts.length < 20) {
                const currentPart = queue.shift();
                if (!currentPart || visited.has(currentPart.id)) {
                    continue;
                }

                visited.add(currentPart.id);
                parts.push(currentPart);

                for (const child of currentPart.children) {
                    if (!visited.has(child.id)) {
                        const childPart = await fetchPart(child.id);
                        if (childPart) {
                            queue.push(childPart);
                        }
                    }
                }
            }

            setDefaultParts(parts);
        } catch (error) {
            console.error("Error initialising default parts:", error);
        }
    }

    useEffect(() => {
        initaliseDefaultParts();
    });

    return (
        <PartContext.Provider
            value={{
                convertJson,
                defaultParts,
            }}
        >
            {children}
        </PartContext.Provider>
    );
};