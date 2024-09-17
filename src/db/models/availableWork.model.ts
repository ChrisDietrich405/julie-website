import { Schema } from "mongoose";
import mongoose, {MongooseDocument} from "@/db/mongoose";
import {AvailableWork} from "@/interfaces/availableWork.interface";

type AvailableWorkDocument = MongooseDocument<AvailableWork>;

export const AvailableWorkSchema = new Schema<AvailableWorkDocument>({
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  measurements: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

if (!mongoose.models.available_works) {
  mongoose.model<AvailableWorkDocument>("available_works", AvailableWorkSchema);
}

export default mongoose.models.available_works as mongoose.Model<AvailableWorkDocument>;
