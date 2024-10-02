import Joi from "joi";
import { IWebsiteProperty } from "../../models/website-property";

const preConstructedPropertySchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  // price: Joi.string().required(),
  available_for: Joi.string().required(),
  listing_id: Joi.string().required(),
  property_description: Joi.string().required(),
  image_urls: Joi.array().items(Joi.string()),
  // general_details: Joi.object({
  //   price: Joi.string().required(),
  //   taxes: Joi.string().required(),
  //   address: Joi.string().required(),
  //   lot_size: Joi.string().required(),
  //   directions: Joi.string().required(),
  // }).required(),
  general_details: Joi.string().required(),
  // room_interior: Joi.object({
  //   rooms: Joi.number().integer().required(),
  //   rooms_plus: Joi.number().integer().required(),
  //   bedrooms: Joi.number().integer().required(),
  //   bedrooms_plus: Joi.number().integer().required(),
  //   kitchens: Joi.number().integer().required(),
  //   family_room: Joi.string().required(),
  //   basement: Joi.string().required(),
  // }).required(),
  room_interior: Joi.string().required(),
  // exterior: Joi.object({
  //   property_type: Joi.string().required(),
  //   style: Joi.string().required(),
  //   exterior: Joi.string().required(),
  //   garage_type: Joi.string().required(),
  //   drive_parking_spaces: Joi.number().integer().required(),
  //   pool: Joi.string().required(),
  // }).required(),
  exterior: Joi.string().required(),
  // utilities: Joi.object({
  //   fireplace_stove: Joi.string().required(),
  //   heat_source: Joi.string().required(),
  //   heat_type: Joi.string().required(),
  //   central_air_conditioning: Joi.string().required(),
  //   laundry_level: Joi.string().required(),
  //   sewers: Joi.string().required(),
  //   water: Joi.string().required(),
  // }).required(),
  utilities: Joi.string().required(),
  // at_a_glance: Joi.object({
  //   type: Joi.string().required(),
  //   area: Joi.string().required(),
  //   municipality: Joi.string().required(),
  //   neighborhood: Joi.string().required(),
  //   style: Joi.string().required(),
  //   lot_size: Joi.string().required(),
  //   tax: Joi.string().required(),
  //   beds: Joi.number().integer().required(),
  //   baths: Joi.number().integer().required(),
  //   fireplace: Joi.string().required(),
  //   pool: Joi.string().required(),
  // }).required(),
  at_a_glance: Joi.string().required(),
  // street_view: Joi.string().required(),
  // map_location: Joi.string().required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
  // agent_id: Joi.string().required(),
  pincode: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  square_feet: Joi.number().integer().required(),
  is_deleted: Joi.boolean().default(false),
});

export function validateProperty(reqBody: IWebsiteProperty) {
  return preConstructedPropertySchema.validate(reqBody);
}

export function validateUpdateProperty(reqBody: Partial<IWebsiteProperty>) {
  return preConstructedPropertySchema.validate(reqBody);
}
