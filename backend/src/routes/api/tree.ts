import express, { Request, Response } from "express";
import { createGetRequest, createPostRequest } from "./utils.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Part } from "../../types/part.js";

const router = express.Router();

const USE_LOCAL_DATA = false;
const FILE_PATH = path.resolve(__dirname, "../data/world_tree.json");

/**
 * Gets the entire world tree.
 */
router.get("/", async (req: Request, res: Response) => {
    if (USE_LOCAL_DATA) {
        try {
            const data = fs.readFileSync(FILE_PATH, "utf-8");
            res.status(200).json(JSON.parse(data));
        } catch (error) {
            console.error("Error reading local data:", error);
        }
    } else {
        const requestBody =
        {
            // nesting limit - 8 will return the full tree - no need to go deeper.
            "num_layers": 8,
            "tree_root_ghca_id": null, // You can set the root if wanting a subtree.
            "languages": [
                "en-NZ",
                "en"
            ]
        };

        createPostRequest("world-tree.search", requestBody).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            console.log(error);
        });
    }
});

/**
 * Gets the tree for a specific root ID.
 */
router.get("/:root_id", async (req: Request, res: Response) => {
    const { root_id } = req.params;

    if (USE_LOCAL_DATA) {
        const FILE_PATH = path.resolve(__dirname, "../../data/world_tree.json");
        try {
            const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
            if (root_id && data.nodes[root_id]) {
                res.status(200).json(data.nodes[root_id]);
            } else {
                res.status(404).json({ error: "Root ID not found in local data." });
            }
        } catch (error) {
            console.error("Error reading local data:", error);
        }
    } else {
        let requestBody;

        if (!root_id) {
            requestBody = {
                "num_layers": 8,
                "tree_root_ghca_id": null, // Get all the parts
                "languages": [
                    "en-NZ",
                    "en"
                ]
            };
        } else {
            requestBody = {
                "num_layers": 2,
                "tree_root_ghca_id": root_id,
                "languages": [
                    "en-NZ",
                    "en"
                ]
            };
        }

        createPostRequest("world-tree.search", requestBody).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            console.log(error);
        });
    }
});

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
    
    const response = await createPostRequest("world-tree.search", requestBody);
    
    const worldTreeData = response.data;
    const searchResults: Part[] = [];
    
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
  }
});

export default router;