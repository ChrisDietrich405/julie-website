import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import { Cart } from "@/interfaces/cart.interface";

const stripe = new Stripe(process.env.STRIPE_KEY as string);

export async function POST(req: NextRequest) {
  const userId = req.cookies.get('x-decoded-id')?.value;

  if (!userId) {
    return NextResponse.json({message: "Unauthorized user"}, {status: 401});
  }

  const body: { items: Cart['items'], customerId?: string } = await req.json();

  const {items, customerId} = body;

  const amount = items.reduce((total, item) => total + item.price, 0);
  const currentAmount = amount + "00";

  if (!Array.isArray(items) || !items.length)
    return NextResponse.json(
      {
        error: {
          message: "must have at least 1 item",
        },
      },
      {status: 400}
    );

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(currentAmount),
      currency: "usd",
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json(
      {
        status: 201,
        amount: parseInt(currentAmount),
        id: paymentIntent.id
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
