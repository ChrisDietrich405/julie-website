import {NextResponse, NextRequest} from "next/server";
import { AvailableWorkModel } from "@/db";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");

  try {
    const query = status ? { status } : {}
    const availableWorks = await AvailableWorkModel.find(query);

    return NextResponse.json(availableWorks, {status: 200});
  } catch (error) {
    return NextResponse.json({message: error}, {status: 500});
  }
};
