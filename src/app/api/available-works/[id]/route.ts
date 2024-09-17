import mongoose from "@/db/mongoose";
import {AvailableWorkModel} from '@/db/models';
import {NextRequest, NextResponse} from "next/server";

interface Params {
  params: { id: string };
}

export const GET = async (req: NextRequest, {params}: Params) => {
  try {
    const id = new mongoose.Types.ObjectId(params.id);

    const individualWork = await AvailableWorkModel.findById(id);

    if (individualWork) {
      return NextResponse.json(individualWork, {status: 200});
    } else {
      return NextResponse.json(
        {message: "Individual work not found"},
        {status: 404}
      );
    }
  } catch (error) {
    return NextResponse.json(
      {message: "Internal server error"},
      {status: 500}
    );
  }
};

