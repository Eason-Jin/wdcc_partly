export interface Part {
    id: string; // root_node
    type: PartType;
    position: PartPosition;
    names: string; // ignore aliases for now
    children: string[];
}

export interface PartType {
    id: string; // gapc_part_type_id
    name: string; // ignore aliases for now
    is_multi_purpose: boolean;
}

export interface PartPosition {
    id: string; // gapc_position_id
    position: string;
}