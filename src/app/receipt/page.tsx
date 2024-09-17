"use client";
import dynamic from "next/dynamic";
import { useUserContext } from "@/context";
import { useEffect } from "react";
import { RoleEnum } from "@/interfaces";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const ReceiptPage = dynamic(() => import("./ReceiptPage"), { ssr: false });

export default function Page() {
  const { user } = useUserContext();
  const [cookies] = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (!cookies.token || user?.role !== RoleEnum.ADMIN) {
      router.push("/");
    }
  }, [cookies.token, router, user]);

  return <ReceiptPage />;
}
