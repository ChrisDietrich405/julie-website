import mongoose, {MongooseDocument} from "@/db/mongoose";
import {Cart} from "@/interfaces/cart.interface";

const { Schema } = mongoose;

type CartDocument = MongooseDocument<Cart>;

const cartSchema = new Schema<CartDocument>({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: [String],
    required: true,
    ref: 'available_works'
  },
});

if (!mongoose.models.cart) {
  mongoose.model<CartDocument>("cart", cartSchema);
}

export default mongoose.models.cart as mongoose.Model<CartDocument>;
