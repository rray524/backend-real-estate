import { Request, Response } from "express";
import WebsiteProperty, {
  IWebsiteProperty,
} from "../../models/website-property";
import { FilterQuery } from "mongoose";
import { IUser } from "../../types/user-types";

const getWebsiteProperties = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    const { category, page, page_size } = req.query;

    let query: FilterQuery<IWebsiteProperty> = {
      is_deleted: false,
    };

    if (user && user.agent_id) {
      console.log(user);
      query.agent_id = user.agent_id;
    }

    if (category) {
      query.category = category;
    }

    const pageNum = parseInt(page as string) || 1;
    const size = parseInt(page_size as string) || 10;

    const skip = (pageNum - 1) * size;

    const websiteProperties: IWebsiteProperty[] = await WebsiteProperty.find(
      query
    )
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(size);

    return res.status(200).json({ status: true, data: websiteProperties });
  } catch (error) {
    console.error("Error getting properties:", error);
    return res
      .status(500)
      .json({ status: false, message: "Error while getting properties" });
  }
};

export default getWebsiteProperties;
