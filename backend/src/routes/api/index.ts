import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

import tree from "./tree.js";
router.use("/tree", tree)

const PARTLY_URL = process.env.PARTLY_URL
const PARTLY_API_KEY = process.env.PARTLY_API_KEY

router.get("/auth", async (req: Request, res: Response) => {
    try {
        const requestBody = {
            identifier: {
                plate: "JAJ858",
                region: "UREG32", // NZ - always set to UREG32.
                state: null, // Always set to null for NZ.
            },
            languages: ["en-NZ", "en"],
        };
        const response = await axios.post(`https://${PARTLY_URL}/api/v1/vehicles.search`, requestBody, {
            headers: {
                Authorization: `Bearer ${PARTLY_API_KEY}`,
                "Content-Type": "application/json"
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
    }
});

export default router;