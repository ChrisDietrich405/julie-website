import { Schema } from "mongoose";
import mongoose from "@/lib/mongoose";
import OrdersDocument from "./orders-document";

const autoIncrement = require('mongoose-sequence')(mongoose);

if (!mongoose.models.orders) {
  const ordersSchema = new Schema<OrdersDocument>({
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
      false: false,
      unique: true,
    },

    availableWorks: {
      type: [String],
      required: true,
    },

    payment: {
      type: {
        type: String,
      },
    },
  });

  ordersSchema.plugin(autoIncrement, { inc_field: 'orderCode' });
  mongoose.model("orders", ordersSchema);
}

export const OrdersModel = mongoose.models.orders;
