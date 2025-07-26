import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.set("trust proxy", 1);

/**
 * CORS middleware to allow requests from specific origins.
 */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (origin.includes("localhost")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

import routes from "./routes/routes";
app.use("/", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});