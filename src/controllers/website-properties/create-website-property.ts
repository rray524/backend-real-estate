import { IUser } from "./../../types/user-types";
import { Request, Response } from "express";

import { isValidAgent } from "../../helpers/validation/auth-validator";
import { validateProperty } from "../../helpers/validation/website-property-validator";
import WebsiteProperty, {
  IWebsiteProperty,
} from "../../models/website-property";

const createWebsiteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    const files = req.files as Express.Multer.File[];
    const imageUrls: string[] =
      files?.map((file: Express.Multer.File) => file.filename) || [];

    const reqBody = req.body;

    const { error } = validateProperty(reqBody);
    if (error) {
      res
        .status(400)
        .json({ status: false, message: error.details[0].message });
      return;
    }

    reqBody.general_details = JSON.parse(reqBody.general_details);
    reqBody.room_interior = JSON.parse(reqBody.room_interior);
    reqBody.exterior = JSON.parse(reqBody.exterior);
    reqBody.utilities = JSON.parse(reqBody.utilities);
    reqBody.at_a_glance = JSON.parse(reqBody.at_a_glance);

    // Generate Google Maps URLs
    const latitude = reqBody.latitude;
    const longitude = reqBody.longitude;
    const placeId = reqBody.place_id;
    const streetViewUrl = `https://www.google.com/maps/@${latitude},${longitude},3a,73.7y,270h,90t/data=!3m6!1e1!3m4!1s2ZDYMmV3Ru7cbc6eDhnqvA!2e0!7i16384!8i8192?entry=ttu`;
    const mapLocationUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.1912415808292!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${placeId}!2s41%20Blackwell%20Ct%2C%20Markham%2C%20ON%20L3R%200C5%2C%20Canada!5e0!3m2!1sen!2sin!4v1716295325520!5m2!1sen!2sin`;
    

    const { agent_id } = req.body;

    if (!isValidAgent(agent_id)) {
      res.status(400).json({
        status: false,
        message: "Invalid Agent ID or Agent not found with given ID",
      });
      return;
    }

    const newWebsiteProperty: IWebsiteProperty = new WebsiteProperty({
      ...reqBody,
      agent_id: user.agent_id,
      image_urls: imageUrls,
      street_view: streetViewUrl,
      map_location: mapLocationUrl,
      place_id: placeId;
    });

    const savedWebsiteProperty = await newWebsiteProperty.save();

    res.status(201).json({
      status: true,
      message: "Website Property created successfully",
      property: savedWebsiteProperty,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Error while creating property" });
  }
};

export default createWebsiteProperty;
