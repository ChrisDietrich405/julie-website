import {AvailableWork} from "@/interfaces/availableWork.interface";

export interface Order {
  customerId: string;
  price: string;
  orderId?: string;
  customer: {
    name: string;
    email: string;
    phoneNumber: number;
  };
  deliveryAddress: {
    streetAddress: string;
    city: string;
    zipCode: number;
  };
  status: string;
  orderCode: number;
  payment: {
    type: string;
  };
  availableWorks: string[];
}

export interface OrderData extends Omit<Order, 'availableWorks'> {
  availableWorks: AvailableWork[]
}

export default Order;
