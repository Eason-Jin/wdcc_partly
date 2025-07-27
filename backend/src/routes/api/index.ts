import express, { Request, Response } from "express";

const router = express.Router();

import tree from "./tree.js";
router.use("/tree", tree)

export default router;