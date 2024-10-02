import mongoose, { Document, Schema, Model } from "mongoose";

interface GeneralDetails {
  price: string;
  taxes: string;
  address: string;
  lot_size: string;
  directions: string;
}

interface RoomInterior {
  rooms: number;
  rooms_plus: number;
  bedrooms: number;
  bedrooms_plus: number;
  kitchens: number;
  family_room: string;
  basement: string;
}

interface Exterior {
  property_type: string;
  style: string;
  exterior: string;
  garage_type: string;
  drive_parking_spaces: number;
  pool: string;
}

interface Utilities {
  fireplace_stove: string;
  heat_source: string;
  heat_type: string;
  central_air_conditioning: string;
  laundry_level: string;
  sewers: string;
  water: string;
}

interface AtAGlance {
  type: string;
  area: string;
  municipality: string;
  neighborhood: string;
  style: string;
  lot_size: string;
  tax: string;
  beds: number;
  baths: number;
  fireplace: string;
  pool: string;
}

export interface IWebsiteProperty extends Document {
  name: string;
  category: string;
  available_for: string;
  listing_id: string;
  property_description: string;
  image_urls: string[];
  general_details: GeneralDetails;
  room_interior: RoomInterior;
  exterior: Exterior;
  utilities: Utilities;
  at_a_glance: AtAGlance;
  street_view: string;
  map_location: string;
  latitude: string;
  longitude: string;
  agent_id: mongoose.Types.ObjectId;
  pincode: string;
  country: string;
  state: string;
  city: string;
  square_feet: number;
  is_deleted: boolean;
  [key: string]: any;
}

const WebsitePropertySchema: Schema<IWebsiteProperty> = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    available_for: { type: String, required: true },
    listing_id: { type: String, required: true },
    property_description: { type: String, required: true },
    image_urls: { type: [String], default: [] },
    general_details: {
      price: { type: String, required: true },
      taxes: { type: String, required: true },
      address: { type: String, required: true },
      lot_size: { type: String, required: true },
      directions: { type: String, required: true },
    },
    room_interior: {
      rooms: { type: Number, required: true },
      rooms_plus: { type: Number, required: true },
      bedrooms: { type: Number, required: true },
      bedrooms_plus: { type: Number, required: true },
      kitchens: { type: Number, required: true },
      family_room: { type: String, required: true },
      basement: { type: String, required: true },
    },
    exterior: {
      property_type: { type: String, required: true },
      style: { type: String, required: true },
      exterior: { type: String, required: true },
      garage_type: { type: String, required: true },
      drive_parking_spaces: { type: Number, required: true },
      pool: { type: String, required: true },
    },
    utilities: {
      fireplace_stove: { type: String, required: true },
      heat_source: { type: String, required: true },
      heat_type: { type: String, required: true },
      central_air_conditioning: { type: String, required: true },
      laundry_level: { type: String, required: true },
      sewers: { type: String, required: true },
      water: { type: String, required: true },
    },
    at_a_glance: {
      type: { type: String, required: true },
      area: { type: String, required: true },
      municipality: { type: String, required: true },
      neighborhood: { type: String, required: true },
      style: { type: String, required: true },
      lot_size: { type: String, required: true },
      tax: { type: String, required: true },
      beds: { type: Number, required: true },
      baths: { type: Number, required: true },
      fireplace: { type: String, required: true },
      pool: { type: String, required: true },
    },
    street_view: { type: String, required: true },
    map_location: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    agent_id: { type: Schema.Types.ObjectId, ref: "Agent", required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    square_feet: { type: Number, required: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const WebsiteProperty: Model<IWebsiteProperty> =
  mongoose.model<IWebsiteProperty>("WebsiteProperty", WebsitePropertySchema);

export default WebsiteProperty;
