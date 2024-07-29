import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import * as jose from "jose";

export const config = {
  matcher: [
    "/api/user",
    "/api/cart",
    "/api/cart/:path*",
    "/api/create-create",
    "/api/orders",
    "/api/customer/:path*",
  ],
};

function setHeader(headers: NextRequest["headers"], id: string) {
  const requestHeaders = new Headers(headers);

  requestHeaders.set("x-decoded-id", `${id}`);

  return requestHeaders;
}

export const middleware = async (req: NextRequest, res: NextResponse) => {
  const headersInstance = headers();

  let authorization = headersInstance.get("authorization");

  const cookie = req.cookies.get("x-decoded-id");

  if (cookie?.value) {
    const reqHeaders = setHeader(req.headers, cookie.value);

    return NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
  }

  try {
    const tokenNumber = authorization?.split(" ")?.[1].trim();

    if (!tokenNumber) {
      return NextResponse.next();
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

    const decodedToken = await jose.jwtVerify(tokenNumber, secret);

    if (!decodedToken.payload.id) {
      return NextResponse.json("Unauthorized user", { status: 401 });
    }

    const headers = setHeader(req.headers, decodedToken?.payload?.id as string);

    const response = NextResponse.next({
      request: {
        headers,
      },
    });

    response.cookies.set("x-decoded-id", `${decodedToken.payload.id}`, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: decodedToken.payload.exp,
    });

    return response;
  } catch (error) {
    return NextResponse.json("Middleware error", { status: 500 });
  }
};
