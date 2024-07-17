import { AvailableWorksModel } from "@/app/models/available-works/available-works-schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const availableWorks = await AvailableWorksModel.find({
      status: "available",
    });
    return NextResponse.json(availableWorks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
