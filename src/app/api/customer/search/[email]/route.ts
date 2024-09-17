import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY as string);

interface Params {
  params: { email: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  const { email } = params;

  if (!email) {
    return NextResponse.json({ status: 401, message: "Email is missing" });
  }

  const userId = req.cookies.get("x-decoded-id")?.value;
  

  if (!userId) {
    return NextResponse.json({ status: 401, message: "Unauthorized user" });
  }
  try {
    const customer = await stripe.customers.search({
      query: `email:\"${email}\"`,
    });

    return NextResponse.json([...customer.data], {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          message: (err as Error).message,
        },
      },
      {
        status: 400,
      }
    );
  }
}
