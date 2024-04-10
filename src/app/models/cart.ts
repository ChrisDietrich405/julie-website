import mongoose from "@/lib/mongoose";
import { ObjectId } from "mongoose";
import UserDocument from "./users/user-document";
import AvailableWorksDocument from "./available-works/available-works-document";
import { AvailableWorksModel } from "./available-works/available-works-schema";
import { UsersModel } from "./users/user-schema";


const { Schema } = mongoose;

interface CartDocument extends Document {
  items: AvailableWorksDocument[];
  userId: String;
}

const cartSchema = new Schema<CartDocument>({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: [AvailableWorksModel.schema],
    required: true,
  },
});

if (!mongoose.models.cart) {
  mongoose.model<CartDocument>("cart", cartSchema);
}

export const CartModel = mongoose.models.cart as mongoose.Model<CartDocument>;
