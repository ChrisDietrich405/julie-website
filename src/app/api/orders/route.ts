import { NextResponse, NextRequest } from "next/server";
import mongoose from "@/lib/mongoose";
import { UsersModel } from "@/app/models/users/user-schema";
import { OrdersModel } from "@/app/models/orders/orders-schema";
import { AvailableWorksModel } from "@/app/models/available-works/available-works-schema";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const { customer, deliveryAddress, availableWorks } = await req.json();

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  const id = new mongoose.Types.ObjectId(userId);

  const user = await UsersModel.findById(id);

  if (
    !customer.name ||
    !customer.phoneNumber ||
    !deliveryAddress.streetAddress ||
    !deliveryAddress.city ||
    !deliveryAddress.zipCode
  ) {
    return NextResponse.json({
      status: 400,
      message: "Please add all necessary information",
    });
  }

  customer.email = user.email;

  try {
    const newOrder = new OrdersModel({
      customerId: id,
      availableWorks,
      customer,
      deliveryAddress,
      status: "shopping cart",
      orderCode: "2",
    });

    await newOrder.save();

    await AvailableWorksModel.updateMany(
      {
        _id: { $in: availableWorks },
      },
      { $set: { status: "sold" } }
    );

    return NextResponse.json(
      {
        message: "Order created",
        orderId: newOrder._id,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");
  console.log(userId);
  try {
    const user = await UsersModel.findOne({ _id: userId });

    if (user.email !== "chris@gmail.com") { 
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const allOrders = await OrdersModel.find();
    return NextResponse.json(allOrders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
};
