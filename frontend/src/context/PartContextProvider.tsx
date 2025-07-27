import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { PartContext } from "./PartContext";
import type { Part } from "../types/part";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export interface PartContextType {
    convertJson: (json: string) => Part;
    defaultParts: Part[];
}

export const PartContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [defaultParts, setDefaultParts] = useState<Part[]>([]);

    function convertJson(jsonString: string): Part {
        console.log("Converting JSON to Part:", jsonString);
        const jsonData = JSON.parse(jsonString);

        const nodes = jsonData.nodes;
        const partTypes = jsonData.gapc_part_types;
        const positions = jsonData.gapc_positions;

        const nodeId = Object.keys(nodes)[0]; // Assuming we are converting the first node
        const node = nodes[nodeId];

        const partType = partTypes[node.gapc_part_type_id];
        const position = positions[node.gapc_position_id];

        return {
            id: node.id,
            type: {
                id: partType.id,
                name: partType.names[0].value,
                is_multi_purpose: partType.is_multi_purpose,
            },
            position: {
                id: position.id,
                position: position.names[0].value,
            },
            names: node.names[0].value,
            children: node.children,
        };
    }

    async function fetchPart(id: string): Promise<Part | null> {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/tree/${id}`);
            return convertJson(JSON.stringify(response.data));
        } catch (error) {
            console.error("Error fetching part:", error);
            return null;
        }
    }

    async function initaliseDefaultParts() {
        const root = "GHCA959";
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

                for (const child of currentPart.children || []) {
                    if (!visited.has(child)) {
                        console.log(`Fetching child part: ${child}`);
                        const childPart = await fetchPart(child);
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