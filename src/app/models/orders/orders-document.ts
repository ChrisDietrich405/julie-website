import { Document } from "mongoose";

interface OrdersDocument extends Document {
  customerId: String;
  customer: {
    name: String;
    email: String;
    phoneNumber: Number;
  };
  deliveryAddress: {
    streetAddress: String;
    city: String;
    zipCode: Number;
  };
  status: String;
  orderCode: String;
  payment: {
    type: String;
  };
  availableWorks: String[];
}

export default OrdersDocument;
