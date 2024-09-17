import {NextRequest, NextResponse} from "next/server";
import { UserModel } from "@/db/models";
import bcrypt from "bcryptjs";
import {RoleEnum} from "@/interfaces";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const {name, streetAddress, city, email, password} =
    await req.json();
  if (
    !name ||
    !streetAddress ||
    !city ||
    !email ||
    !password
  ) {
    return NextResponse.json(
      {
        status: 400,
        message: "Please add all necessary information",
      },
      {
        status: 400,
      }
    );
  }

  const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!email.match(emailFormat)) {
    return NextResponse.json(
      {
        status: 400,
        message: "Incorrect email format",
      },
      {
        status: 400,
      }
    );
  }

  const existingEmail = await UserModel.findOne({email});
  if (existingEmail) {
    return NextResponse.json(
      {status: 409, message: "Duplicate email"},
      {
        status: 409,
      }
    );
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      streetAddress,
      city,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({status: 201, message: "User created"});
  } catch (error: any) {
    return NextResponse.json(
      {status: 500, message: error.message},
      {
        status: 500,
      }
    );
  }
};

interface Params {
  params: { id: string }
}

export const GET = async (req: NextRequest, {params}: Params) => {

  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  try {
    const user = await UserModel.findOne({_id: userId});

    if (!user) {
      return NextResponse.json({
        status: 404,
        data: 'Not founded',
      });
    }

    const {name, email, city, streetAddress, role} = user;

    return NextResponse.json({
      name,
      email,
      city,
      streetAddress,
      role
    });
  } catch (error) {
    return NextResponse.json({message: "Server failed"}, {status: 500});
  }
};
