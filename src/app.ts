import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import path from "node:path";

import { connectToDB } from "./config/db";
import passport from "./config/passport";
import getWebsiteProperties from "./controllers/website-properties/get-all-website-properties";
import getWebsitePropertyById from "./controllers/website-properties/get-website-property-by-id";
import { authMiddleware } from "./helpers/auth-helper";
import agentBuyerPropertyRoutes from "./routes/agent-buyer-property-routes";
import propertyRoutes from "./routes/property-routes";
import websitePropertyRoutes from "./routes/website-property-routes";

dotenv.config();

const app = express();

connectToDB();

app.use(passport.initialize());

app.use(express.json());

app.use(cors());

const staticFilesPath = path.join(
  __dirname,
  "..",
  "public",
  "assets",
  "images"
);
// Use express.static middleware to serve static files
app.use("/images", express.static(staticFilesPath));

app.use("/api/properties", authMiddleware, propertyRoutes);
app.get("/api/all-properties", getWebsiteProperties);
app.get("/api/all-properties/:id", getWebsitePropertyById);
app.use("/api/website-properties", authMiddleware, websitePropertyRoutes);

app.use(
  "/api/agent-buyer-properties",
  authMiddleware,
  agentBuyerPropertyRoutes
);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.BACKEND_API_ENDPOINT}:${PORT}`
  );
});
