import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  agent_id: mongoose.Types.ObjectId;
  full_address: string;
  image_urls: string[];
  pincode: string;
  country: string;
  state: string;
  city: string;
  no_of_bedrooms: number;
  no_of_bathrooms: number;
  square_feet: number;
  price: number;
  is_deleted: boolean;
  created_at: Date;
}

const PropertySchema: Schema = new Schema({
  agent_id: { type: Schema.Types.ObjectId, ref: "Agent", required: true },
  // owned_by_property_id : {type: Schema.Types.ObjectId},
  full_address: { type: String, required: true },
  image_urls: { type: [String], default: [] },
  pincode: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  no_of_bedrooms: { type: Number, required: true },
  no_of_bathrooms: { type: Number, required: true },
  square_feet: { type: Number, required: true },
  price: { type: Number, required: true },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

const Property = mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
