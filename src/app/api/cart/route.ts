import { NextResponse, NextRequest } from "next/server";
import mongoose from "@/lib/mongoose";
import { CartModel } from "@/app/models/cart";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);

  const { id, price, image, measurements, title } = await req.json()

  const customerId = requestHeaders.get("x-decoded-id");

  if (!customerId) {
    return NextResponse.json({ status: 401, message: "Unauthorized user" });
  }

  const foundCart = await CartModel.findOne({customer_id: "65fb75a386d407041a265cea"})

  if(foundCart) {
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
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  // const requestHeaders = new Headers(req.headers);
  const customerId = "660dd631e5c7a047f01edebc"
  const { cart } = await req.json()

  try {
    // const cartItems = await CartModel.findOneAndUpdate({ customerId }, { :cart });
    // console.log(cartItems)

    // MyModel.findOneAndUpdate({}, { myArray: newData }, { new: true }, (err, doc) => {
    //   if (err) {
    //     console.error('Error updating document:', err);
    //     return;
    //   }
    //   console.log('Document updated successfully:', doc);
    // });
  
    // cartItems.update(...cartItems, updatedCartItem)

    // return NextResponse.json({ status: 200, data: cartItems });
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  // const customerId = requestHeaders.get("x-decoded-id");
  const customerId = "660dd631e5c7a047f01edebc"
  console.log(customerId)
  if (!customerId) {
    return NextResponse.json({ status: 401, message: "Unauthorized user" });
  }

  try {
    const cartItems = await CartModel.find({ customerId });

    return NextResponse.json({ status: 200, data: cartItems });
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
};
