import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {TCustomer} from "@/app/models/customer.models";

const stripe = new Stripe(process.env.STRIPE_KEY as string);

type GetParams = {
  params: {
    customerId: string,
  }
}

export async function GET(req: NextRequest, {params}: GetParams) {
  if (!params.customerId) {
    return NextResponse.json({status: 401, message: "Customerid is missing"});
  }

  const userId = req.cookies.get('x-decoded-id')?.value;

  if (!userId) {
    return NextResponse.json({status: 401, message: "Unauthorized user"});
  }

  try {
    const customer = await stripe.customers.retrieve(params.customerId);

    return NextResponse.json(
      customer,
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


export async function PATCH(req: NextRequest, {params}: GetParams) {
  if (!params.customerId) {
    return NextResponse.json({status: 401, message: "Customerid is missing"});
  }

  const userId = req.cookies.get('x-decoded-id')?.value;

  if (!userId) {
    return NextResponse.json({status: 401, message: "Unauthorized user"});
  }

  const customerRequest: TCustomer = await req.json();

  try {
    const customer = await stripe.customers.update(params.customerId, customerRequest);

    return NextResponse.json(
      customer,
      {
        status: 200,
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
