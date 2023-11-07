import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { UsersModel } from "@/app/models/users";


// export const config = {
//   api: {
//     bodyParser: true,
//   },
//   // Specifies the maximum allowed duration for this function to execute (in seconds)
// };

export const POST = async (req: NextRequest, res: NextResponse) => {

  const { firstName, lastName, email, password } = await req.json();

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({
      status: 400,
      message: "Please add all necessary information",
    });
  }

  const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!email.match(emailFormat)) {
    return NextResponse.json({
      status: 400,
      message: "Incorrect email format",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    await UsersModel.create(newUser);
    
    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }

  //   if (req.method === "PUT") {
  //     console.log("great success", await req);
  //   } else {
  //     // Handle any other HTTP method
  //   }
};
