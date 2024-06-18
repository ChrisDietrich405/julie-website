import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import * as jose from "jose";

export const config = {
  matcher: [
    '/api/user',
    '/api/cart',
    '/api/cart/:path*',
    '/api/create-payment-intent',
    '/api/orders'
  ],
};

export const middleware = async (req: NextRequest, res: NextResponse) => {
  try {
    const headersInstance = headers();

    let authorization = headersInstance.get("authorization");

    const tokenNumber = authorization?.split(" ")?.[1].trim();

    if (!tokenNumber) {
      return NextResponse.next();
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

    const decodedToken = await jose.jwtVerify(tokenNumber, secret);

    if (!decodedToken.payload.id) {
      return NextResponse.json("Unauthorized user", {status: 401});
    }

    const requestHeaders = new Headers(req.headers);

    requestHeaders.set("x-decoded-id", `${decodedToken.payload.id}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json('Middleware error', {status: 500});
  }
};
