import Joi from "joi";
import { IProperty } from "../../models/property";

const propertySchema = Joi.object({
  agent_id: Joi.string().required(),
  full_address: Joi.string().required(),
  pincode: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  no_of_bedrooms: Joi.number().integer().min(0).required(),
  no_of_bathrooms: Joi.number().integer().min(0).required(),
  square_feet: Joi.number().integer().min(0).required(),
  price: Joi.number().min(0).required(),
  image_urls: Joi.array().items(Joi.string()),
});

export function validateProperty(reqBody: IProperty) {
  return propertySchema.validate(reqBody);
}

export function validateUpdateProperty(reqBody: Partial<IProperty>) {
  return propertySchema.validate(reqBody);
}
