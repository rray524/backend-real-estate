import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";
import { isAgentExistsById } from "../../helpers/validation/auth-validator";
import { isValidObjectId } from "../../helpers/common";
import { validateProperty } from "../../helpers/validation/property-validator";

const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const imageUrls: string[] =
      files?.map((file: Express.Multer.File) => file.filename) || [];

    const reqBody: IProperty = { ...req.body, image_urls: imageUrls };
    const { error } = validateProperty(reqBody);
    if (error) {
      res
        .status(400)
        .json({ status: false, message: error.details[0].message });
      return;
    }

    const { agent_id } = req.body;

    if (!isValidObjectId(agent_id) || !(await isAgentExistsById(agent_id))) {
      res.status(400).json({
        status: false,
        message: "Invalid Agent ID or Agent not found with given ID",
      });
      return;
    }

    const newProperty: IProperty = new Property(reqBody);

    const savedProperty = await newProperty.save();

    res.status(201).json({
      status: true,
      message: "Property created successfully",
      property: savedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default createProperty;
