import { Request, Response } from "express";
import WebsiteProperty, {
  IWebsiteProperty,
} from "../../models/website-property";

const getWebsitePropertyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const websiteProperty: IWebsiteProperty | null =
      await WebsiteProperty.findById(id);

    if (!websiteProperty) {
      res.status(404).json({ status: false, message: "Property not found" });
      return;
    }

    res.status(200).json({ status: true, data: websiteProperty });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Error while getting a property" });
  }
};

export default getWebsitePropertyById;
