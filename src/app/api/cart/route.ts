import {NextRequest, NextResponse} from "next/server";
import {CartModel} from "@/app/models/cart";
import {AvailableWorksModel} from "@/app/models/available-works/available-works-schema";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);

  const {id, price, image, measurements, title} = await req.json()

  const customerId = requestHeaders.get("x-decoded-id");

  if (!customerId) {
    return NextResponse.json({status: 401, message: "Unauthorized user"});
  }

  const foundCart = await CartModel.findOne()

  if (foundCart) {
    console.log("YWHWHWHWHWHW", foundCart)
  }

  const updatedCartItem = {
    id,
    price,
    image,
    measurements,
    title,
    customerId,
  };

  const updatedCart = new CartModel(updatedCartItem);

  try {
    // Save the updated cart item to the database
    await updatedCart.save();
    return NextResponse.json({
      status: 200,
      message: "Cart item updated successfully",
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json({status: 500, message: "Internal server error"});
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get('x-decoded-id');

  const {cart} = await req.json()

  try {
    const foundCart =
      await CartModel.findOneAndUpdate({userId}, {$set: {items: cart}}, {returnOriginal: false})

    return NextResponse.json({status: 200, data: foundCart});
  } catch (error) {
    return NextResponse.json({status: 500, message: "Internal server error"});
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get('x-decoded-id');

  if (!userId) {
    return NextResponse.json({status: 401, message: "Unauthorized user"});
  }

  try {
    const {items} = await CartModel.findOne({userId}) ?? {};

    const availableWorks = await AvailableWorksModel.find({_id: {$in: items}});

    return NextResponse.json({status: 200, data: availableWorks});
  } catch (error) {
    return NextResponse.json({status: 500, message: "Internal server error"});
  }
};
