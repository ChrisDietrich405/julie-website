"use client";
import dynamic from "next/dynamic";

const CheckoutTemplate = dynamic(() => import('./CheckoutTemplate'), { ssr: false})

export default function CheckoutPage() {
  return <CheckoutTemplate />
}
