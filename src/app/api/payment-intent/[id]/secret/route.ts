import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {Params} from "@/app/types/params";
import { Payment } from "@mui/icons-material";

const stripe = new Stripe(process.env.STRIPE_KEY as string);

export async function GET(req: NextRequest, {params}: Params): Promise<any> {
  const userId = req.cookies.get('x-decoded-id')?.value;

  if (!userId) {
    return NextResponse.json({status: 401, message: "Unauthorized user"});
  }

  const {id} = params;

  if (!id) {
    return NextResponse.json({status: 401, message: "Id is required"});
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);

    return NextResponse.json(
      {
        status: 201,
        clientSecret: paymentIntent.client_secret,
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
