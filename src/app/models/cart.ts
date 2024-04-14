import mongoose from "@/lib/mongoose";


const {Schema} = mongoose;

interface CartDocument extends Document {
  items: string[];
  userId: String;
}

const cartSchema = new Schema<CartDocument>({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: [String],
    required: true,
  },
});

if (!mongoose.models.cart) {
  mongoose.model<CartDocument>("cart", cartSchema);
}

export const CartModel = mongoose.models.cart as mongoose.Model<CartDocument>;
