import express from "express";

import { handleUploadAndValidation } from "../config/multer-config";
import createProperty from "../controllers/property/create-property";
import softDeleteProperty from "../controllers/property/delete-property";
import getProperties from "../controllers/property/get-properties";
import getPropertyById from "../controllers/property/get-property-by-id";
import updateProperty from "../controllers/property/update-property";

const router = express.Router();

router.get("/:id", getPropertyById);
router.get("/", getProperties);
router.post("/", handleUploadAndValidation, createProperty);
router.put("/:id", handleUploadAndValidation, updateProperty);
router.delete("/:id", softDeleteProperty);

export default router;
