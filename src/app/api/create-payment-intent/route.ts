import {NextRequest, NextResponse} from "next/server";
import Stripe from 'stripe'
import {ICart} from "@/models";

const stripe = new Stripe(process.env.STRIPE_KEY as string)

export async function POST(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  console.log('teste', userId)

  if (!userId) {
    return NextResponse.json({status: 401, message: "Unauthorized user"});
  }

  const body: { items: ICart } = await req.json();

  const {items} = body;
  
  const amount = items.reduce((total, item) => total + item.price, 0)
  console.log(amount)

  if (!Array.isArray(items) || !items.length) return NextResponse.json({
      error: {
        message: 'must have at least 1 item'
      },
    },
    {status: 400}
  )

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });


    return NextResponse.json(
      {
        status: 201,
        amount,
        clientSecret: paymentIntent.client_secret,
        user: {
          fullName: 'Smart Chris',
          email: 'server@gmail.com',
          streetAddress: '111 Oak Ave'
        }
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return NextResponse.json({
        error: {
          message: (err as Error).message
        }
      },
      {
        status: 400,
      }
    )
  }
}
