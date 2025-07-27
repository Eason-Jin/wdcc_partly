import express, { Request, Response } from "express";
import { createGetRequest, createPostRequest } from "./utils.js";

const router = express.Router();

/**
 * Gets the entire world tree.
 */
router.get("/", async (req: Request, res: Response) => {
    const requestBody =
    {
        // nesting limit - 8 will return the full tree - no need to go deeper.
        "num_layers": 8,
        "tree_root_ghca_id": null, // You can set the root if wanting a subtree.
        "languages": [
            "en-NZ",
            "en"
        ]
    }

    createPostRequest("world-tree.search", requestBody).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        console.log(error);
    });
});

/**
 * Gets the tree for a specific root ID.
 */
router.get("/:root_id", async (req: Request, res: Response) => {
    const { root_id } = req.params;

    if (!root_id) {
        return res.status(400).json({ error: "Root ID is required" });
    }

    const requestBody = {
        "num_layers": 2,
        "tree_root_ghca_id": root_id,
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
});

export default router;