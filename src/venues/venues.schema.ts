import { Schema, Document } from 'mongoose';

export const VenueSchema = new Schema({
  name: String,
  capacity: Number,
  available: Boolean,
});

export interface Venue extends Document {
  name: string;
  capacity: number;
  available: boolean;
}