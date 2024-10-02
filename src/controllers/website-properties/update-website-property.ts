import { Request, Response } from "express";
import WebsiteProperty, {
  IWebsiteProperty,
} from "../../models/website-property";
import { validateProperty } from "../../helpers/validation/website-property-validator";
import path from "node:path";
import fs from "node:fs";
import { isValidObjectId } from "mongoose";

const updateWebsiteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(404).json({
        status: false,
        message: "Invalid property id",
      });
      return;
    }

    const existingWebsiteProperty: IWebsiteProperty | null =
      await WebsiteProperty.findOne({
        _id: id,
        is_deleted: false,
      });

    if (!existingWebsiteProperty) {
      res.status(404).json({
        status: false,
        message: "Property not found or already deleted",
      });
      return;
    }

    const { error } = validateProperty(req.body);
    if (error) {
      res
        .status(400)
        .json({ status: false, message: error.details[0].message });
      return;
    }

    const {
      image_urls,
      general_details,
      room_interior,
      exterior,
      utilities,
      at_a_glance,
      ...updateData
    } = req.body;

    existingWebsiteProperty.set(updateData);

    const parsedJSON = (key: string) => {
      existingWebsiteProperty[key] = req.body[key]
        ? JSON.parse(req.body[key])
        : existingWebsiteProperty[key];
    };

    [
      "general_details",
      "room_interior",
      "exterior",
      "utilities",
      "at_a_glance",
    ].forEach(parsedJSON);

    if (req.files?.length) {
      const files = req.files as Express.Multer.File[];
      const imageUrls: string[] = files.map(
        (file: Express.Multer.File) => file.filename
      );
      existingWebsiteProperty.image_urls.forEach((imageUrl) => {
        const imagePath = path.join(__dirname, "../../../images", imageUrl);
        fs.unlink(imagePath, (err) => {
          if (err) console.log(err);
          else {
            console.log(`\nDeleted file: ${imagePath}`);
          }
        });
      });
      existingWebsiteProperty.image_urls = imageUrls;
    }

    const updatedProperty: IWebsiteProperty =
      await existingWebsiteProperty.save();

    if (!updatedProperty) {
      res
        .status(500)
        .json({ status: false, message: "Failed to update property" });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Error while updating property" });
  }
};

export default updateWebsiteProperty;
