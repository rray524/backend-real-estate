import express from "express";

import { handleUploadAndValidation } from "../config/multer-config";
import createWebsiteProperty from "../controllers/website-properties/create-website-property";
import deleteWebsiteProperty from "../controllers/website-properties/delete-website-property";
import getWebsiteProperties from "../controllers/website-properties/get-all-website-properties";
import getWebsitePropertyById from "../controllers/website-properties/get-website-property-by-id";
import updateWebsiteProperty from "../controllers/website-properties/update-website-property";

const router = express.Router();

router.get("/:id", getWebsitePropertyById);
router.get("/", getWebsiteProperties);
router.post("/", handleUploadAndValidation, createWebsiteProperty);
router.put("/:id", handleUploadAndValidation, updateWebsiteProperty);
router.delete("/:id", deleteWebsiteProperty);

export default router;
