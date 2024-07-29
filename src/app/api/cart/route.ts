import { NextRequest, NextResponse } from "next/server";
import { CartModel } from "@/app/models/cart";
import { AvailableWorksModel } from "@/app/models/available-works/available-works-schema";

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  try {
    await CartModel.create({
      userId,
      items: [],
    });

    return NextResponse.json({
      status: 200,
      message: "Cart created",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  const { cart } = (await req.json()) as { cart: string[] };

  try {
    const foundCart = await CartModel.findOneAndUpdate(
      { userId },
      { $set: { items: cart } },
      { returnOriginal: false }
    );

    return NextResponse.json({ status: 200, data: foundCart });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  console.log("hello", requestHeaders);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  try {
    let items;

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      await POST(req);
      const newCart = await CartModel.findOne({ userId });

      items = newCart?.items;
    } else {
      items = cart.items;
    }

    const availableWorks = await AvailableWorksModel.find({
      _id: { $in: items },
    });

    const amount = availableWorks.reduce(
      (total, item) => total + item.price,
      0
    );

    return NextResponse.json({
      items: availableWorks,
      amount,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
