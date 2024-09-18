import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const requestHeaders = new Headers(req.headers);

    requestHeaders.delete("x-decoded-id");

    // NextResponse.next({
    //   request: {
    //     headers: requestHeaders,
    //   },
    // });

    const response = NextResponse.json({ message: "hello" });

    response.cookies.set("x-decoded-id", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
