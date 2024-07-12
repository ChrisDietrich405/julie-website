import emailjs from "emailjs-com";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  const templateParams = {
    name: "Chris",
    notes: "Thank you for your order",
  };

  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID as string,
      process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
      templateParams,
      process.env.NEXT_PUBLIC_USER_ID as string
    );

    // const result = await emailjs.send(
    //   "service_vuygmmf",
    //   "template_rwlnk2m",
    //   templateParams,
    //   "630uiCBV0K235A4GY"
    // );
    return NextResponse.json({ key: "hello", result });
    // emailjs
    //   .send("service_vuygmmf", "template_rwlnk2m", templateParams, {
    //     publicKey: "630uiCBV0K235A4GY",
    //     privateKey: "1lf3Uz8r7N12UQbcTiw6m", // optional, highly recommended for security reasons
    //   })

    // .then(
    //   (response) => {
    //     console.log("SUCCESS!", response.status, response.text);
    //   },
    //   (err) => {
    //     console.log("FAILED...", err);
    //   }
    // );
    // NextResponse.json("hello");
  } catch (error) {
    return NextResponse.json({ key: "hello error", error });
  }
};
