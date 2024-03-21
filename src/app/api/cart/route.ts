import { NextResponse, NextRequest } from "next/server";
import mongoose from "@/lib/mongoose";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ status: 401, message: "Unauthorized user" });
  }

  cart = {
    id: string,
    price: number,
    image: string,
    measurements: string,
    title: string,
    customerId: string,
  };
};
