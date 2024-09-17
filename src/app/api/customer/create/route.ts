import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {Customer} from "@/interfaces/customer.interface";

const stripe = new Stripe(process.env.STRIPE_KEY as string);

export async function POST(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({status: 401, message: "Unauthorized user"});
  }

  const customer: Customer = await req.json();

  if (!customer.name || !customer.email) {
    return NextResponse.json(
      {
        error: {
          message: "fill pieces of information",
        },
      },
      {status: 400}
    );
  }

  try {
    const newCustomer = await stripe.customers.create({name: customer.name, email: customer.email});

    return NextResponse.json(
      {
        ...newCustomer
      },
      {
        status: 201,
      }
    );
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
