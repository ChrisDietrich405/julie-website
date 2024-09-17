import { NextRequest, NextResponse } from "next/server";
import mongoose from "@/db/mongoose";
import { UserModel, OrderModel } from "@/db/models";

import { AvailableWorkModel } from "@/db/models";
import {RoleEnum} from "@/interfaces";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const { customer, deliveryAddress, availableWorks, price } = await req.json();

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  const id = new mongoose.Types.ObjectId(userId);

  const user = await UserModel.findById(id);

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

  customer.email = user?.email;

  try {
    const newOrder = new OrderModel({
      customerId: id,
      availableWorks,
      customer,
      deliveryAddress,
      status: "Waiting",
      orderCode: "2",
      price
    });

    await newOrder.save();

    await AvailableWorkModel.updateMany(
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

  try {
    const user = await UserModel.findOne({ _id: userId });

    if (user?.role !== RoleEnum.ADMIN) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const allOrders = await OrderModel.find().populate('availableWorks');

    return NextResponse.json(allOrders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500 }, { status: 500 });
  }
};
