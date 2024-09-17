import {CartModel} from '@/db/models';
import {NextRequest, NextResponse} from "next/server";

interface Params {
  params: { id: string }
}

export const DELETE = async (req: NextRequest, {params}: Params) => {
  const requestHeaders = new Headers(req.headers);
  const {id} = params;

  const userId = requestHeaders.get('x-decoded-id');

  try {
    await CartModel.findOneAndUpdate({userId}, {$pullAll: {items: [{_id: id}]}}, {returnOriginal: false})

    return NextResponse.json({message: 'removed'});
  } catch (error) {
    return NextResponse.json({message: "Internal server error"}, {status: 500});
  }
};