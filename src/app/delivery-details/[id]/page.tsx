"use client"
import React from "react";
import dynamic from "next/dynamic";

const DeliveryDetailsTemplate = dynamic(() => import('./DeliveryDetailsTemplate'), { ssr: false })

export default function DeliveryDetailsPage({ params }: { params: { id: string } }) {
  return <DeliveryDetailsTemplate params={params} />
}
