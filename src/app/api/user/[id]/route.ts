import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
;
import { UserModel } from "@/db/models";
import mongoose from "@/db/mongoose";

export const PUT = async (req: NextRequest, { params } : { params: { id: string } }) => {
  const requestHeaders = new Headers(req.headers);

  try {
    const id = new mongoose.Types.ObjectId(params.id);

    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json({status: 404, message: "Not found"});
    }

    if (requestHeaders.get("x-decoded-id") !== user.id) {
      return NextResponse.json({status: 401, message: "Unauthorized user"});
    }

    const {name, streetAddress, email, password, newPassword} =
      await req.json();

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return NextResponse.json({status: 401, message: "Unauthorized"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await user.updateOne({
      name,
      streetAddress,
      password: hashedPassword,
      email,
    });

    return NextResponse.json({status: 200, message: "User updated"});
  } catch (error) {
    return NextResponse.json({status: 500, message: "Server failed"});
  }
};

export const GET = async (req: NextRequest, {params}: { params: { id: string } }) => {
  const requestHeaders = new Headers(req.headers);

  try {
    const id = new mongoose.Types.ObjectId(params.id);

    const user = await UserModel.findById(id);

    if (requestHeaders.get("x-decoded-id") !== user?.id) {
      return NextResponse.json({status: 401, message: "Unauthorized user"});
    }

    if (!user) {
      return NextResponse.json({status: 404, message: "Not found"});
    }

    return NextResponse.json({
      status: 200,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({status: 500, message: "Server failed"});
  }
};
