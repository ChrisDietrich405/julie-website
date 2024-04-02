import { NextResponse, NextRequest } from "next/server";
import mongoose from "@/lib/mongoose";
import { CartModel } from "@/app/models/cart";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);

  const { id, price, image, measurements, title, customerId } = req.body;

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ status: 401, message: "Unauthorized user" });
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
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
};

export const GET = async(req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");
  console.log(userId)

  if (!userId) {
    return NextResponse.json({ status: 401, message: "Unauthorized user" });
  } 

  try {
    const cartItems = await CartModel.find({ customerId: userId });

    return NextResponse.json({ status: 200, data: cartItems });
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
