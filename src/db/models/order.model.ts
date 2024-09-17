import { Schema } from "mongoose";
import mongoose, {MongooseDocument} from "../mongoose";
import Order from "@/interfaces/order.interface";

const autoIncrement = require("mongoose-sequence")(mongoose);

type OrderDocument = MongooseDocument<Order>;

if (!mongoose.models.orders) {
  const orderSchema = new Schema<OrderDocument>({
    customerId: {
      type: String,
      required: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
    },

    deliveryAddress: {
      streetAddress: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipCode: {
        type: Number,
        required: true,
      },
    },

    status: {
      type: String,
      required: true,
    },

    orderCode: {
      type: Number,
      unique: true,
    },

    price: {
      type: String,
      required: true,
    },

    availableWorks: {
      type: [String],
      required: true,
      ref: 'available_works'
    },

    payment: {
      type: {
        type: String,
      },
    },
  });

  orderSchema.plugin(autoIncrement, { inc_field: "orderCode" });
  mongoose.model<OrderDocument>("orders", orderSchema);
}

export default mongoose.models.orders as mongoose.Model<OrderDocument>;
